class Channel < ApplicationRecord
  has_many :messages
  validates :name, presence: true
  after_create :broadcast_message
  def as_json(options = {})
    {
      id: id,
      name: name,
      created_at: created_at
    }
  end

  private

  def broadcast_message
    ActionCable.server.broadcast("channel_all_channel", as_json)
  end
end
