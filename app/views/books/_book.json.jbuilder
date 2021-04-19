json.extract! book, :id, :title, :total_pages, :isbn, :created_at, :updated_at
json.url book_url(book, format: :json)
