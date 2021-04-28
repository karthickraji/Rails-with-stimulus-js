class Books::BulkController < ApplicationController
  before_action :set_books

  def update
    @books.update_all(total_pages: params[:total_pages])
    if (params[:redirect_path] == "list_of_books")
      redirect_to list_of_books_books_path
    else
      redirect_to root_path
    end
  end

  def destroy
    @books.destroy_all
    if (params[:redirect_path] == "list_of_books")
      redirect_to list_of_books_books_path
    else
      redirect_to root_path
    end
  end

  private

  def set_books
    @books = params[:all] ? Book.all : Book.where(id: params[:book_ids])
  end
end
