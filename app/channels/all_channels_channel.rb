class AllChannelsChannel < ApplicationCable::Channel
  def subscribed
    stream_from "channel_all_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
