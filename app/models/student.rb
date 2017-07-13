class Student < ApplicationRecord
  validates :uniid, format: { with: /[a-z][a-z][0-9][0-9][0-9]/,
    message: "Uni-ID im falschen Format. Sollte so aussehen: jb007" }
  validates :refund, inclusion: { in: [ true, false ] }
  validates :report, inclusion: { in: [ true, false ] }
  validates :uniid, uniqueness: { message:"Es kann nur ein Studierendes geben, dass diese Uni-ID hat." }
  has_many :lents, :dependent => :destroy
  has_many :returneds, :dependent => :destroy
  # Relationen zu bisher und aktuell ausgeliehene Ordner
  has_many :folders_lents, :through => :lents,source: :folder, class_name: "Folder"
  has_many :folders_returneds, :through => :returneds,source: :folder, class_name: "Folder"
end
