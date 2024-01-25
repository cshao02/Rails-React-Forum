class AddPosternameToPost < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :postername, :string
  end
end
