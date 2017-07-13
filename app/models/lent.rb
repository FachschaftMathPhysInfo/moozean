class Lent < ApplicationRecord
  belongs_to :student
  belongs_to :folder
  validates :folder, uniqueness: { message:"Ein Ordner kann nur einmal ausgeliehen werden." }
  has_many :emails, :as  =>:referencable
end
