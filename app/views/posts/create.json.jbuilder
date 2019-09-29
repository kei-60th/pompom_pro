json.body @post.body
json.time @post.time
json.year @post.created_at.strftime("%Y")
json.month @post.created_at.strftime("%-m")
json.day @post.created_at.strftime("%-d")
json.endTasks do
  json.array!(@post.endtasks) do |etask|
    json.name etask.name
  end
end