class CommentsController < ApplicationController

  def create
    @book = Book.find_by(id: comment_params[:book_id])
    @comment = Comment.new(comment_params)
    respond_to do |format|
      if @comment.save
        format.html { redirect_to @book, notice: "Comment was successfully created." }
        format.json { render :show, status: :created, location: @book }
      else
        format.html { redirect_to @book, status: :unprocessable_entity }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body, :book_id)
  end
end
