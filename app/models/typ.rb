class Typ < ApplicationRecord
  has_many :reports, dependent: :destroy
  scope :name_like, ->(name){ where("name ILIKE ?","%"+name[0]+"%")}
end
