class Student < ApplicationRecord
  validates :uniid, format: { with: /[a-z][a-z][0-9][0-9][0-9]/,
    message: "uniid malformatted. Example: jb007" }
  validates :refund, inclusion: { in: [ true, false ] }
  validates :report, inclusion: { in: [ true, false ] }
end
