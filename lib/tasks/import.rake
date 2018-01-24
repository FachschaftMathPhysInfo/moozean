require 'csv'
namespace :import do
  desc "Berichte importieren aus csv-Datei. pruefungen in pruefungen.csv, um passende Subject und Typ zu finden...(6)"
  task :berichte, [:filename,:pruefungen,:pruefer,:vorlesungen,:berichteordner]=> :environment do |t, args|
    args.with_defaults(:filename=>"berichte.csv",:pruefungen=>"pruefungen.csv",:pruefer=>"pruefer.csv",:vorlesungen=>"vorlesungen.csv",:berichteordner=>"")
    #"id","pruefung","vorl1","vorl2","vorl3","pruefer1","pruefer2","pruefer3","jahr","monat","dateiname","orgname","seiten","cname","cdate","mname","mdate"
    berichte = CSV.read(args.filename,headers:true)
    pruefungen = CSV.read(args.pruefungen,headers:true)
    vorlesungen = CSV.read(args.vorlesungen,headers:true)
    pruefer = CSV.read(args.pruefer,headers:true)
    berichte.each do |bericht|
      exm_at=Date.new(bericht["jahr"].to_i,bericht["monat"].to_i,1)
      pr =  pruefungen.find do |row|
        row["id"]==bericht["pruefung"]
      end
      puts "Finde subject"
      sub= Subject.find_by(name:pr["studiengang"])
      p pr
      puts "Finde typ"
      typ= Typ.find_by(name:pr["pruefung"].to_s+" "+pr["fach"].to_s)
      puts "Berichtdateiname:"+bericht["dateiname"]
      #
      puts "Erstelle report"
      if not File.exist?(args.berichteordner+"/orig/"+bericht["dateiname"])
        puts "Skipping!"
        next
      end
      rp=Report.create(pdf:File.read(args.berichteordner+"/orig/"+bericht["dateiname"]),examination_at:exm_at,subject:sub,typ:typ)
      puts "speichern"
      rp.save!
      puts "gespeichert"
      #vorlesungen finden
      3.times do |k|
        if bericht["vorl"+(k+1).to_s].to_i!=0
          m =  vorlesungen.find do |row|
            row["id"]==bericht["vorl"+(k+1).to_s]
          end
          puts "suche modul "+k.to_s+ " mit ID"+bericht["vorl"+(k+1).to_s]
          modl=Modul.find_by(name:m["vorlesung"])
          IsAbout.create(report:rp,modul:modl)
          puts "gespeichert"
        end
      end
      #pruefer hinzufügen
      3.times do |k|
        if bericht["pruefer"+(k+1).to_s].to_i!=0
          p =  pruefer.find do |row|
            row["id"]==bericht["pruefer"+(k+1).to_s]
          end
          puts "suche pruefer "+k.to_s+ " mit ID"+bericht["pruefer"+(k+1).to_s]
          exal=Examinator.find_by(surname:p["nachname"],givenname:p["vorname"])
          ExaminedBy.create(report:rp,examinator:exal)
        end
      end
      #is Ins anlegen
      puts "Suche signatur"+pr["signatur"]
      p Folderseries.find_by("name ILIKE ?","%"+pr["signatur"] +"%")
      if not Folderseries.find_by("name ILIKE ?","%"+pr["signatur"] +"%")==nil
      IsIn.create(folderseries:Folderseries.find_by("name ILIKE ?","%"+pr["signatur"] +"%"),report:rp)
      puts "gefunden"
    end
    end
  end

  desc "Pruefer importieren aus csv-Datei mit Komma getrennt und Header(5)"
  task :pruefer, [:filename]=> :environment do |t, args|
    args.with_defaults(:filename => "pruefer.csv")
    puts "Filename: #{args.filename}"
    pruefer = CSV.read(args.filename,headers:true)
    pruefer.each do |pruefendes|
      puts pruefendes["id"]
      Examinator.create(surname:pruefendes["nachname"],givenname:pruefendes["vorname"])
    end
  end

  desc "Pruefungen importieren aus csv-Datei (4)"
  task :pruefungen, [:filename] => :environment do |t, args|
    args.with_defaults(:filename => "pruefungen.csv")
    pruefungen = CSV.read(args.filename,headers:true)
    pruefungen.each do |pruefung|
      #"id","studiengang","pruefung","fach","gebiet","vorlesungen","signatur"
      #insert studiengang (if not exsits) as subject
      subj=Subject.find_by(name:pruefung["studiengang"])
      if subj==nil
        Subject.create(name:pruefung["studiengang"])
      end
      pruef=Typ.find_by(name:pruefung["pruefung"].to_s+" "+pruefung["fach"].to_s)
      if pruef==nil
        Typ.create(name:pruefung["pruefung"].to_s+" "+pruefung["fach"].to_s)
      end
      geb=Modul.find_by(name:pruefung["gebiet"])
      if geb==nil
        Modul.create(name:pruefung["gebiet"])
      end
    end
  end

  desc "Vorlesungen importieren aus csv-Datei (3)"
  task :vorlesungen, [:filename] => :environment do |t, args|
    args.with_defaults(:filename=> "vorlesungen.csv")
    lectures = CSV.read(args.filename,headers:true)
    lectures.each do |lecture|
      #erst suchen
      if not Modul.exists?(name:lecture["vorlesung"])
        Modul.create(name:lecture["vorlesung"])
      end
    end
  end

  desc "Studenten importieren aus csv-Datei (2)"
  task :studenten, [:filename] => :environment do |t,args|
    args.with_defaults(:filename =>"studenten.csv")
    students = CSV.read(args.filename,headers:true)
    students.each do |studente|
      if studente["uniid"]!=""
        s=Student.find_or_create_by(name:studente["name"], uniid:studente["uniid"].to_s.downcase,matriculationnumber:studente["matrikelnummer"],refund:studente["refund"],report:studente["bericht1"]!="")
        s.save!
      end
    end
  end
  desc "restliche Studenten importieren aus csv-Datei (2a)"
  task :studenten_without_uniid, [:filename] => :environment do |t,args|
    args.with_defaults(:filename =>"studenten.csv")
    students = CSV.read(args.filename,headers:true)
    students.each do |studente|
      if studente["uniid"]==""
        s=Student.find_or_create_by(name:studente["name"], uniid:"00007",matriculationnumber:studente["matrikelnummer"],refund:studente["refund"],report:studente["bericht1"]!="")
        s.save!
      end
    end
  end
  desc "Ordner(reihen) importieren (1)"
  task :ordner, [:filename]=>:environment do |t,args|
    args.with_defaults(:filename=>"ordner.csv")
    folders= CSV.read(args.filename,headers:true)
    folders.each do |folder|
      p folder
      fo= Folderseries.find_by(name:folder["name"].split(/(?<=[0-9])/)[0])
      sf =folder["name"].split(/(?<=[0-9])/)[1]
      if sf==nil
        sf=""
      end
      if fo ==nil
        fs=Folderseries.create(name:folder["name"].split(/(?<=[0-9])/)[0],obligationtoreport:folder["berichtpflicht"],description:folder["inhalt"])
        Folder.create(barcode:folder["barcode"],folderseries:fs,suffix:sf)
      else
        Folder.create(barcode:folder["barcode"],folderseries:fo,suffix:folder["name"].split(/[0-9]/)[1])
      end
    end
  end
end
