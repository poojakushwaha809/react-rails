class Status < ApplicationRecord
    has_many :articles
    has_many :comments

end
