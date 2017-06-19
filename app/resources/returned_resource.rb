class ReturnedResource < JSONAPI::Resource
  attributes :lentat
  has_one :student
  has_one :folder
  after_save :anonymize_student
  def anonymize_student
    # eine Stunde warten bis anonymisiert wird.
    AnonymizeReturnedJob.set(wait: 1.hour).perform_later @model
  end
end
