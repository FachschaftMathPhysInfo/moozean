class ModulResource < JSONAPI::Resource
  attributes :name, :abbreviation, :link_modulhandbuch
  def self.default_sort
    [{field: 'name', direction: :asc}]
  end
end
