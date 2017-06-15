# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#folders=Folder.create([{name: 'KP1D', obligation_to_report:true},{name: 'KP1B'},{name: 'KP1C'},{name: 'KM1A'},{name: 'KM1B'}])

Subject.create(name:'Physik')
Subject.create(name:'Informatik')
Subject.create(name:'Mathematik')
Type.create(name:'Klausur')
Type.create(name:'Diplomprüfung')
Type.create(name:'Master')
for i in 0..30
  Examinator.create(givenname:Faker::Name.first_name,surname:Faker::Name.last_name,title:Faker::Name.title)
  Modul.create(name:'Mathe'+i.to_s,abbreviation:'M'+i.to_s,link_modulhandbuch:Faker::Internet.url)
end
for i in 0..4
  Folderseries.create(name:Faker::Hipster.word, obligationtoreport:[true, false].sample, description:Faker::Lorem.paragraph)
end
for i in 0..50
  Folder.create(barcode:Faker::Code.ean,suffix:i.to_s,folderseries:Folderseries.offset(rand(Folderseries.count)).first)
  Student.create(name:Faker::Name.name,uniid:'ab'+rand(0..999).to_s,refund:[true, false].sample,report:[true, false].sample)
  report= Report.create(pdf:'test'+rand(0..300).to_s,tex:'tex'+rand(0..300).to_s,examination_date:Faker::Date.between(2.days.ago, Date.tomorrow),subject:Subject.offset(rand(Subject.count)).first,type:Type.offset(rand(Type.count)).first)
  IsAbout.create(modul:Modul.offset(rand(Modul.count)).first,report:report)
  ExaminedBy.create(examinator:Examinator.offset(rand(Examinator.count)).first,report:report)
  IsIn.create(report:report,folderseries:Folderseries.offset(rand(Folderseries.count)).first)
end
Folder.create([{name: 'KP1D', obligation_to_report:true},{name: 'KP1B'},{name: 'KP1C'},{name: 'KM1A'},{name: 'KM1B'}])