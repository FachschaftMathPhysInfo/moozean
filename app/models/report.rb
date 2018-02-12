class Report < ApplicationRecord
  belongs_to :subject
  belongs_to :typ
  before_save :no_loose_ends, :render_picture
  has_many :is_ins, dependent: :delete_all
  has_many :folderseries, through: :is_ins
  has_many :examined_bies, dependent: :delete_all
  has_many :examinators, through: :examined_bies
  has_many :is_abouts, dependent: :delete_all
  has_many :moduls, through: :is_abouts
  def render_picture
    if(self.pdf!=nil)
      o,e, s = Open3.capture3('pdftk A=- cat A1 output - | convert -density 72 - -trim -quality 100 -flatten -sharpen 0x1.0 -crop 100%x50% png:-', stdin_data: self.pdf, binmode: true)
      puts e
      puts s
      self.picture = 'data:image/png;base64,' + Base64.encode64(o)
    end
  end
  def no_loose_ends
    if(self.pdf==nil)
      self.pdf=self.pdf_was
    end
    if(self.tex==nil)
      self.tex=self.tex_was
    end
  end
end
