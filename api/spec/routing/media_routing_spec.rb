require "rails_helper"

RSpec.describe MediaController, type: :routing do
  describe "routing" do
    it "routes to #index" do
      expect(get: "/media").to route_to("media#index")
    end

    it "routes to #create" do
      expect(post: "/media").to route_to("media#create")
    end

    it "routes to #preview" do
      expect(get: "/media/preview").to route_to("media#preview")
    end
  end
end
