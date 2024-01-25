class AddBoolToPost < ActiveRecord::Migration[7.1]
  def change
    add_column :posts, :bool, :boolean
  end
end
