class Comment < ApplicationRecord
  belongs_to :article
  belongs_to :status

  validates :comment, presence: true
  validates :comment, length: { minimum: 4 }
end
