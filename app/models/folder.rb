class Folder < ApplicationRecord
  validates :name, presence:true
  has_many :lents
  has_many :returneds
  has_many :students_lents, :through => :lents, class_name: "Student"
  has_many :students_returneds, :through => :returneds, class_name: "Student"
end
