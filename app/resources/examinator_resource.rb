class ExaminatorResource < JSONAPI::Resource
  attributes :givenname, :surname, :title
  has_many :reports,acts_as_set:true
end
