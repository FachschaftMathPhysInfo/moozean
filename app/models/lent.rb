class Lent < ApplicationRecord
  belongs_to :student
  belongs_to :folder
  has_many :emails, :as  =>:referencable
  before_save :del_the_twins
  def del_the_twins
    Lent.where(folder: self.folder).destroy_all()
  end
end
