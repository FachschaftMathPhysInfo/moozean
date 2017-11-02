class ReportResource < JSONAPI::Resource
  attributes :pdf, :tex, :tex_available, :examination_at, :created_at, :picture
  has_one :subject
  has_one :typ
  filters :typ, :subject
  filter :daterange, verify: ->(values, _context) {
                            werte = []
                            values.flatten.each do |elem|
                              werte << elem.to_i
                            end
                            werte
                          }
  filter :moduls, verify: ->(values, _context) {
                            werte = []
                            values.flatten.each do |elem|
                              werte << elem.to_i
                            end
                            werte
                          }
  filter :folderseries, verify: ->(values, _context) {
                                  werte = []
                                  values.flatten.each do |elem|
                                    werte << elem.to_i
                                  end
                                  werte
                                }
  filter :examinators, verify: ->(values, _context) {
                                 werte = []
                                 values.flatten.each do |elem|
                                   werte << elem.to_i
                                 end
                                 werte
                               }
  def self.apply_filter(records, filter, value, _options)
    case filter
    when 'daterange'
      records = records.where(examination_at: value[0]..value[1])
      records
    when 'moduls.id'
      if value.is_a?(Array)
        value.each do |val|
          records = records.joins('INNER JOIN is_abouts m' + val.to_s + ' ON m' + val.to_s + '.report_id = reports.id').where('m' + val.to_s + '.modul_id' => val)
        end
        records
      else
        records.joins('INNER JOIN is_abouts ia' + value.to_s + ' ON ia' + value.to_s + '.report_id = reports.id').where('ia' + value.to_s + '.modul_id' => value)
      end
    when 'folderseries.id'
      if value.is_a?(Array)
        value.each do |val|
          records = records.joins('INNER JOIN is_ins ii' + val.to_s + ' ON ii' + val.to_s + '.report_id = reports.id').where('ii' + val.to_s + '.folderseries_id' => val)
        end
        records
      else
        records.joins('INNER JOIN is_ins m' + value.to_s + ' ON m' + value.to_s + '.report_id = reports.id').where('m' + value.to_s + '.folderseries_id' => value)
      end
    when 'examinators.id'
      if value.is_a?(Array)
        value.each do |val|
          records = records.joins('INNER JOIN examined_bies eb' + val.to_s + ' ON eb' + val.to_s + '.report_id = reports.id').where('eb' + val.to_s + '.examinator_id' => val)
        end
        records
      else
        records.joins('INNER JOIN examined_bies eb' + value.to_s + ' ON eb' + value.to_s + '.report_id = reports.id').where('eb' + value.to_s + '.examinator_id' => value)
      end
    else
      super(records, filter, value)
    end
  end
  has_many :examinators, acts_as_set: true
  has_many :moduls, acts_as_set: true
  has_many :folderseries, acts_as_set: true

  def tex_available
    @model.tex != ''
  end

  def fetchable_fields
    super - %i[tex pdf]
  end

  def self.updatable_fields(context)
    super - [:tex_available]
  end

  def self.creatable_fields(context)
    super - [:tex_available]
  end
  before_save do
    unless @model.pdf.nil?
      @model.pdf = Base64.decode64(@model.pdf['data:application/pdf;base64,'.length..-1])
      @model.render_picture()
      puts "Rendered"
    end
  end
  def picture
    @model.picture
  end
  def self.sortable_fields(context)
    super
  end
end
