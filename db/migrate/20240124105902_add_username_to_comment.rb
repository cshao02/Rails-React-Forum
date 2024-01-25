class AddUsernameToComment < ActiveRecord::Migration[7.1]
  def change
    add_column :comments, :username, :string
    add_column :comments, :string, :string
  end
end
