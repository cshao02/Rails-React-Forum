class RemoveStringFromComment < ActiveRecord::Migration[7.1]
  def change
    remove_column :comments, :string, :string
  end
end
