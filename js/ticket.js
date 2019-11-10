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

  $('#tabs .tab').on('click', function() {
    $('#tabs .tab').removeClass('clicked');
    $(this).addClass('clicked');
    var clicked = $(this)[0].classList[1];
    $('#processes .process').hide();
    $('#processes .process.'+clicked).show();
  });

  var release = [];

  $.getJSON('../json/movies.json', function(data){
    $.each(data, function() {
      for(i = 1; i <= data.length; i++) {
        if(this.ranking == i && this.type == "current") {
          var movieList = '<li class="movies"><button type="button" name="selectBtn" class="selectBtn movie">'+this.title+'</button></li>'
          $('.process.movie .movieList').append(movieList);
        }
      }
      release.push(this.release)
    });
   release.sort(function(a, b){return new Date(b) - new Date(a)});
  });//getJSON

  $(".order .orderBtn").on("click", $("button"), function(e) {
    var orderBy = e.target.innerText;
    $('.process.movie .movieList .movies').remove();
    $('.order .orderBtn').css('font-weight', 'normal');
    $(this).css('font-weight', 'bold');

    if(orderBy == "개봉순") {
      $.getJSON('../json/movies.json', function(data){
        for(i = 0; i < release.length; i++) {
          $.each(data, function() {
            if(release[i] == this.release && this.type == "current") {
              var movieList = '<li class="movies"><button type="button" name="selectBtn" class="selectBtn movie">'+this.title+'</button></li>'
              $('.process.movie .movieList').append(movieList);
            }
          })
        };
      });//getJSON
    } else {
      $.getJSON('../json/movies.json', function(data){
        $.each(data, function() {
          for(i = 1; i <= data.length; i++) {
            if(this.ranking == i && this.type == "current") {
              var movieList = '<li class="movies"><button type="button" name="selectBtn" class="selectBtn movie">'+this.title+'</button></li>'
              $('.process.movie .movieList').append(movieList);
            }
          }
        });
      });//getJSON
    };
  });

  $('.process.movie .movieList').on('click', $('.movies .selectBtn'), function(e) {
    var clicked = e.target.innerText;
    $.getJSON('../json/movies.json', function(data){
      $.each(data, function() {
        if(this.title == clicked) {
          $('#reservationInfo .poster.reserveInfo img').attr('src', this.poster);
          $('#reservationInfo .title.reserveInfo .selected').text(this.title);
          $('#reservationInfo .point.reserveInfo .selected').text(this.point.netizen);
        }
      });
    });//getJSON
  })

  $('.regionList .regions').on('click', function() {
    var clicked = $(this)[0].classList[1];
    $('.process.theater .theaterList.'+clicked).show();
  });

  $('.process.theater .theaterList .closeBtn').on('click', function() {
    $(this).parents('.theaterList').hide();
  })

  $('.process.theater .theaterList ul').on('click', $('.theaters .selectBtn.theater'), function(e) {
    var clicked = e.target.innerText;
    $('.reserveInfo.theater .selected').text(clicked);
  })

  $("#datepicker").datepicker();

  $('#datepicker').on('change', function(){
    var month = $("#datepicker").val().substring(0,2);
    var day = $("#datepicker").val().substring(3,5);
    $('.reserveInfo.date .selected').text(month +'월 ' + day +'일');
    $('.process.date .chosenDate').text(month +'월 ' + day +'일');
  })

  $('.inputs').on('change', function() {
    var adults = $('#adults').val();
    var students = $('#students').val();
    var total, pay;
    if( adults > 0 &&  students == 0) {
      total = '성인 ' + adults + ' 명';
      pay = adults*10000;
    } else if ( students > 0 && adults == 0) {
      total = '학생 ' + students + ' 명';
      pay = students*8000;
    } else if ( students > 0 && adults > 0) {
      total = '성인 ' + adults + ' 명 ' + ', 학생 ' + students + ' 명';
      pay = adults*10000 + students*8000
    } else {
      total = '';
      pay = '';
    }
    $('.reserveInfo.people .selected').text(total);
    $('.reserveInfo.pay .selected').text(pay+' 원');
  })

});//document
