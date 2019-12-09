module Api
  class AttachmentResource < JSONAPI::Resource
    attributes :name, :attachment, :content_type, :created_at
    def attachment
      if @model.content_type.start_with? 'text'
        @model.pdf.encode(Encoding.find('UTF-8'), invalid: :replace, undef: :replace, replace: '')
      else
        Base64.encode64(@model.pdf)
      end
    end

    def name
      @model.name.encode(Encoding.find('UTF-8'), invalid: :replace, undef: :replace, replace: '')
    end
  end
end
