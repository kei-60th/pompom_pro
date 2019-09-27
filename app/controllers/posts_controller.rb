class PostsController < ApplicationController
  def new
  end

  def create
    @post = Post.new(post_params)
    @post.save
  end




  private

  def post_params
    params.permit(:body, :time)
  end


end