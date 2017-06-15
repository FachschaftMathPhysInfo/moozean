class Folder < ApplicationRecord
  has_many :lents
  has_many :returneds
  has_many :students_lents, :through => :lents, source: :student,class_name: "Student"
  has_many :students_returneds, :through => :returneds,source: :student, class_name: "Student"
  belongs_to :folderseries
end
