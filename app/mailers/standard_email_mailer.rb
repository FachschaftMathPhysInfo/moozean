class StandardEmailMailer < ApplicationMailer
  def send_email(email)
    @email = email
    @url  = 'http://example.com/login'
    mail(to: @email.address, subject: @email.subject)
  end
end
