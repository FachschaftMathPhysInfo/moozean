class Folderseries < ApplicationRecord
  has_many :folders
  has_many :is_ins
  has_many :reports, :through => :is_ins, source: :report, class_name: "Report"
  has_many :subjects, :through => :reports, source: :subject, class_name: "Subject"
  has_many :typs, :through => :reports, source: :typ, class_name: "Typ"
  has_many :examined_bies, :through => :reports, source: :examined_by, class_name: "ExaminedBy"
  has_many :examinators, :through => :examined_bies, source: :examinator, class_name: "Examinator"
  has_many :is_abouts, :through => :reports, source: :is_about, class_name:"IsAbout"
  has_many :moduls, :through => :is_abouts, source: :modul, class_name:"Modul"
end
