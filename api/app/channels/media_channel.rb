class MediaChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    stream_from :media_channel
  end

  def received
    puts data["message"]
  end

  def unsubscribed
    stop_all_streams
  end
end
