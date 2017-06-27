class Addingtypetoattachment < ActiveRecord::Migration[5.1]
  def change
    add_column :attachments, :content_type,:string
  end
end
