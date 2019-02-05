class Report < ApplicationRecord
  belongs_to :subject
  belongs_to :typ
  before_save :no_loose_ends, :render_picture
  has_many :is_ins, dependent: :delete_all
  has_many :folderseries, through: :is_ins
  has_many :examined_bies, dependent: :delete_all
  has_many :examinators, through: :examined_bies
  has_many :is_abouts, dependent: :delete_all
  has_many :moduls, through: :is_abouts

  def render_picture
    if(self.pdf!=nil)
      o,e, s = Open3.capture3(
        'pdftk A=- cat A1 output - | convert -density 72 - -trim -quality 100 -flatten -sharpen 0x1.0 -crop 100%x50% png:-',
        stdin_data: self.pdf, binmode: true)
      puts e
      puts s
      self.picture = 'data:image/png;base64,' + Base64.encode64(o)
    end
  end

  def no_loose_ends
    if(self.pdf==nil)
      self.pdf=self.pdf_was
    end
    if(self.tex==nil)
      self.tex=self.tex_was
    end
  end

  def make_header(folderseries,examinator, times)
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

  def generate_page(folderseries,examinator,times, page,pages_s,dir,report_name)
    buffer =  '\begin{textblock*}{1cm}(0mm,0mm)'<<"\n"
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
    if examinator.nil?
      buffer << '\put(67,-9){\Large{\bf unknown}, unbekannt}'<<"\n"
    else
      buffer << '\put(67,-9){\Large{\bf ' << examinator.surname << '}, ' << examinator.givenname << '}'<<"\n"
    end
    buffer << '\put(67,-15){\scriptsize ' << self.typ.name << '{ $\triangleright$ }' << self.subject.name << '{ $\triangleright$ }'<<"\n"
    buffer << self.moduls.collect{|mod| mod.name}.join(", ")
    buffer << '}' << "\n" << '\put(145,-7.5){\tiny Ordner:}'<<"\n"
    buffer << '\put(50,-16){\begin{pspicture}(1.2cm,1.2cm)\psbarcode[scalex=0.8,scaley=0.8]{'<<self.id.to_s<<"-"<<page.to_s<<'}{}{qrcode}\end{pspicture}}'<<"\n"
    buffer << '\put(145,-15){\Huge\bf ' << folderseries.name << '}'<<"\n"
    buffer << '\put(172,-5.6){\tiny Datum:}'<<"\n"
    buffer << '\put(172,-9){\normalsize\bf ' << self.examination_at.strftime("%Y-%m") << '}'<<"\n" unless self.examination_at.nil?
    buffer << '\put(172,-11.6){\tiny Nummer:}'<<"\n"
    buffer << '\put(172,-15){\normalsize\bf ' << self.id.to_s << '}'<<"\n"
    buffer << '\put(190,-7.5){\tiny Seite:}'<<"\n"
    buffer << '\put(190,-15){\Huge\bf ' << (page+1).to_s << '{\large \,}/{\large \,}' << pages_s.to_s << '}'<<"\n"
    buffer << '\put(6,-297){\includegraphics*[width=198mm,height=280mm]{'<<dir<<'/' << report_name << '_' << "%02d" % (page+1) << '.pdf}}'<<"\n"
    buffer << '\end{picture}'<<"\n" << '\end{textblock*}'<<"\n" << '\null\newpage'<<"\n"
    buffer
  end

  def add_report(buffer,dir,folderseries,examinator,index)
    pages_s, error = Open3.capture2("pdftk - dump_data | grep 'NumberOfPages' | sed 's/[^0-9]//g'", :stdin_data=>self.pdf, :binmode=>true)
    Open3.capture2("pdftk - burst output #{dir}/report_#{index}_%02d.pdf",:stdin_data => self.pdf,:binmode=>true)
    pages_s.to_i.times do |page|
      buffer << generate_page(folderseries,examinator,1,page,pages_s.to_i, dir,"report_#{index}")
    end
    buffer << '\cleardoublepage' << "\n"
  end

  def print_document(folderseries,examinator, times)
    buffer= make_header(folderseries,examinator,times)
    Dir.mktmpdir{ |dir|
      puts buffer
      Dir.chdir dir
      pages_s, error = Open3.capture2("pdftk - dump_data | grep 'NumberOfPages' | sed 's/[^0-9]//g'", :stdin_data=>self.pdf, :binmode=>true)
      Open3.capture2("pdftk - burst output #{dir}/current_report_%02d.pdf",:stdin_data => self.pdf,:binmode=>true)
      pages_s.to_i.times do |page|
        buffer << generate_page(folderseries,examinator,times,page,pages_s.to_i, dir,"current_report")
      end
      buffer << '\cleardoublepage' << "\n"
      buffer << '\end{document}'
      puts buffer
      File.write("current_report_full.tex",buffer)
      make_log, s=Open3.capture2e("pdflatex -halt-on-error -enable-write18 -output-directory=#{dir} current_report_full.tex")
      puts make_log
      times.times do |k|
        p "lp -d #{ENV['PRINTER_NAME']} -h #{ENV['PRINTER_HOST']}  - < #{dir}/current_report_full.pdf"
        print_log, s=Open3.capture2e("lp -d #{ENV['PRINTER_NAME']} -h #{ENV['PRINTER_HOST']}   < #{dir}/current_report_full.pdf")
        puts print_log
      end
    }
  end
end
