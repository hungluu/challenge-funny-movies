Rails.application.routes.draw do
  # authentication
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


  resources :media, only: [:index, :create] do
    get :preview, on: :collection
  end

  get '/health', to: 'health#index'
end
