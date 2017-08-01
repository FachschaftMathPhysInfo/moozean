class Examinator < ApplicationRecord
  has_many :examined_bies, dependent: :destroy
  has_many :reports, :through => :examined_bies
end
