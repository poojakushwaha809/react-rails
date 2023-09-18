class CreateArticlePublishers < ActiveRecord::Migration[7.0]
  def change
    create_table :article_publishers do |t|
      t.integer :article_id
      t.integer :publisher_id

      t.timestamps
    end
  end
end
