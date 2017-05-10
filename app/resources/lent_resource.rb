class LentResource < JSONAPI::Resource
  attributes :created_at
  has_one :student
  has_one :folder
end
