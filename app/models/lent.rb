class Lent < ApplicationRecord
  belongs_to :student
  belongs_to :folder
  has_many :emails, :as  =>:referencable
end
