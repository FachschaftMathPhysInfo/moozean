module Api
  class FolderseriesResource < JSONAPI::Resource
    attributes :name, :obligationtoreport, :description
    has_many :folders
    has_many :subjects
    has_many :typs
    has_many :examinators
    has_many :reports
    has_many :moduls
    has_many :is_abouts
    def self.creatable_fields(context)
      super - %i[folders subjects typs examinators reports moduls is_abouts]
    end

    def self.updatable_fields(context)
      super - %i[folders subjects typs examinators reports moduls is_abouts]
    end
    filter :name, apply: lambda { |records, value, _options|
                           records.name_like(value)
                         }
  end
end
