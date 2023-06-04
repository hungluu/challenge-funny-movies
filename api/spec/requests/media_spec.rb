require 'rails_helper'

RSpec.describe "/media", type: :request do
  let(:user) { build(:user) }

  let(:valid_attributes) {
    { :url => "https://www.youtube.com/watch?v=B76qMOEok0c" }
  }

  let(:invalid_attributes) {
    { :url => "https://www.youtufake.com/invalid" }
  }

  let(:valid_headers) {
    {}
  }

  describe "GET /index" do
    it "renders a successful response" do
      media_list = build_list(:medium, 5, user: user)
      model = mock_orm(Medium, media_list)

      get media_url, headers: valid_headers, as: :json

      expect(response).to have_http_status(:ok)
      response_body = JSON.parse(response.body)
      expect(response_body['data']).to be_an(Array)
      expect(response_body['data'].size).to eq(5)

      model.clean
    end
  end

  describe "POST /create" do
    before :each do
      @model = mock_orm(Medium)

      valid_video_double = double('VideoDouble')
      allow(valid_video_double).to receive(:available?).and_return(true)
      allow(valid_video_double).to receive(:title).and_return(Faker::Movie.title)
      allow(valid_video_double).to receive(:description).and_return(Faker::Quote.yoda)
      allow(valid_video_double).to receive(:thumbnail_medium).and_return(Faker::Internet.url)
      allow(VideoInfo).to receive(:get).and_return(valid_video_double)

      sign_in(user)
    end

    context "with valid parameters" do
      it "renders a JSON response with the new medium" do
        post media_url, params: { medium: valid_attributes }, headers: valid_headers, as: :json

        expect(response).to have_http_status(:created)
        expect(response.content_type).to match(a_string_including("application/json"))
      end

      it "creates a new Medium" do
        expect(Medium.count).to eq(0)

        post media_url, params: { medium: valid_attributes }, headers: valid_headers, as: :json

        expect(Medium.count).to eq(1)
      end
    end

    context "with invalid parameters" do
      it "renders a JSON response with errors for the new medium" do
        post media_url, params: { medium: invalid_attributes }, headers: valid_headers, as: :json

        expect(response).to have_http_status(:unprocessable_entity)
        expect(response.content_type).to match(a_string_including("application/json"))
      end

      it "does not create a new Medium" do
        expect {
          post media_url, params: { medium: invalid_attributes }, as: :json
        }.to change(Medium, :count).by(0)
      end
    end

    after :each do
      allow(VideoInfo).to receive(:get).and_call_original

      @model.clean
    end
  end

  describe "GET /preview" do
    fakedTitle = Faker::Movie.title

    before :each do
      valid_video_double = double('VideoDouble')
      allow(valid_video_double).to receive(:available?).and_return(true)
      allow(valid_video_double).to receive(:title).and_return(fakedTitle)
      allow(valid_video_double).to receive(:description).and_return(Faker::Quote.yoda)
      allow(valid_video_double).to receive(:thumbnail_medium).and_return(Faker::Internet.url)
      allow(VideoInfo).to receive(:get).and_return(valid_video_double)

      sign_in(user)
    end

    it "renders a JSON response with the video preview info" do
      get preview_media_url, params: valid_attributes

      expect(response).to have_http_status(:ok)
      expect(response.content_type).to match(a_string_including("application/json"))

      response_body = JSON.parse(response.body)
      expect(response_body['data']).to be_an(Object)
      expect(response_body['data']['name']).to eq(fakedTitle)
    end

    it "renders json error for invalid url" do
      get preview_media_url, params: invalid_attributes

      expect(response).to have_http_status(:unprocessable_entity)
    end

    after :each do
      allow(VideoInfo).to receive(:get).and_call_original
    end
  end
end
