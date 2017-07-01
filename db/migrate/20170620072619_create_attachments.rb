class CreateAttachments < ActiveRecord::Migration[5.1]
  def change
    create_table :attachments do |t|
      t.binary :pdf
      t.references :inmail, foreign_key: true
      t.string :name

      t.timestamps
    end
  end
end
