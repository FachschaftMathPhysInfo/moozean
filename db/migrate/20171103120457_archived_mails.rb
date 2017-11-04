class ArchivedMails < ActiveRecord::Migration[5.1]
  def change
        add_column :inmails, :archived, :boolean, :default => false
  end
end
