import CheckboxSelectAll from "stimulus-checkbox-select-all"
import Rails from "@rails/ujs"

export default class extends CheckboxSelectAll {
  static targets = ["recordsSelected", "totalPages", "redirectPath"]

  connect() {
    super.connect()

    // Get all checked checkboxes
    this.checked
    // this.getCheckedCount()

    // Get all unchecked checkboxes
    this.unchecked
  }

  // getCheckedCount(){
  // this.recordsSelectedTarget.innerHTML = `${this.checked.length} selected`;
  // }

  // select_all(event){
  // super.toggle(event);
  // this.getCheckedCount()
  // }

  // select_individual(event){
  // this.getCheckedCount()
  // }


  destroy(event){
    event.preventDefault();

    let data = new FormData()
    if (this.checked.length == this.checkboxTargets.length){
      data.append("all", true)
    }
    else {
      this.checked.forEach((checkbox) => data.append("book_ids[]", checkbox.value))
    }
    data.append("redirect_path", this.redirectPathTarget.value)

    Rails.ajax({
      url: "/books/bulk",
      type: "DELETE",
      data: data
    })

    console.log(this.checked)
  }

  show_update_books_form_modal(event){
    $("#update-books-form-modal").modal();
  }

  update(event){
    event.preventDefault();

    let data = new FormData()

    if (this.checked.length == this.checkboxTargets.length){
      data.append("all", true)
    }
    else {
      this.checked.forEach((checkbox) => data.append("book_ids[]", checkbox.value))
    }
    data.append("total_pages", this.totalPagesTarget.value)
    data.append("redirect_path", this.redirectPathTarget.value)

    Rails.ajax({
      url: "/books/bulk",
      type: "PUT",
      data: data
    })

    console.log(this.checked)
  }
}
