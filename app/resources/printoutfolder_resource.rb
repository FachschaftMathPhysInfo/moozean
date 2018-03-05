class PrintoutfolderResource < JSONAPI::Resource
  attributes :times
  has_one :folderseries
  after_save :print_documents
  def print_documents
    @model.folderseries.reports.each do |report|
      report.examinators.each { |examinator|
      report.print_document(@model.folderseries,examinator,@model.times)
      }
    end
  end
end
