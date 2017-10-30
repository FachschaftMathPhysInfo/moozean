class ReturnedResource < JSONAPI::Resource
  attributes :lentat, :created_at
  has_one :student
  has_one :folder
  after_save :delete_returned
  def delete_returned
    # eine Stunde warten bis anonymisiert wird.
    DeleteReturnedJob.set(wait: 10.minutes).perform_later @model
  end
end
