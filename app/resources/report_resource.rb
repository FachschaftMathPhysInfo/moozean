class ReportResource < JSONAPI::Resource
  attributes :tex_available, :examination_date, :created_at, :picture
  has_one :subject
  has_one :typ
  has_many :examinators
  has_many :moduls
  def tex_available
    @model.tex!=''
  end
  def pdf
    @model.pdf
  end
end
