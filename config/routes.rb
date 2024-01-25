Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'users/login', to: 'users#login'
      post 'users/create'

      get 'posts/index'
      post 'posts/create'
      get '/show/:id', to: 'posts#show'
      post '/update/:id', to: 'posts#update'
      delete '/destroy/:id', to: 'posts#destroy' 
      post '/comments/:id', to: 'comments#create'
      get '/comments2/:id', to: 'comments#show'
      delete '/destroycomment/:id/:id2', to: 'comments#destroy' 

      get '/showComment/:commId', to: 'comments#showComment'
      post '/updateComment/:commId', to: 'comments#updateComment'
    end
  end
  root 'homepage#index'

  get '/*path' => 'homepage#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
