class FolderResource < JSONAPI::Resource
  attributes :barcode, :suffix, :name, :obligationtoreport
  has_one :folderseries
  has_many :students_lents, class_name:"Student"
  has_many :students_returneds, class_name:"Student"

  def obligationtoreport
    @model.folderseries.obligationtoreport
  end
  def self.updatable_fields(context)
    super - [:name,:obligationtoreport]
  end
  def self.creatable_fields(context)
    super - [:name,:obligationtoreport]
  end
  filters  :barcode, :obligationtoreport,:folderseries
  filter :name, apply: ->(records, value, _options) {
  records.name_like(value)
}
end
