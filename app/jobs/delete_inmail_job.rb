class DeleteInmailJob < ApplicationJob
  queue_as :default

  def perform(returnedItem)
    returnedItem.destroy
  end
end
