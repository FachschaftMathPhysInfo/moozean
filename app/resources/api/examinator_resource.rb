module Api
  class ExaminatorResource < JSONAPI::Resource
    attributes :givenname, :surname, :title
    has_many :reports, acts_as_set: true
    filter :name, apply: lambda { |records, value, _options|
                           records.name_like(value)
                         }
  end
end
