class Api::V1::MessagesController < ApplicationController
  before_action :set_channel

  def index
    channels = Channel.all
    render json: channels
  end

  def create
    message = @channel.messages.build(name: params[:name])
    message.user = current_user
    message.save
    render json: message
  end
end
