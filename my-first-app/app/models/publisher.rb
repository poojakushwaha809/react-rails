class Publisher < ApplicationRecord
    has_many :article_publishers
    has_many :articles, through: :article_publishers
end
