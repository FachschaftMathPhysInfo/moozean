class PrintoutResource < JSONAPI::Resource
  attributes :times
  has_one :report
  after_save :print_document
  has_one :folderseries
  has_one :examinator
  def print_document
    buffer = ''
    buffer << '\documentclass[a4paper,twoside]{article}'
    buffer << '\usepackage[absolute]{textpos}'
    buffer << '\usepackage{graphicx}'
    buffer << '\DeclareGraphicsExtensions{.pdf}'
    buffer << '\usepackage[utf8]{inputenc}'
    buffer << '\pagestyle{empty}'
    buffer << '\renewcommand{\familydefault}{\sfdefault}'
    buffer << '\parindent0mm'
    buffer << '\begin{document}'
    pages_s, error = Open3.capture2("pdftk - dump_data | grep 'NumberOfPages' | sed 's/[^0-9]//g'", :stdin_data=>@model.report.pdf, :binmode=>true)
    Open3.capture2("pdftk - burst output tmp/current_report_%02d.pdf",:stdin_data => @model.report.pdf,:binmode=>true)
        pages_s.to_i.times do |page|
          buffer << '\begin{textblock*}{1cm}(0mm,0mm)'
          buffer << '\setlength{\unitlength}{1mm}'
          buffer << '\begin{picture}(0,0)(0,0)'
          buffer << '\thinlines'
          buffer << '\put(5,-17){\line(1,0){200}}'
          buffer << '\put(48,-17){\line(0,1){12}}'
          buffer << '\fontsize{11pt}{21}\selectfont'
          buffer << '\put(5,-11){\Huge $\mu\varphi$}'
          buffer << '\put(18,-7){\scriptsize Fachschaft MathPhys}'
          buffer << '\put(18,-10){\scriptsize Universität Heidelberg}'
          buffer << '\put(18,-15){\bf Prüfungsbericht}'
          buffer << '\put(50,-9){\Large{\bf ' << @model.examinator.surname << '}, ' << @model.examinator.givenname << '}'
          buffer << '\put(50,-15){\scriptsize ' << @model.report.typ.name << '{ $\triangleright$ }' << @model.report.subject.name << '{ $\triangleright$ }'
          @model.report.moduls.each do |mod|
            buffer << mod.name << ', '
          end
          buffer = buffer.chop.chop
          buffer << '}\put(145,-7.5){\tiny Ordner:}'
          buffer << '\put(145,-15){\Huge\bf ' << @model.folderseries.name << '}'
          buffer << '\put(172,-5.6){\tiny Datum:}'
          buffer << '\put(172,-9){\normalsize\bf ' << @model.report.examination_at.strftime("%Y-%m") << '}'
          buffer << '\put(172,-11.6){\tiny Nummer:}'
          buffer << '\put(172,-15){\normalsize\bf ' << @model.report.id.to_s << '}'
          buffer << '\put(190,-7.5){\tiny Seite:}'
          buffer << '\put(190,-15){\Huge\bf ' << (page+1).to_s << '{\large \,}/{\large \,}' << pages_s << '}'
          buffer << '\put(6,-297){\includegraphics*[width=198mm,height=280mm]{tmp/current_report_' << "%02d" % (page+1) << '.pdf}}'
          buffer << '\end{picture}'
          buffer << '\end{textblock*}'
          buffer << '\null\newpage'
        end
      buffer << '\end{document}'
    Dir.mktmpdir {|dir|
    Open3.capture2e("pdflatex -halt-on-error -output-directory=#{dir} -jobname=current_report_full", :stdin_data => buffer, :binmode=>true)
    self.times.times do |k|
      Open3.capture2e("lp -d sw-duplex - < #{dir}/current_report_full.pdf")
    end
  }
  end
end
