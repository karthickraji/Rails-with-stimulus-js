import { Controller } from "stimulus"

export default class extends Controller {
 
  initialize(){
    console.log("comments")
  }

  form_validation(){
    $("#comment-form").validate();
  }

  show_comment_form_modal(){
    $("#comment-new-form-modal").modal();
  }

}
