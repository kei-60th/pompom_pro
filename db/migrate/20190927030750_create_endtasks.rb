class CreateEndtasks < ActiveRecord::Migration[5.2]
  def change
    create_table :endtasks do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
