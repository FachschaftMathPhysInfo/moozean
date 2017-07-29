class Examinator < ApplicationRecord
  has_many :examined_bies
  has_many :reports, :through => :examined_bies
end
