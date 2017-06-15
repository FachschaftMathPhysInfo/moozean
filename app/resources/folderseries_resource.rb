class FolderseriesResource < JSONAPI::Resource
  attributes :name, :obligationtoreport, :description
  has_many :folder
end
