class BooksController < ApplicationController
  before_action :set_book, only: %i[ show edit update destroy ]

  def list_of_books
    @books = Book.paginate(page: params[:page], per_page: 10)
  end

  # GET /books or /books.json
  def index
    @books = Book.all
    @date_wise_count = Book.order(:created_at).group("DATE(created_at)").count
    respond_to do |format|
      format.html 
      format.json {
        render :json => {dates: @date_wise_count.keys, counts: @date_wise_count.values}
      }
    end
  end

  # GET /books/1 or /books/1.json
  def show
    @comment = Comment.new
  end

  # GET /books/new
  def new
    @book = Book.new
    @book.comments.new
  end

  # GET /books/1/edit
  def edit
  end

  # POST /books or /books.json
  def create
    @book = Book.new(book_params)

    respond_to do |format|
      if @book.save
        format.html { redirect_to @book, notice: "Book was successfully created." }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /books/1 or /books/1.json
  def update
    respond_to do |format|
      if @book.update(book_params)
        format.html { redirect_to @book, notice: "Book was successfully updated." }
        format.json { render :show, status: :ok, location: @book }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @book.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /books/1 or /books/1.json
  def destroy
    @book.destroy
    respond_to do |format|
      format.html { redirect_to books_url, notice: "Book was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_book
    @book = Book.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def book_params
    params.require(:book).permit(:title, :total_pages, :size_type, :isbn, comments_attributes: [:id, :body, :_destroy])
  end
end
