require 'rails_helper'

describe 'POST /auth/register', type: :request do
  it 'creates a new user on successful registration' do
    post '/auth/register', params: {
      format: 'json',
      user: { email: Faker::Internet.email, password: 'password123' }
    }

    # Assert the response
    expect(response).to have_http_status(:success)
    expect(response.headers['Content-Type']).to include('application/json')
    expect(response.body).to include('success')
  end

  it 'returns error on invalid registration' do
    post '/auth/register', params: {
      format: 'json',
      user: { email: 'invalid@example.com', password: 'short' }
    }

    # Assert the response
    expect(response).to have_http_status(:unprocessable_entity)
    expect(response.headers['Content-Type']).to include('application/json')
    expect(response.body).to include('Password is too short')
  end
end
