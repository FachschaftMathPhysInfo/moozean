class PrintoutResource < JSONAPI::Resource
  attributes :times
  has_one :report
  after_save :print_document
  def print_document
    #Printing files()
    file = Tempfile.new(["tmpdf",".pdf"])
    puts file.path
    file.write(self.report.pdf)
    system("lp -d sw-duplex <", file.path) or raise "lp failed"
    file.close()
  end
end
