class TweetController < ApplicationController
  def create
    @taskname = []
    if current_user
      @tasks = Task.where(is_done: true,user_id:current_user.id).order('updated_at DESC')
    else
      @tasks = Task.where(is_done: true,user_id:1).order('updated_at DESC')
    end
    @tasks.each do |task|
      @taskname.push(task.name)
    end
    tweet
  end


  private

  def tweet
    @tweet = Twitter::REST::Client.new do |config|
      config.consumer_key        = Rails.application.credentials.twitter[:TWITTER_KEY]
      config.consumer_secret     = Rails.application.credentials.twitter[:TWITTER_SECRET]
      config.access_token        = Rails.application.credentials.twitter[:ACCESS_TOKEN]
      config.access_token_secret = Rails.application.credentials.twitter[:ACCESS_TOKEN_SECRET]
    end
    @tweet.update("今日の積み上げ\n完了したタスク:#{@taskname.join(',')}\n学習時間:#{tweet_params[:time]}\n#{tweet_params[:body]}\n#TwitterAPIから投稿 #pompom_pro")
  end


  def tweet_params
    params.permit(:body, :time)
  end








end
