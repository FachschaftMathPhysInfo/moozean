# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
#folders=Folder.create([{name: 'KP1D', obligation_to_report:true},{name: 'KP1B'},{name: 'KP1C'},{name: 'KM1A'},{name: 'KM1B'}])

for i in 0..100
  Student.create(name:Faker::Name.name,uniid:'ab'+rand(0..999).to_s,refund:[true, false].sample,report:[true, false].sample)
end
Folder.create([{name: 'KP1D', obligation_to_report:true},{name: 'KP1B'},{name: 'KP1C'},{name: 'KM1A'},{name: 'KM1B'}])