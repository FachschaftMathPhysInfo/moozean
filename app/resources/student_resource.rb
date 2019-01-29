class StudentResource < JSONAPI::Resource
  attributes :name, :uniid, :report, :refund, :matriculationnumber,:comment
  # Relationen zu bisher und aktuell ausgeliehene Ordner
  has_many :folders_lents, class_name:"Folder"
  has_many :folders_returneds, class_name:"Folder"
  has_many :lents, class_name:"Lent"
  filters  :name,:id, :uniid
  filter :nameoruniid, apply: ->(records, value, _options) {
    value_regex = Array.wrap(value).join('|')
    records.where("name ILIKE '#{value_regex}' OR uniid ILIKE '#{value_regex}'")
  }
end
