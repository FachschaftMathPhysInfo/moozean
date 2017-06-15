class PrintoutResource < JSONAPI::Resource
  attributes :times
  has_one :report
  after_save :print_document
  def print_document
    Open3.capture2("lp -d sw-duplex",:stdin_data => self.report.pdf, :binmode=>true)
  end
end
