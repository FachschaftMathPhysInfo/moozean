require 'capybara/rspec'
require 'database_cleaner'
feature "Fachschaftler trägt Bericht ein", js:true do
  before(:each) do
    DatabaseCleaner.clean_with(:truncation)
    load "#{Rails.root}/db/seeds.rb"
  end
  scenario "Bericht eintragen und suchen in Berichtssuche" do
    visit "/moor/report/new"
    studienfach = Subject.offset(rand(Subject.count)).first
    typ = Typ.offset(rand(Typ.count)).first
    modul = Modul.offset(rand(Modul.count)).first(rand(5))
    pruefende = Examinator.offset(rand(Examinator.count)).first(rand(3))
    ordnerreihen = Folderseries.offset(rand(Folderseries.count)).first(rand(5))
    fill_in_autocomplete "Wähle ein Studienfach", with: studienfach.name
    fill_in_autocomplete "Wähle einen Prüfungstyp", with: typ.name
    fill_in_chips "Module auswählen", modul.map{|m| m.name}
    fill_in_chips "Prüfende auswählen", pruefende.map{|pr| pr.surname}
    fill_in_chips "Ordnerreihen", ordnerreihen.map{|o| o.name}
    #click_button('PDF hochladen')
    #pdf visible machen
    execute_script("$(\"input:file[accept='.pdf']\").show().attr(\"name\",\"pdf\")")
    attach_file("pdf", Rails.root + "erd.pdf",{ make_visible: true,:class=>"file-picker__input"})
    accept_alert do
      click_button "Speichern"
    end
    visit "/moor/search"
    fill_in_autocomplete "Wähle ein Studienfach", with: studienfach.name
    fill_in_autocomplete "Wähle einen Prüfungstyp", with: typ.name
    fill_in_chips "Module auswählen", modul.map{|m| m.name}
    fill_in_chips "Prüfende auswählen", pruefende.map{|pr| pr.surname}
    fill_in_chips "Ordnerreihen", ordnerreihen.map{|o| o.name}
    # Look for the id
    expect(page).to have_text "#"

  end
  scenario "Ordner mit Pfand, Studierendes mit Erlaubnis" do

  end
end
