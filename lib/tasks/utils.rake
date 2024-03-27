namespace :utils do
  desc "reruns all image preview generations"
  task :preview_generate => :environment  do |t, args|
    Report.all.each do |rep|
      rep.render_picture()
      rep.save!
    end
  end
  desc "reruns all image preview generations for reports without a rendered picture"
  task :preview_generate_missing => :enviroment do |t, args|
    Report.where(picture:"data:image/png;base64,").each do |rep|
      rep.render_picture()
      rep.save!
    end
  end
  desc ""
  namespace :typ do
    desc "Verschmiltzt zwei Typen zu einem. Namen vom ersten wird übernommen. Zweite danach gelöscht."
    task :merge, [:ident_one,:ident_two]=> :environment do |t, args|
      Report.where(typ_id:args.ident_two).update_all(typ_id:args.ident_one)
      Typ.find(args.ident_two).destroy
    end
  end
  namespace :subject do
    desc "Verschmiltzt zwei Subjects zu einem. Namen vom ersten wird übernommen. Zweite danach gelöscht."
    task :merge, [:ident_one,:ident_two]=> :environment do |t, args|
      Report.where(subject_id:args.ident_two).update_all(subject_id:args.ident_one)
      Subject.find(args.ident_two).destroy
    end
  end
  namespace :modul do
    desc "Verschmiltzt zwei Module zu einem. Namen vom ersten wird übernommen. Zweite danach gelöscht. Mehrfache tags bleiben erhalten."
    task :merge, [:ident_one,:ident_two]=> :environment do |t, args|
      puts "Merging #{Modul.find(args.ident_two).name} into #{Modul.find(args.ident_one).name}"
      IsAbout.where(modul_id:args.ident_two).update_all(modul_id:args.ident_one)
      Modul.find(args.ident_two).destroy
    end
    desc "Teilt ein Modul in zwei andere auf. Das erste wird in die beiden anderen aufgeteilt und dann gelöscht."
    task :split, [:ident_one,:ident_two,:ident_three]=> :enviroment do |t,args|
      puts "Splitting #{Modul.find(args.ident_one).name} into #{Modul.find(args.ident_two).name} and #{Modul.find(args.ident_three).name}"
      isAbout_entrys_ident_one = IsAbout.where(modul_id:args.ident_one)
      module_two = Modul.find(ident_two)
      module_three = Modul.find(ident_three)
      isAbout_entrys_ident_one.each do |is_about|
        rep = Report.find(is_about.report_id)
        IsAbout.create(report:rep,modul:module_two)
        IsAbout.create(report:rep,modul:module_three)
        is_about.destroy
      end
    end
  end
  namespace :folderseries do
    desc "Verschmiltzt zwei Ordnerreihen zu einer. Namen vom ersten wird übernommen. Zweite danach gelöscht. Mehrfache tags bleiben erhalten."
    task :merge, [:ident_one,:ident_two]=> :environment do |t, args|
      puts "Merging #{Folderseries.find(args.ident_two).name} into #{Folderseries.find(args.ident_one).name}"
      IsIn.where(folderseries_id:args.ident_two).update_all(folderseries_id:args.ident_one)
      IsIn.find(args.ident_two).destroy
    end
  end
  namespace :examinator do
    desc "Verschmiltzt zwei Profs zu einem. Namen vom ersten wird übernommen. Zweite danach gelöscht. Mehrfache tags bleiben erhalten."
    task :merge, [:ident_one,:ident_two]=> :environment do |t, args|
      puts "Merging #{Examinator.find(args.ident_two).surname} into #{Examinator.find(args.ident_one).surname}"
      ExaminedBy.where(examinator_id:args.ident_two).update_all(examinator_id:args.ident_one)
      ExaminedBy.find(args.ident_two).destroy
    end
  end
end
