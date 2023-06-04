class Medium < ApplicationRecord
  belongs_to :user

  validates :name, presence: true, length: { minimum: 2 }
  validates :url, presence: true, length: { minimum: 8 }
  validate :url_recently_shared

  def url_recently_shared
    minutesWindow = 10
    timeframe = minutesWindow.minutes.ago..Time.current
    existing_medium = Medium.where(url: url, created_at: timeframe).exists?

    errors.add(:url, 'this was already shared only ' + minutesWindow.to_s + ' minutes ago') if existing_medium
  end

  def as_json(options = {})
    super(only: [:id, :url, :name, :description, :thumbnail], include: { user: { only: [:email] } })
  end
end
