class CreateBooks < ActiveRecord::Migration[6.1]
  def change
    create_table :books do |t|
      t.string :title
      t.integer :total_pages
      t.integer :isbn

      t.timestamps
    end
  end
end
