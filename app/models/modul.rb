class Modul < ApplicationRecord
  has_many :is_abouts, dependent: :destroy
  has_many :reports, :through => :is_abouts
end
