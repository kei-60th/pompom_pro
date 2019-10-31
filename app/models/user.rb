class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable
  has_many :sns_credentials, dependent: :destroy


  def self.find_for_oauth(auth)
    uid = auth.uid
    provider = auth.provider
    utoken = auth['credentials']['token']
    usecret = auth['credentials']['secret']

    sns = SnsCredential.new(
      uid: uid,
      provider: provider,
      utoken: utoken,
      usecret: usecret
    )
  end
end