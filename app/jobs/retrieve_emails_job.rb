require 'net/imap'
class RetrieveEmailsJob < ApplicationJob
  queue_as :default
  def decode_utf8(str)
    if m = /=\?([A-Za-z0-9\-]+)\?(B|Q)\?([!->@-~]+)\?=/i.match(fromname)
      decoded = m[3].unpack("M").first.gsub('_',' ')
      return Iconv.conv('utf-8',m[1],decoded) # to convert to utf-8
    else
      return str
    end
  end
  def perform(*args)
    # create the imap connection
    imap = Net::IMAP.new(EMAIL_CONFIG["imap_server"], EMAIL_CONFIG["imap_port"], EMAIL_CONFIG["use_ssl"], nil, EMAIL_CONFIG["ignore_ssl_error"])
    #login
    imap.login(EMAIL_CONFIG["email_username"], EMAIL_CONFIG["password"])
    #mail box laden
    imap.select(EMAIL_CONFIG["box"])
    #iterieren durch alle nicht gesehen nachrichten
    imap.search(["NOT","DELETED","NOT","FLAGGED"]).each do |message_id|
      imap_message=imap.fetch(message_id,['ENVELOPE','UID','RFC822'])[0]
      message= Mail.read_from_string imap_message.attr["RFC822"]
      body=""
      if message.multipart? then
        body=message.parts.detect {|a| a.content_type.start_with? 'text/plain'}.decoded
      else
        body=message.body.decoded
      end
      fromname = decode_utf8(imap_message.attr["ENVELOPE"].sender[0].name)
      inmail=Inmail.create(fromaddress:message.from[0],fromname:fromname,subject:message.subject, body: body, uid:imap_message.attr['UID'])
      message.attachments.each do |attachment|
        Attachment.create(content_type: attachment.content_type.split(';')[0],pdf:attachment.decoded,name:decode_utf8(attachment.content_type_parameters['name']),inmail:inmail)
      end
      uid = imap_message.attr['UID']
      imap.uid_store(uid, "+FLAGS", [:Flagged])
    end
    #ausloggen
    imap.logout
    #verbindung trennen
    imap.disconnect
  end
end
