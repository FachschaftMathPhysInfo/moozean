require 'net/imap'
class RetrieveEmailsJob < ApplicationJob
  queue_as :default
  def decode_utf8(str)
    if m = /=\?([A-Za-z0-9\-]+)\?(B|Q)\?([!->@-~]+)\?=/i.match(str)
      decoded = m[3].unpack("M").first.gsub('_',' ')
      return Iconv.conv('utf-8',m[1],decoded) # to convert to utf-8
    else
      return str
    end
  end
  def force_decode(str)
    str= "" if str.nil?
    str.encode(Encoding.find('UTF-8'), {invalid: :replace, undef: :replace, replace: ''})
  end
  def perform(*args)
    # create the imap connection
    p EMAIL_CONFIG["imap_server"]
    p ENV['PRODUCTION_IMAP_SERVER']
    p ENV['PRODUCTION_IMAP_PORT']
    p ENV['PRODUCTION_EMAIL_ADDRESS']
    imap = nil
    begin
      imap = Net::IMAP.new(ENV['PRODUCTION_IMAP_SERVER'], ENV['PRODUCTION_IMAP_PORT'], true, nil,false)
    rescue
      puts "No connection"
      return 0
    end
    #login
    address=ENV['PRODUCTION_EMAIL_ADDRESS']
    address="pruefungsberichte@mathphys.stura.uni-heidelberg.de" if address.nil?
    imap.login(address, ENV['PRODUCTION_EMAIL_PASSWORD'])
    #mail box laden
    imap.select(ENV['PRODUCTION_EMAIL_BOX'] )
    #iterieren durch alle nicht gesehen nachrichten
    imap.search(["NOT","DELETED","NOT","FLAGGED"]).each do |message_id|
      imap_message=imap.fetch(message_id,['ENVELOPE','UID','RFC822'])[0]
      message= Mail.read_from_string imap_message.attr["RFC822"]
      body=""
      if message.multipart? then
        body=message.parts.detect {|a| a.content_type.start_with? 'text/plain'}.decoded unless message.parts.detect {|a| a.content_type.start_with? 'text/plain'}.nil?
      else
        body=message.body.decoded
      end
      fromname = decode_utf8(imap_message.attr["ENVELOPE"].sender[0].name)
      inmail=Inmail.create(fromaddress:message.from[0].to_s,fromname:decode_utf8(fromname),subject:decode_utf8(message.subject), body: force_decode(body), uid:imap_message.attr['UID'].to_s)
      message.attachments.each do |attachment|
        Attachment.create(content_type: attachment.content_type.split(';')[0],pdf:attachment.decoded,name:force_decode(attachment.content_type_parameters['name']),inmail:inmail)
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
