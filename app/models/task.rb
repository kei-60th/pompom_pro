class Task < ApplicationRecord
  validates :name,
  presence: {
    message: "全角文字で名前を入力してください"
  },
  format: {
    with: /\A[^!"#$%&'()\*\+\-\.,\/:;<=>?@\[\\\]^_`{|}~]+\z/,
    message: "記号を含めることはできません。"
  }
end