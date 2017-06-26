class CreateInmails < ActiveRecord::Migration[5.1]
  def change
    create_table :inmails do |t|
      t.string :fromaddress
      t.string :subject
      t.string :body
      t.string :uid

      t.timestamps
    end
    add_index :inmails, :uid, unique: true
  end
end
