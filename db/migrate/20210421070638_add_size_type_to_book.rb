class AddSizeTypeToBook < ActiveRecord::Migration[6.1]
  def change
    add_column :books, :size_type, :integer
  end
end
