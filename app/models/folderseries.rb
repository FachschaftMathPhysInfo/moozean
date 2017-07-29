class Folderseries < ApplicationRecord
  has_many :folders, dependent: :destroy
  has_many :is_ins, dependent: :destroy
  has_many :reports, :through => :is_ins
  has_many :subjects, :through => :reports
  has_many :typs, :through => :reports
  has_many :examined_bies, :through => :reports
  has_many :examinators, :through => :examined_bies
  has_many :is_abouts, :through => :reports
  has_many :moduls, :through => :is_abouts
end
