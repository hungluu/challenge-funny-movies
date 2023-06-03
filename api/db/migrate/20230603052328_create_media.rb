class CreateMedia < ActiveRecord::Migration[7.0]
  def change
    create_table :media do |t|
      t.string :name
      t.text :description
      t.string :thumbnail
      t.string :url
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
