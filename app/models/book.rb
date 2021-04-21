class Book < ApplicationRecord
  enum size_type: [:tiny, :small, :middle, :large, :largest]
  has_many :comments

  accepts_nested_attributes_for :comments, allow_destroy: true
end
