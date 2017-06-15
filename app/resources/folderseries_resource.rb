class FolderseriesResource < JSONAPI::Resource
  attributes :name, :obligationtoreport, :description
  has_many :folders
  has_many :subjects
  has_many :typs
  has_many :examinators
  has_many :reports
  has_many :moduls
  has_many :is_abouts
end
