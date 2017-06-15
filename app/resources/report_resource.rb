class ReportResource < JSONAPI::Resource
  attributes :tex, :pdf, :examination_date, :created_at
  has_one :subject
  has_one :type
end
