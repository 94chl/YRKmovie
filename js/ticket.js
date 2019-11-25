$(document).ready(function(){
  var title = sessionStorage.getItem("selectedMovie");
  console.log(title);

  var reserveInfo = {
    title:title,
    theater:"",
    date:"",
    time:"",
    adult:0,
    student:0,
    pay:"",
    orderId:""
  };

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

  $('.process.movie .movieList').on('click', '.movies .selectBtn', function(e) {
    var clicked = e.target.innerText;
    $.getJSON('../json/movies.json', function(data){
      $.each(data, function() {
        if(this.title == clicked) {
          $('#reservationInfo .poster.reserveInfo img').attr('src', this.poster);
          $('#reservationInfo .title.reserveInfo .selected').text(this.title);
          $('#reservationInfo .point.reserveInfo .selected').text(this.point.netizen);
          reserveInfo.title = this.title;
          $('#timetable .times .chosenMovie').text("");
        }
      });
    });//getJSON
  })

  $('.regionList .regions').on('click', function() {
    var clicked = $(this).text();
    var cityList = [];
    $.getJSON('../json/theater.json', function(data){
      $.each(data, function() {
        if(clicked.indexOf(this.region) >= 0) {
          cityList.push(this.city)
        }
      });

      cityList = new Set(cityList)
      cityList = Array.from(cityList)

      for(i=0; i<cityList.length; i++) {
        var city = '<ul class="cityList clearfix"><div class="cityName">'+cityList[i]+'</div></ul>';
        $('.theaterList').append(city);
      };

      // $('.cityList .cityName')[i].innerText
      $.each(data, function() {
        for(i=0; i<$('.cityList .cityName').length; i++) {
          if($('.cityList .cityName')[i].innerText == this.city) {
            var node = document.createElement("LI");
            var listClass = document.createAttribute("class");
            var btn = document.createElement("BUTTON");
            var btnType = document.createAttribute("class");
            var btnName = document.createAttribute("class");
            var btnClass = document.createAttribute("class");
            var textnode = document.createTextNode(this.name);
            listClass.value = "theaters";
            node.setAttributeNode(listClass);
            btnType.value = "button";
            btnName.value = "theater";
            btnClass.value = "selectBtn theater "+this.theater;
            btn.setAttributeNode(btnType);
            btn.setAttributeNode(btnName);
            btn.setAttributeNode(btnClass);
            btn.appendChild(textnode);
            node.appendChild(btn);
            $('.cityList')[i].append(node)
          }
        }
      });
    });//getJSON
    $('.theaterList').show()
  });

  $('.process.theater .theaterList .closeBtn').on('click', function() {
    $('.theaterList .cityList').remove();
    $(this).parents('.theaterList').hide();
  })

  $(document).on('click', '.theaters .selectBtn.theater', function(e) {
    var clicked = e.target.innerText;
    $('.reserveInfo.theater .selected').text(clicked);
    reserveInfo.theater = clicked;
    $('.chosenTheater').text("");

    var theater = e.target.classList[2];
    if(theater == "Megabox") {
      $("#datepicker").datepicker("option", {
          minDate:0,
          maxDate:10
      });
    } else if (theater =="Lotte") {
      $("#datepicker").datepicker("option", {
          minDate:0,
          maxDate:5
      });
    } else {
      $("#datepicker").datepicker("option", {
          minDate:0,
          maxDate:7
      });
    };
  })

  $("#datepicker").datepicker({
      minDate:0
  });

  $('#datepicker').on('change', function(){
    var month = $("#datepicker").val().substring(0,2);
    var day = $("#datepicker").val().substring(3,5);
    var year = $("#datepicker").val().substring(6,10);
    var date = year+'-'+month+'-'+day
    $('.reserveInfo.date .selected').text(month +'월 ' + day +'일');
    $('.process.date .chosenDate').text(month +'월 ' + day +'일');
    reserveInfo.date = date;

    if('.screenWrap') {
      $('.screenWrap').remove();
    }

    var today = new Date();
    today = today.getFullYear() +'-'+ (today.getMonth()+1) +'-'+ today.getDate();

    var timetables = [
      {
        name:"1",
        time:["11:00", "14:30", "19:00", "24:30"]
      },
      {
        name:"2",
        time:["10:30", "15:00", "18:30", "22:00", "25:30"]
      },
      {
        name:"3",
        time:["09:30", "13:00", "17:00"]
      },
      {
        name:"4",
        time:["12:30", "15:30", "22:00", "25:00"]
      },
      {
        name:"5",
        time:["10:00", "16:30", "21:00", "24:00"]
      },
      {
        name:"6",
        time:["12:00", "18:00", "21:30"]
      }
    ];
    var screen = ['1', '2', '3', '4', '5', '6'];
    screen.splice(randomString(1, '123456')-1,randomString(1, '123'));

    for(i=0; i <screen.length; i++) {
      var addTimetable = '<div class="screenWrap"><div class="screen">'+screen[i]+'관</div><ul class="timetableWrap"></ul></div>'
      $('#timetable .times').append(addTimetable);
    }

    $('#timetable .times .screen').each(function() {
      for(i=0; i<timetables.length; i++) {
        if(timetables[i].name == $(this).text()[0] && reserveInfo.title != null && reserveInfo.theater != "") {
          for(u=0; u<timetables[i].time.length; u++) {
            var timeList = '<li class="time"><button type="button" name="selectBtn" class="selectBtn">'+ timetables[i].time[u] +'</button></li>';
            $(this).siblings('.timetableWrap').append(timeList);
          }
        }
      }
    })

    if(today == date) {
      var now = new Date().getHours()+':'+new Date().getMinutes();
      $('#timetable .times .time .selectBtn').each(function() {
        if($(this).text() < now) {
          $(this).parents('.time').remove();
        }
      })
    };

    $('#timetable .screenWrap').each(function() {
      if($(this).find('.time').length<1){
        $(this).remove();
      }
    })
  });

  $(document).on("click", '#timetable .times .time .selectBtn', function(e) {
    var clicked = e.target.innerText;
    $('.reserveInfo.time .selected').text(clicked);
    reserveInfo.time = clicked;
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
    reserveInfo.pay = pay;
    reserveInfo.adult = adults;
    reserveInfo.student = students;
  })

  $('.reservationBtn').on('click', function() {
    var orderId = randomString(7, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
    reserveInfo.orderId = orderId;
    if(reserveInfo.title == null) {
      alert('영화를 선택해주세요')
    } else if (reserveInfo.theater == "") {
      alert('극장을 선택해주세요')
    } else if (reserveInfo.date == "") {
      alert('날짜를 선택해주세요')
    } else if (reserveInfo.time == "") {
      alert('상영시간을 선택해주세요')
    } else if (reserveInfo.adult + reserveInfo.student == 0) {
      alert('인원 수를 확인해주세요')
    } else {
      sessionStorage.setItem("reservation", JSON.stringify(reserveInfo));
      location.href = "./completeReserve.html";
    };
  })

  function randomString(length, chars) {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
  }

  var reservation = JSON.parse(sessionStorage.getItem("reservation"));

  if(reservation != null) {
    console.log(reservation)
    $('#completeReserve .reserveInfo.title .selected').text(reservation.title);
    $('#completeReserve .reserveInfo.orderId .selected').text(reservation.orderId);
    $('#completeReserve .reserveInfo.theater .selected').text(reservation.theater);
    $('#completeReserve .reserveInfo.date .selected').text(reservation.date);
    $('#completeReserve .reserveInfo.time .selected').text(reservation.time);
    var total;
    if( reservation.adult > 0 &&  reservation.student == 0) {
      total = '성인 ' + reservation.adult + ' 명';
    } else if ( reservation.student > 0 && reservation.adult == 0) {
      total = '학생 ' + reservation.student + ' 명';
    } else if ( reservation.student > 0 && reservation.adult > 0) {
      total = '성인 ' + reservation.adult + ' 명 ' + ', 학생 ' + reservation.student + ' 명';
    }
    $('#completeReserve .reserveInfo.people .selected').text(total);
  }

  $('#orderCheck .checkBtn').on('click', function() {
    if ($('#orderIdCheck').val() == "") {
      alert("예약번호를 입력해주세요.")
    } else if($('#orderIdCheck').val() != "" && reservation && $('#orderIdCheck').val() == reservation.orderId) {
      location.href = "./completeReserve.html";
    } else if($('#orderIdCheck').val() != "" && reservation && $('#orderIdCheck').val() != reservation.orderId) {
      alert("예약 내역이 없습니다. 예약번호를 확인해주세요.")
    }
  })
});//document
