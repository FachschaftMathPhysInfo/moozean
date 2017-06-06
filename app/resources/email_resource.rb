class EmailResource < JSONAPI::Resource
  attributes :address, :subject, :body, :created_at
  has_one :referencable, :polymorphic => true
  after_save :send_mail
  def send_mail
    #Sending an emails
    puts self
    puts "Hallo"
    mail= {body: self.body, address: self.address, subject: self.subject}
    puts mail
    StandardEmailMailer.send_email(mail).deliver_now
  end
end
