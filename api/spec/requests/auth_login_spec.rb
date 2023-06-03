require 'rails_helper'

describe 'POST /auth/login', type: :request do
  it 'returns success on valid login' do
    user = create(:user, email: Faker::Internet.email, password: 'password123')

    post '/auth/login', params: {
      format: 'json',
      user: { email: user.email, password: 'password123' }
    }

    expect(response).to have_http_status(:success)
    expect(response.headers['Content-Type']).to include('application/json')
    expect(response.headers['Authorization']).to include('Bearer')
  end

  it 'returns unauthorized on invalid login' do
    post '/auth/login',
      params: {
        format: 'json',
        user: { email: 'invalid@example.com', password: 'wrongpassword' }
      }

    expect(response).to have_http_status(:unauthorized)
    expect(response.headers['Content-Type']).to include('application/json')
  end
end
