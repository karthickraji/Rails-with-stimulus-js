import { Controller } from "stimulus"

export default class extends Controller {
  static targets = ["links", "template"]
  static values = { chartLabels: Array, chartDatacounts: Array}

  connect(){
    console.log("hi books")
    // this.element.textContent = "Books!"

    // this help us to prevent from turbolinks page load issue
    // If we use window load event somewhere, sometime it doesn't call
    // because of turbolinks so we can use method directly here or
    // inside initialize() method
    if ($("#list-books").is(':visible')){
      this.draw_books_table();
    }

    if ($("#myChart").is(':visible')){
      this.draw_books_graph();
    }

    if ($(".select2").is(':visible')){
      this.initiate_select2();
    }

    if ($(".chosen-select").is(':visible')){
      this.initiate_chosen_select();
    }
  }

  initiate_select2(){
    $(".select2").select2();
  }

  initiate_chosen_select(){
    $(".chosen-select").chosen();
  }

  add_comment_association(event){
    event.preventDefault()

    var content = this.templateTarget.innerHTML.replace(/NEW_RECORD/g, new Date().getTime())
    this.linksTarget.insertAdjacentHTML('beforebegin', content)
  }

  remove_comment_association(event){
    event.preventDefault()

    let wrapper = event.target.closest(".nested-fields")
    if (wrapper.dataset.newRecord == "true"){
      wrapper.remove();
    }
    else {
      wrapper.querySelector("input[name*='_destroy']").value = 1
      wrapper.style.display = 'none'
    }
  }

  form_validation(){
    $("#book-form").validate();
  }

  draw_books_table(){
    $('#list-books').DataTable();
  }

  draw_books_graph(){
    // this.draw_books_table();
    fetch(`/books`, {
      headers: { accept: 'application/json'}
    }).then((response) => response.json())
      .then(data => {
        this.chartLabelsValue = data.dates
        this.chartDatacountsValue = data.counts
        this.fill_data_in_chartjs()
      });
  }

  fill_data_in_chartjs(){
    var labels = this.chartLabelsValue
    var data_counts = this.chartDatacountsValue
    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data_counts,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
