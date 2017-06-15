class TypResource < JSONAPI::Resource
  attributes :name
  has_many :report
end
