class Modul < ApplicationRecord
  has_many :is_abouts, dependent: :destroy
  has_many :reports, :through => :is_abouts
  scope :name_like, ->(name){ where("name ILIKE ?","%"+name[0]+"%")}
end
