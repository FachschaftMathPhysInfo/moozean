class Subject < ApplicationRecord
  has_many :reports, dependent: :destroy
end
