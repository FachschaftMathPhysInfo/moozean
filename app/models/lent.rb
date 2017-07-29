class Lent < ApplicationRecord
  belongs_to :student
  belongs_to :folder
  # B validates :folder, uniqueness: { message:"Ein Ordner kann nur einmal ausgeliehen werden." }
  has_many :emails, :as  =>:referencable
  # A before_save :del_the_twins
  # A def del_the_twins
  # A  Lent.where(folder: self.folder).destroy_all()
  # A end
end
