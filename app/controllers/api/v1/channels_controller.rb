class Api::V1::ChannelsController < ApplicationController
  def index
    channels = Channel.all
    render json: channels
  end

  def create
    channel = Channel.new(name: params[:name])
    channel.save
    render json: channel
  end
end
