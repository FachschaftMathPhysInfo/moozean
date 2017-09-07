class ModulResource < JSONAPI::Resource
  attributes :name, :abbreviation, :link_modulhandbuch
  has_many :reports, acts_as_set:true
  def self.default_sort
    [{field: 'name', direction: :asc}]
  end
end
