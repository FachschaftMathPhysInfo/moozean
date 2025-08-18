module Api
  class ExaminatorResource < JSONAPI::Resource
    attributes :givenname, :surname, :title
    has_many :reports, acts_as_set: true
    filter :name, apply: lambda { |records, value, _options|
                           records.name_like(value)
                         }

    def self.default_sort
      # Use id for default sorting to keep SELECT DISTINCT queries valid in Postgres.
      # Client/UI can sort by surname after fetching if needed.
      [{ field: :id, direction: :asc }]
    end
  end
end
