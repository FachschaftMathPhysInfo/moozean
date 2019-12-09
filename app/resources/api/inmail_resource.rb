module Api
  class InmailResource < JSONAPI::Resource
    attributes :fromaddress, :subject, :body, :uid, :created_at, :fromname, :read, :archived
    has_many :attachments, always_include_linkage_data: true
    has_many :emails
    filters :archived
    after_update :delete_inmails
    def delete_inmails
      # eine Stunde warten bis anonymisiert wird.
      if @model.archived
        DeleteInmailJob.set(wait: 182.days).perform_later @model
      end
    end

    def self.default_sort
      [{ field: 'id', direction: :desc }]
    end
  end
end
