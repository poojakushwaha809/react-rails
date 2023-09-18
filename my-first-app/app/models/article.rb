class Article < ApplicationRecord
    has_many :comments
    belongs_to :status
    has_many :article_publishers
    has_many :publishers, through: :article_publishers
    
    validates :title, presence: true
    validates :title, length: { minimum: 2 }
    validates :article_no,uniqueness:  {message: " should be unique" }


end
