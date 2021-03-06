Rails.application.routes.draw do
  devise_for :users,controllers: {
    omniauth_callbacks: 'users/omniauth_callbacks'
  }
  devise_scope :user do
    get '/users/sign_out' => 'devise/sessions#destroy'
  end
  root to: 'tasks#index'
  resources :tasks, only: [:index,:create,:update]
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :timers, only: [:index]
  resources :posts, only: [:index,:create]
  resources :tweet, only: [:create]
end
