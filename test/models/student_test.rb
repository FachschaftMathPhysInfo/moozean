require 'test_helper'

class StudentTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should have name, uniid,report and refund" do
    folder = Student.new
    assert_not(folder.save,"should have name &uniid")
    folder.name ="Max Mustermann"
    assert_not(folder.save,"should have uniid and refund ")
    folder.uniid = "ab123"
    folder.report=true
    folder.refund=true
    assert(folder.save,"should save")
  end
end
