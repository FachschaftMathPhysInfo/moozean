class FolderResource < JSONAPI::Resource
  attributes :barcode, :name
  has_one :folderseries
  has_many :students_lents, class_name:"Student"
  has_many :students_returneds, class_name:"Student"
  def name
    @model.foldername
  end
end
