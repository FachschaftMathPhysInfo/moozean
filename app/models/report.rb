class Report < ApplicationRecord
  belongs_to :subject
  belongs_to :typ
  before_save :render_picture
  has_many :is_about
  has_many :is_ins, class_name:"IsIn"
  has_many :folderseries, :through =>:is_ins, source: :folderseries, class_name:"Folderseries"
  has_many :examined_by
  has_many :examinator, :through =>:examined_by, class_name: "Examinator"
  has_many :examined_bies, class_name: "ExaminedBy"
  has_many :examinators, :through => :examined_bies, source: :examinator, class_name: "Examinator"
  has_many :is_abouts, source: :is_about, class_name:"IsAbout"
  has_many :moduls, :through => :is_abouts, source: :modul, class_name:"Modul"
  def render_picture
    o,s = Open3.capture2("pdftk A=- cat A1 output - | convert -density 72 - -trim -quality 100 -flatten -sharpen 0x1.0 -crop 100%x50% png:-",:stdin_data => self.pdf,:binmode=>true)
    self.picture = 'data:image/png;base64,' + Base64.encode64(o)
  end
end
