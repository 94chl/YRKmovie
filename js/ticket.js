$(document).ready(function(){
  var title = sessionStorage.getItem("selectedMovie");
  console.log(title);

  if(title != null) {
    $.getJSON('../json/movies.json', function(data){
      $.each(data, function() {
        if(this.title == title) {
          $('#reservationInfo .poster.reserveInfo img').attr('src', this.poster);
          $('#reservationInfo .title.reserveInfo .selected').text(this.title);
          $('#reservationInfo .point.reserveInfo .selected').text(this.point.netizen);
        }
      });
    });//getJSON
  } else {
    console.log('default');
  }

  $( "#datepicker" ).datepicker();
});//document
