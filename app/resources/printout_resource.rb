class PrintoutResource < JSONAPI::Resource
  attributes :times
  has_one :report
  after_save :print_document
  has_one :folderseries
  def print_document
    buffer = ''
    buffer << '\documentclass[a4paper,twoside]{article}'
    buffer << '\usepackage[absolute]{textpos}'
    buffer << '\usepackage{graphicx}'
    buffer << '\usepackage[latin1]{inputenc}'
    buffer << '\pagestyle{empty}'
    buffer << '\renewcommand{\familydefault}{\sfdefault}'
    buffer << '\parindent0mm'
    buffer << '\begin{document}'
    currentreportpdf = self.report.id.to_s << '.pdf'
    currentreportpdf,pages,wait_thrds = Open3.pipeline_rw('pdftk dump_data','grep "NumberOfPages"',"sed 's/[^0-9]//g'")
    unless self.report.typ.name=='Klausur'
      for exm in self.report.examinators
        for page in pages
          exec("pdftk reports/" << self.report.id.to_s << ".pdf cat " << page << " output tmp/" << self.report.id.to_s << "_page_" << page << ".pdf")
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
          buffer << '\put(50,-9){\Large{\bf ' << exm.surname << '}, ' << exm.givenname << '}'
          buffer << '\put(50,-15){\scriptsize ' << self.report.type.name << '{ $\triangleright$ }' << self.report.subject.name << '{ $\triangleright$ }'
          buffer << self.report.moduls.name * ', '
          buffer << '}\put(145,-7.5){\tiny Ordner:}'
          buffer << '\put(145,-15){\Huge\bf ' << self.folderseries.name << '}'
          buffer << '\put(172,-5.6){\tiny Datum:}'
          buffer << '\put(172,-9){\normalsize\bf ' << self.report.examination_at << '}'
          buffer << '\put(172,-11.6){\tiny Nummer:}'
          buffer << '\put(172,-15){\normalsize\bf ' << self.report.id << '}'
          buffer << '\put(190,-7.5){\tiny Seite:}'
          buffer << '\put(190,-15){\Huge\bf ' << page << '{\large \,}/{\large \,}' << pages <<'}'
          buffer << '\put(6,-297){\includegraphics*[width=198mm,height=280mm]{ tmp/' << self.report.id.to_s << '_page_' << page << '.pdf }}'
          buffer << '\end{picture}'
          buffer << '\end{textblock*}'
          buffer << '\null\newpage'
        end
        buffer << '\cleardoublepage'
      end
      buffer << '\end{document}'
    else
      for page in pages
        exec("pdftk reports/" << self.report.id.to_s << ".pdf cat " << page << " output tmp/" << self.report.id.to_s << "_page_" << page << ".pdf")
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
        buffer << '\put(50,-9){\Large{\bf ' << exm.surname << '}, ' << exm.givenname << '}'
        buffer << '\put(50,-15){\scriptsize ' << self.report.type.name << '{ $\triangleright$ }' << self.report.subject.name << '{ $\triangleright$ }'
        buffer << self.report.moduls.name * ', '
        buffer << '\put(145,-7.5){\tiny Ordner:}'
        buffer << '\put(145,-15){\Huge\bf ' << self.folderseries.name << '}'
        buffer << '\put(172,-5.6){\tiny Datum:}'
        buffer << '\put(172,-9){\normalsize\bf ' << self.report.examination_at << '}'
        buffer << '\put(172,-11.6){\tiny Nummer:}'
        buffer << '\put(172,-15){\normalsize\bf ' << self.report.id << '}'
        buffer << '\put(190,-7.5){\tiny Seite:}'
        buffer << '\put(190,-15){\Huge\bf ' << page << '{\large \,}/{\large \,}' << pages <<'}'
        buffer << '\put(6,-297){\includegraphics*[width=198mm,height=280mm]{ tmp/' << self.report.id.to_s << '_page_' << page << '.pdf }}'
        buffer << '\end{picture}'
        buffer << '\end{textblock*}'
        buffer << '\null\newpage'
      end
      buffer << '\cleardoublepage'
      buffer << '\end{document}'
    end
    Open3.capture2("pdflatex -halt-on-error -output-directory=tmp -jobname=current_report", :stdin_data => buffer, :binmode=>true)
    self.times.times do |k|
      exec("lp -d sw-duplex tmp/current_report.pdf")
    end
    exec("rm -rf tmp/* ")
  end
end
