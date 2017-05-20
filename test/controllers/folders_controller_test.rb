require 'test_helper'

class FoldersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @folder = folders(:one)
  end

  test "should get index" do
    get folders_url, as: :json_api
    assert_response :success
  end

  test "should create folder" do
    assert_difference('Folder.count') do
      p={ data:{ type:'folders',attributes: { barcode: @folder.barcode, content: @folder.content, name: '@folder.name', 'obligation-to-report'=> @folder.obligation_to_report } }}.to_json
      result =post folders_url, headers:{'Content-Type'                 =>"application/vnd.api+json"}, params: p, as: :json_api
    end
    assert_response 201
  end

  test "should show folder" do
    get folder_url(@folder), as: :json_api
    assert_response :success
  end

  test "should update folder" do
    patch folder_url(@folder), params: { data:{ type:'folders',attributes: { barcode: @folder.barcode, content: @folder.content, name: @folder.name, obligation_to_report: @folder.obligation_to_report } }}, as: :json_api
  end

  test "should destroy folder" do
    assert_difference('Folder.count', -1) do
      delete folder_url(@folder), as: :json_api
    end

    assert_response 204
  end
end
