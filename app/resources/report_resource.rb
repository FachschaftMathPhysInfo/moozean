class ReportResource < JSONAPI::Resource
  attributes :pdf, :tex, :tex_available, :examination_at, :created_at, :picture
  has_one :subject
  has_one :typ
  has_many :examinators,acts_as_set:true
  has_many :moduls,acts_as_set: true
  has_many :folderseries,acts_as_set: true

  def tex_available
    @model.tex!=''
  end
  def fetchable_fields
    super - [:tex,:pdf]
  end
  def self.updatable_fields(context)
    super - [:tex_available]
  end
  def self.creatable_fields(context)
    super - [:tex_available]
  end
  before_save do
    @model.pdf = Base64.decode64(@model.pdf['data:application/pdf;base64,'.length .. -1])
  end
  def pdf
    @model.pdf
  end
end
