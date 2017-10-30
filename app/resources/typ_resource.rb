class TypResource < JSONAPI::Resource
  attributes :name
  has_many :reports,acts_as_set:true
  filter :name, apply: ->(records, value, _options) {
    records.name_like(value)
  }
end
