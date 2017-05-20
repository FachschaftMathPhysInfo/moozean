require 'test_helper'

class FolderTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
  test "should have name" do
    folder = Folder.new
    assert_not(folder.save,"should have name")
  end
end
