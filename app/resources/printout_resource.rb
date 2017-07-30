class PrintoutResource < JSONAPI::Resource
  attributes :times
  has_one :report
  after_save :print_document
  has_one :folderseries
  has_one :examinator
  def print_document
    buffer = ''
    buffer << '\documentclass[a4paper,twoside]{article}'<<"\n"
    buffer << '\usepackage[absolute]{textpos}
\usepackage{psfrag}
\usepackage{pst-barcode}
\usepackage[runs=2, crop=off]{auto-pst-pdf}
\usepackage{graphicx}
\DeclareGraphicsExtensions{.pdf}'<<"\n"
    buffer << '\usepackage[utf8]{inputenc}'<<"\n"
    buffer << '\pagestyle{empty}'<<"\n"
    buffer << '\renewcommand{\familydefault}{\sfdefault}'<<"\n"
    buffer << '\parindent0mm'<<"\n"
    buffer << '\usepackage{pst-barcode}'<<"\n"
    buffer << '\begin{document}'<<"\n"
  Dir.mktmpdir{ |dir|
    Dir.chdir dir
    pages_s, error = Open3.capture2("pdftk - dump_data | grep 'NumberOfPages' | sed 's/[^0-9]//g'", :stdin_data=>@model.report.pdf, :binmode=>true)
    Open3.capture2("pdftk - burst output #{dir}/current_report_%02d.pdf",:stdin_data => @model.report.pdf,:binmode=>true)
        pages_s.to_i.times do |page|
          buffer << '\begin{textblock*}{1cm}(0mm,0mm)'<<"\n"
          buffer << '\setlength{\unitlength}{1mm}'<<"\n"
          buffer << '\begin{picture}(0,0)(0,0)'<<"\n"
          buffer << '\thinlines'<<"\n"
          buffer << '\put(5,-17){\line(1,0){200}}'<<"\n"
          buffer << '\put(48,-17){\line(0,1){12}}'<<"\n"
          buffer << '\fontsize{11pt}{21}\selectfont'<<"\n"
          buffer << '\put(5,-11){\Huge $\mu\varphi$}'<<"\n"
          buffer << '\put(18,-7){\scriptsize Fachschaft MathPhys}'<<"\n"
          buffer << '\put(18,-10){\scriptsize Universität Heidelberg}'<<"\n"
          buffer << '\put(18,-15){\bf Prüfungsbericht}'<<"\n"
          buffer << '\put(67,-9){\Large{\bf ' << @model.examinator.surname << '}, ' << @model.examinator.givenname << '}'<<"\n"
          buffer << '\put(67,-15){\scriptsize ' << @model.report.typ.name << '{ $\triangleright$ }' << @model.report.subject.name << '{ $\triangleright$ }'<<"\n"
          @model.report.moduls.each do |mod|
            buffer << mod.name << ', '
          end
          buffer = buffer.chop.chop
          buffer << '}\put(145,-7.5){\tiny Ordner:}'<<"\n"
          buffer<<'\put(50,-16){\begin{pspicture}(1.2cm,1.2cm)
          \psbarcode[scalex=0.8,scaley=0.8]{'<<@model.report.id.to_s<<"-"<<page.to_s<<'}{}{qrcode}
          \end{pspicture}}'<<"\n"
          buffer << '\put(145,-15){\Huge\bf ' << @model.folderseries.name << '}'<<"\n"
          buffer << '\put(172,-5.6){\tiny Datum:}'<<"\n"
          buffer << '\put(172,-9){\normalsize\bf ' << @model.report.examination_at.strftime("%Y-%m") << '}'<<"\n"
          buffer << '\put(172,-11.6){\tiny Nummer:}'<<"\n"
          buffer << '\put(172,-15){\normalsize\bf ' << @model.report.id.to_s << '}'<<"\n"
          buffer << '\put(190,-7.5){\tiny Seite:}'<<"\n"
          buffer << '\put(190,-15){\Huge\bf ' << (page+1).to_s << '{\large \,}/{\large \,}' << pages_s << '}'<<"\n"
          buffer << '\put(6,-297){\includegraphics*[width=198mm,height=280mm]{'<<dir<<'/current_report_' << "%02d" % (page+1) << '.pdf}}'<<"\n"
          buffer << '\end{picture}'<<"\n"
          buffer << '\end{textblock*}'<<"\n"
          buffer << '\null\newpage'<<"\n"
      end
      buffer << '\end{document}'
      puts buffer
      File.write("current_report_full.tex",buffer)
    make_log, s=Open3.capture2e("pdflatex -halt-on-error -enable-write18 -output-directory=#{dir} current_report_full.tex")
    self.times.times do |k|
      Open3.capture2e("lp -d sw-duplex - < #{dir}/current_report_full.pdf")
    end
  }
  end
end
