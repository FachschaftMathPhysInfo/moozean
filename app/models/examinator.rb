class Examinator < ApplicationRecord
  # Removed default_scope order(:surname) because it caused Postgres errors when
  # JSONAPI-resources builds DISTINCT queries for related examinators:
  #   SELECT DISTINCT ... ORDER BY examinators.surname
  # Postgres requires ORDER BY columns be present in select list with DISTINCT.
  # We'll handle ordering explicitly at the API/resource or client level.
  has_many :examined_bies, dependent: :destroy
  has_many :reports, :through => :examined_bies
  scope :name_like, ->(name){ where("surname ILIKE ?","%"+name[0]+"%")}
end
