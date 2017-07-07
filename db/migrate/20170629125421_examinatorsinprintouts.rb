class Examinatorsinprintouts < ActiveRecord::Migration[5.1]
    def change
      add_reference :printouts, :examinator, foreign_key: true
    end
end
