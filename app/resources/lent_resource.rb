class LentResource < JSONAPI::Resource
  has_one :student
  has_one :folder
end
