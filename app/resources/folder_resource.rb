class FolderResource < JSONAPI::Resource
  attributes :barcode, :suffix
  has_one :folderseries
  has_many :students_lents, class_name:"Student"
  has_many :students_returneds, class_name:"Student"
end
