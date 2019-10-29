# frozen_string_literal: true

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  # You should configure your model like this:
  # devise :omniauthable, omniauth_providers: [:twitter]

  # You should also create an action method in this controller like this:
  # def twitter
  # end

  # More info at:
  # https://github.com/plataformatec/devise#omniauth

  # GET|POST /resource/auth/twitter
  # def passthru
  #   super
  # end

  # GET|POST /users/auth/twitter/callback
  # def failure
  #   super
  # end

  # protected

  # The path used when OmniAuth fails
  # def after_omniauth_failure_path_for(scope)
  #   super(scope)
  # end

  def twitter
    callback_from :twitter
  end

  def callback_from(provider)
    @sns = User.find_for_oauth(request.env['omniauth.auth'])
    unless SnsCredential.find_by(user_id: current_user.id)
      @sns.user_id = current_user.id
      @sns.save
    end
    redirect_to root_path
  end


  def failure
    redirect_to root_path and return
  end


end
