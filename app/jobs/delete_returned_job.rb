class DeleteReturnedJob < ApplicationJob
  queue_as :default

  def perform(returnedItem)
    # Delete
    returnedItem.destroy
  end
end
