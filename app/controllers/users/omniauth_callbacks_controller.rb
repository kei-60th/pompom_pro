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
    if current_user #ユーザーがログインしている
      unless SnsCredential.find_by(user_id: current_user.id) #まだsns認証をしていない
        @sns.user_id = current_user.id
        @sns.save
      end
    else #ユーザーがログインしていない
      if SnsCredential.find_by(uid: @sns.uid) #sns認証をしたことがある
        @user_id = SnsCredential.find_by(uid: @sns.uid).user_id
        @user = User.find_by(id: @user_id)
      else #sns認証をしたことがない
        @user = User.create(
          email: "#{@sns.uid}-#{@sns.provider}@example.com",
          password:Devise.friendly_token.first(8)
        )
        @sns.user_id = @user.id
        @sns.save
      end
      sign_in @user
    end

    redirect_to root_path
  end


  def failure
    redirect_to root_path and return
  end



end
