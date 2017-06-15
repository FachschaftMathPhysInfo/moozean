class ReportResource < JSONAPI::Resource
  attributes :tex, :examination_date, :created_at, :picture
  has_one :subject
  has_one :typ
  has_many :examinators
  has_many :moduls
  def pdf
    @model.pdf
  end
end
