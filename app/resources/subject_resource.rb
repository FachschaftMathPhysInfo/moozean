class SubjectResource < JSONAPI::Resource
  attributes :name
  has_many :reports,acts_as_set:true
end
