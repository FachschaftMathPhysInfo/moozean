class LentResource < JSONAPI::Resource
  attributes :created_at
  has_one :student, always_include_linkage_data:true
  has_one :folder
  has_many :emails
end
