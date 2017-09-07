class Folder < ApplicationRecord
  has_many :lents, dependent: :destroy
  has_many :returneds, dependent: :destroy
  has_many :students_lents, :through => :lents, source: :student,class_name: "Student"
  has_many :students_returneds, :through => :returneds, source: :student, class_name: "Student"
  belongs_to :folderseries
end
