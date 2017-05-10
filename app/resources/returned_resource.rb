class ReturnedResource < JSONAPI::Resource
  attributes :lentat
  has_one :student
  has_one :folder
end
