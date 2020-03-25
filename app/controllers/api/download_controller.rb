module Api
    class DownloadController < ApplicationController
        #TODO:Let users decide which folder series and folder they aredownloading
        def show
            student = Student.find(params[:student])
            report = Report.find(params[:report])
            if !student || !report
                raise ActionController::RoutingError.new('Not Found')
            else
                if report.folderseries.any?{|folders| folders.obligationtoreport } && (student.refund||student.report)
                    down = Download.create(downloader:request.headers["X-Forwarded-User"],report:report)
                    file = down.generate_download(report.folderseries[0],report.examinators[0],student.name)
                    send_data file, type: "application/pdf"
                else
                    render text:  'Forbidden, formale Beschränkung nicht erfüllt', status: 403
                end
            end
        end
    end
  end