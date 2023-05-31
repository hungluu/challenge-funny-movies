Rails.application.routes.draw do
  devise_for :users,
    path: 'auth',
    path_names: {
      sign_in: 'login',
      sign_out: 'logout',
      registration: 'register'
    },
    controllers: {
      registrations: "auth/registrations",
      sessions: "auth/sessions"
    }

  # Defines the root path route ("/")
  # root "articles#index"

  get '/health', to: 'health#index'
end
