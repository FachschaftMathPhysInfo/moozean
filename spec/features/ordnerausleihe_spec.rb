feature "Fachschaftler leiht einen Ordner aus.", js:true do
  before(:each) do
    DatabaseCleaner.clean_with(:truncation)
    load "#{Rails.root}/db/seeds.rb"
  end
  scenario "Ordner ohne Pfand" do
    user = Student.all.sample
    ordner = Folder.joins(:folderseries).where({:folderseries=>{:obligationtoreport=> false}}).sample
    visit "/"
    page.fill_in 'Studierendes aussuchen', with: user.name
    el = find('li', :text=> user.name+" "+user.uniid.to_s,:match => :first)
    el.click
    page.fill_in 'Ordner hinzufügen', with: ordner.name
    el2 = find('li', :text=> ordner.name,:match => :first)
    el2.click
    click_button('Ausleihen')
    #page now contains Zurückgeben und ist neue Ausleihe ist möglich
    expect(page).to have_text "ZURÜCKGEBEN"
    expect(page).to have_text "Welches Studierendes leiht aus"
  end
  scenario "Ordner mit Pfand, Studierendes mit Erlaubnis" do
    user = Student.where(refund:true).sample
    ordner = Folder.joins(:folderseries).where({:folderseries=>{:obligationtoreport=> true}}).sample
    visit "/"
    page.fill_in 'Studierendes aussuchen', with: user.name
    el = find('li', :text=> user.name+" "+user.uniid.to_s,:match => :first)
    el.click
    page.fill_in 'Ordner hinzufügen', with: ordner.name
    el2 = find('li', :text=> ordner.name,:match => :first)
    el2.click
    click_button('Ausleihen')
    #page now contains Zurückgeben und ist neue Ausleihe ist möglich
    expect(page).to have_text "ZURÜCKGEBEN"
    expect(page).to have_text "Welches Studierendes leiht aus"
  end
end
