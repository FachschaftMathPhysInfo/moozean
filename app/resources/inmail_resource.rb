class InmailResource < JSONAPI::Resource
  attributes :fromaddress, :subject, :body,:uid, :created_at
  has_many :attachments, always_include_linkage_data: true
end
