function trimList() {
  //첫줄의 첫번째 목록은 margin-left를 없앤다
  for(i=0; i <= $('.container .list .movie').length; i++) {
    if(i % 4 == 1) {
      $('.container .list .movie:nth-child('+i+')').css('margin-left','0');
    };
  };
};

var pointnow = [];
var pointall = [];

$(document).ready(function (){
  sessionStorage.removeItem("selectedMovie");

   $.getJSON('../json/movies.json', function(data){
     $.each(data, function() {
       for(i = 1; i <= data.length; i++) {
         if(this.ranking == i && this.type == "current") {
           var leadingActors = "";
           for(u=0; u<this.actor.leading.length;u++) {
             leadingActors = leadingActors + this.actor.leading[u].name+ " ";
           }
           var movieList = '<tr class="record"><td class="ranking">'+i+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + this.genre + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
           $('.rankingTable').append(movieList);
           pointnow.push(this.point.netizen)
         }
       }
       pointall.push(this.point.netizen)
     });
    pointnow.sort(function(a, b){return b - a});
    trimList();
    pointall.sort(function(a, b){return b - a});
    trimList();
   });//getJSON


$(".orderList .orderBy").on("click", $(".orderBy"), function(e) {
  var orderBy = e.target.classList[1];
  $(".orderList .orderBy").removeClass('clicked');
  $(this).addClass('clicked');
  $('.record').remove();

  if(orderBy == "pointNow") {
    $.getJSON('../json/movies.json', function(data){
      for(i = 1; i <= pointnow.length; i++) {
        $.each(data, function() {
          if(pointnow[i-1] == this.point.netizen && this.type == "current") {
            var leadingActors = "";
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+i+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + this.genre + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
            $('.rankingTable').append(movieList);
          }
        })
      };
     trimList();
    });//getJSON
  } else if(orderBy == "pointAll") {
    $.getJSON('../json/movies.json', function(data){
      for(i = 1; i <= pointall.length; i++) {
        $.each(data, function() {
          if(pointall[i-1] == this.point.netizen) {
            var leadingActors = "";
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+ i +'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + this.genre + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
            $('.rankingTable').append(movieList);
          }
        })
      };
     trimList();
    });//getJSON
  } else {
    $.getJSON('../json/movies.json', function(data){
      $.each(data, function() {
        for(i = 1; i <= data.length; i++) {
          if(this.ranking == i && this.type == "current") {
            var leadingActors = "";
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+i+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + this.genre + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
            $('.rankingTable').append(movieList);
          }
        }
      });
     trimList();
    });//getJSON
  }
});

$(document).on("click", "a.poster", function(e){
  var movieName = $(this).siblings('.outlineMenu.title').find('.title').text();
  sessionStorage.setItem("selectedMovie", movieName);
});

$(document).on("click", "a.reserveBtn", function(e){
  var movieName = $(this).siblings('.outlineMenu.title').find('.title').text();
  sessionStorage.setItem("selectedMovie", movieName);
});

});//document

//
