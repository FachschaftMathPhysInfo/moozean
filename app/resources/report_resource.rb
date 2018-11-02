class ReportResource < JSONAPI::Resource
  attributes :pdf, :tex, :tex_available, :examination_at, :created_at, :picture
  has_one :subject
  has_one :typ
  filters :typ, :subject
  filter :daterange,apply: ->(records, value, _options) {
    return records if value.empty?
    records.where("examination_at >= ?",DateTime.parse(value[0][:"0"])).where("examination_at <= ?",DateTime.parse(value[0][:"1"]))
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
  def self.filter_by(records,value, category,model)
    if value.is_a?(Array)
      value.each do |val|
        records = records.joins("INNER JOIN #{category} #{category}" + val.to_s + " ON #{category}" + val.to_s + '.report_id = reports.id').where("#{category}" + val.to_s + ".#{model}_id" => val)
      end
      records
    else
      records.joins("INNER JOIN #{category} #{category}" + value.to_s + " ON #{category}" + value.to_s + '.report_id = reports.id').where("#{category}" + value.to_s + ".#{model}_id" => value)
    end
  end
  def self.apply_filter(records, filter, value, _options)
    case filter
    when 'moduls.id'
      records = filter_by(records,value,"is_abouts","modul")
    when 'folderseries.id'
      records = filter_by(records,value,"is_ins","folderseries")
    when 'examinators.id'
      records = filter_by(records,value,"examined_bies","examinator")
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
