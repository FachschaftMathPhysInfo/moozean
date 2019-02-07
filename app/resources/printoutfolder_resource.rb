class PrintoutfolderResource < JSONAPI::Resource
  attributes :times
  has_one :folderseries
  after_save :print_documents

  def make_header()
    buffer = ''
    buffer << '\documentclass[a4paper,twoside]{article}'<<"\n"
    buffer << '\usepackage[absolute]{textpos}'<<"\n"
    buffer << '\usepackage{psfrag}'<<"\n"
    buffer << '\usepackage{pst-barcode}'<<"\n"
    buffer << '\usepackage[runs=2, crop=off]{auto-pst-pdf}'<<"\n"
    buffer << '\usepackage{graphicx}'<<"\n"
    buffer << '\DeclareGraphicsExtensions{.pdf}'<<"\n"
    buffer << '\usepackage[T1]{fontenc}'<<"\n"
    buffer << '\usepackage[utf8]{inputenc}'<<"\n"
    buffer << '\pagestyle{empty}'<<"\n"
    buffer << '\renewcommand{\familydefault}{\sfdefault}'<<"\n"
    buffer << '\parindent0mm'<<"\n"
    buffer << '\usepackage{pst-barcode}'<<"\n"
    buffer << '\begin{document}'<<"\n"
    buffer
  end

  def add_reports(buffer,dir)
    index = 1
    @model.folderseries.reports.sort_by{ |r| 
      [r.moduls.empty? ? 'zzz' : r.moduls.first.name,
       r.examinators.empty? ? 'zzz' : r.examinators.first.surname]
    }.each do |report|
        examinator = report.examinators.first
        report.add_report(buffer,dir,@model.folderseries,examinator,index)
        index += 1
    end
  end

  def print_documents
    buffer= make_header()
    Dir.mktmpdir{ |dir|
      Dir.chdir dir
      add_reports(buffer,dir)
      buffer << '\end{document}'
      puts buffer
      File.write("current_report_full.tex",buffer)
      make_log, s=Open3.capture2e("pdflatex -halt-on-error -enable-write18 -output-directory=#{dir} current_report_full.tex")
      puts make_log
      @model.times.times do |k|
        p "lp -d #{ENV['PRINTER_NAME']} -h #{ENV['PRINTER_HOST']}  - < #{dir}/current_report_full.pdf"
        print_log, s=Open3.capture2e("lp -d #{ENV['PRINTER_NAME']} -h #{ENV['PRINTER_HOST']}   < #{dir}/current_report_full.pdf")
        puts print_log
      end
    }
  end
end
