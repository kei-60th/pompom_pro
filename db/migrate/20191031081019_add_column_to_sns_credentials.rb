class AddColumnToSnsCredentials < ActiveRecord::Migration[5.2]
  def change
    add_column :sns_credentials, :utoken, :string, null: false
    add_column :sns_credentials, :usecret, :string, null:false
  end
end
