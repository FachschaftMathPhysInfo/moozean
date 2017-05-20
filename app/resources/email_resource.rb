class EmailResource < JSONAPI::Resource
  attributes :address, :subject, :body
  has_one :referencable, :polymorphic => true
  after_save :send_mail
  def send_mail
    #Sending an emails
    puts self
    StandardEmailMailer.send_email(self).deliver_now
  end
end
