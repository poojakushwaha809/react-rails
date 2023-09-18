class ArticlePublisher < ApplicationRecord
    belongs_to :article
    belongs_to :publisher
end
