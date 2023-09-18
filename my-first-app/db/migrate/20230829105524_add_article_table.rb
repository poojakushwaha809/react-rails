class AddArticleTable < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :article_no, :integer
    add_column :articles, :is_active, :boolean
  end
end
