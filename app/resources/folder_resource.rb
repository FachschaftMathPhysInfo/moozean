class FolderResource < JSONAPI::Resource
  attributes :name, :content, :obligation_to_report, :barcode
end
