class Post < ApplicationRecord
  has_many :comments, dependent: :destroy

  validates :title, presence: true
  validates :category, presence: true
  validates :body, presence: true
end
