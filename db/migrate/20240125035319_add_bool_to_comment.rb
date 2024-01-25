class AddBoolToComment < ActiveRecord::Migration[7.1]
  def change
    add_column :comments, :bool, :boolean
  end
end
