class AddNicknameToMessage < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :nickname, :string
  end
end
