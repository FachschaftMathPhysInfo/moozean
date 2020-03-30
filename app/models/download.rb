require 'open3'
class Download < ApplicationRecord
  belongs_to :report
  def hashed_username
    Digest::SHA1.hexdigest("#{ENV['PRODUCTION_USERNAME_SALT']}_#{downloader}")[0..5]
  end
  # Generates the file for a given student, does not store their userinfo in database
  def generate_download(folderseries,examinator,student_name)
    buffer= report.make_header
    buffer << '\begin{center}Dieser Prüfungsbericht wurde dir \emph{persönlich} ausschließlich zur privaten Prüfungsvorbereitung überlassen. Sei fair und bitte verbreite ihn nicht weiter. Dein Name steht daher auf jeder Seite. Wir wünschen viel Erfolg beim Lernen.\\ Deine Fachschaft MathPhysInfo \end{center}\cleardoublepage'
    Dir.mktmpdir{ |dir|
      Dir.chdir dir
      pages_s, error = Open3.capture2("pdftk - dump_data | grep 'NumberOfPages' | sed 's/[^0-9]//g'", :stdin_data=>report.pdf, :binmode=>true)
      Open3.capture2("pdftk - burst output #{dir}/current_report_%02d.pdf",:stdin_data => report.pdf,:binmode=>true)
      pages_s.to_i.times do |page|
        buffer << report.generate_page(folderseries,examinator,1,page,pages_s.to_i, dir,"current_report", "Generiert für #{student_name} Technisches: #{hashed_username}@#{Time.now} \\emph{Private Verwendung! Nicht hochladen.}")
      end
      buffer << '\cleardoublepage' << "\n"
      buffer << '\end{document}'
      puts buffer
      File.write("current_report_full.tex",buffer)
      make_log, s=Open3.capture2e("pdflatex -halt-on-error -enable-write18 -output-directory=#{dir} current_report_full.tex")
      puts make_log
      return File.read('current_report_full.pdf')
    }
  end
end
