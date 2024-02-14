namespace :utils do
  desc "reruns all image preview generations"
  task :preview_generate => :environment  do |t, args|
    Report.all.each do |rep|
      rep.render_picture()
      rep.save!
    end
  end
  desc "reruns all image preview generations for a single folder"
  task :preview_generate_folder, [:folder_id]=> :enviroment do |t, args|
    Report.where(folderseries_id:args.folder_id).each do |rep|
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
    desc "Teilt ein Modul in zwei andere auf. Die ersten zwei werden gefüllt, das dritte wird geleert und gelöscht."
    task :split, [:ident_one,:ident_two,:ident_three]=> :enviroment do |t,args|
      puts "Splitting #{Modul.find(args.ident_three).name} into #{Modul.find(args.ident_one).name} and #{Modul.find(args.ident_two).name}"
      IsAbout.where(modul_id:args.ident_three).update_all(modul_id:args.ident_one)
      IsAbout.where(modul_id:args.ident_three).update_all(modul_id:args.ident_two)
      Modul.find(args.ident_three).destroy
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
