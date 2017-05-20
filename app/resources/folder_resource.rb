class FolderResource < JSONAPI::Resource
  attributes :name, :content, :obligation_to_report, :barcode
  has_many :students_lents, class_name:"Student"
  has_many :students_returneds, class_name:"Student"
end
