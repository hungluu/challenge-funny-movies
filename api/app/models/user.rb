class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  # devise :database_authenticatable, :registerable,
  #        :recoverable, :rememberable, :validatable
  has_many :media

  devise :database_authenticatable, :jwt_authenticatable, :registerable,
    :validatable, jwt_revocation_strategy: JwtDenylist
  def jwt_payload
    { 'email' => self[:email] }
  end

  validates :password, presence: true, length: { minimum: 8 }
  validates :email, presence: true, uniqueness: true
end
