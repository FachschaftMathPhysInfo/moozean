class Student < ApplicationRecord
  validates :uniid, format: { with: /[a-z][a-z][0-9][0-9][0-9]/,
    message: "uniid malformatted. Example: jb007" }
  validates :refund, inclusion: { in: [ true, false ] }
  validates :report, inclusion: { in: [ true, false ] }
  has_many :lents
  has_many :returneds
  # Relationen zu bisher und aktuell ausgeliehene Ordner
  has_many :folders_lents, :through => :lents,source: :folder, class_name: "Folder"
  has_many :folders_returneds, :through => :returneds,source: :folder, class_name: "Folder"
end
