require "test_helper"

class HealthControllerTest < ActionDispatch::IntegrationTest
  test "should return status ok for healthchecks" do
    get health_url
    assert_response :success
    assert_equal({ "status" => "ok" }, JSON.parse(response.body))
  end
end
