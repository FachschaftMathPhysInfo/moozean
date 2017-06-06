class StandardEmailMailer < ApplicationMailer
  def send_email(email)
    @email = email
    mail(to: @email[:address], subject: @email[:subject])
  end
end
