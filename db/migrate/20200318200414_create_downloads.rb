class CreateDownloads < ActiveRecord::Migration[5.1]
  def change
    create_table :downloads do |t|
      t.references :report, foreign_key: true
      t.string :downloader# the downloader (aka client name)

      t.timestamps
    end
  end
end
