class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :sns_credentials, dependent: :destroy


    # <-----------SNSログイン関係----------->
    def self.find_oauth(auth)
      uid = auth.uid
      provider = auth.provider
      snscredential = SnsCredential.where(uid: uid, provider: provider).first
  
      if snscredential.present? #sns登録のみ完了してるユーザー
        user = User.where(id: snscredential.user_id).first
        unless user.present? #ユーザーが存在しないなら
          user = User.new(
            # snsの情報
            # binding.pry => auth.infoとかで確認 
            nickname: auth.info.name,
            email: auth.info.email
          )
        end
        sns = snscredential
  
      else #sns登録 未
        user = User.where(email: auth.info.email).first
        if user.present? #会員登録 済
          sns = SnsCredential.new(
            uid: uid,
            provider: provider,
            user_id: user.id
          )
        else #会員登録 未
          user = User.new(
            nickname: auth.info.name,
            email: auth.info.email
          )
          sns = SnsCredential.create(
            uid: uid,
            provider: provider
          )
        end
      end
      # hashでsnsのidを返り値として保持しておく
      return { user: user , sns_id: sns.id }
    end
end
