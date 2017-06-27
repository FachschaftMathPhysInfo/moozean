class InmailResource < JSONAPI::Resource
  attributes :fromaddress, :subject, :body,:uid, :created_at, :fromname
  has_many :attachments, always_include_linkage_data: true
end
