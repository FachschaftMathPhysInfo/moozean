class Typ < ApplicationRecord
  has_many :reports, dependent: :destroy
  
end
