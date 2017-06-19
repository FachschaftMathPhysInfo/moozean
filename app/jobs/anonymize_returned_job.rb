class AnonymizeReturnedJob < ApplicationJob
  queue_as :default

  def perform(returnedItem)
    # Anonymisieren
    returnedItem.student = nil
    returnedItem.save(validate: false)
  end
end
