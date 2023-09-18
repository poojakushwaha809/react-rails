class AddColumnArtCom < ActiveRecord::Migration[7.0]
  def change
    add_column :articles, :status_id, :integer
    add_column :comments, :status_id, :integer

  end
end
