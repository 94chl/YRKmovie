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

var now = "all";

function genreCheck() {
  $('.record').hide();
  $('.record').each(function() {
    if(now=="all"){
      $('.record').show()
    } else if (now != "all" && $(this).find('.genre').text().indexOf(now)>=0) {
      $(this).show()
    }
  })
}

$(document).ready(function (){
  sessionStorage.removeItem("selectedMovie");

   $.getJSON('../json/movies.json', function(data){
     $.each(data, function() {
       for(i = 1; i <= data.length; i++) {
         if(this.ranking == i && this.type == "current") {
           var genres = "";
           var leadingActors = "";
           for(o=0; o<this.genre.length;o++) {
             genres = genres + this.genre[o]+ " ";
           }
           for(u=0; u<this.actor.leading.length;u++) {
             leadingActors = leadingActors + this.actor.leading[u].name+ " ";
           }
           var movieList = '<tr class="record"><td class="ranking">'+i+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + genres + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';

           $('.rankingTable').append(movieList);
           pointnow.push({
             title: this.title,
             point: this.point.netizen,
             genre: this.genre
           });
         }
       }
       pointall.push({
         title: this.title,
         point: this.point.netizen,
         genre: this.genre
       });
     });
    pointnow.sort(function(a, b){return b.point - a.point});
    pointall.sort(function(a, b){return b.point - a.point});
    trimList();
   });//getJSON

   $('.contentsWrap #genres').on('change', function() {
     now = $('#genres .genre[value=' + $('#genres').val() + ']').text();
     console.log(now)
     if(now == "전체") {
       now = "all"
     }
     genreCheck();
   });

$(".orderList .orderBy").on("click", $(".orderBy"), function(e) {
  var orderBy = e.target.classList[1];
  $(".orderList .orderBy").removeClass('clicked');
  $(this).addClass('clicked');
  $('.record').remove();

  if(orderBy == "pointNow" && now == "all") {
    $.getJSON('../json/movies.json', function(data){
      for(i = 0, r = 1; i < pointnow.length; i++) {
        $.each(data, function() {
          if(pointnow[i].point == this.point.netizen && this.type == "current" && pointnow[i].title == this.title) {
            var genres = "";
            var leadingActors = "";
            for(o=0; o<this.genre.length;o++) {
              genres = genres + this.genre[o]+ " ";
            }
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+r+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + genres + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
            $('.rankingTable').append(movieList);
            r++;
          }
        })
      };
     trimList();
    });//getJSON
  } if(orderBy == "pointNow" && now != "all") {
    console.log(now)
    $.getJSON('../json/movies.json', function(data){
      for(i = 0, r = 1; i < pointnow.length; i++) {
        $.each(data, function() {
          if(pointnow[i].point == this.point.netizen && this.type == "current" && pointnow[i].title == this.title) {
            var genres = "";
            var leadingActors = "";
            for(o=0; o<this.genre.length;o++) {
              genres = genres + this.genre[o]+ " ";
            }
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+r+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + genres + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
            $('.rankingTable').append(movieList);
            r++;
          }
        })
      };
     trimList();
     genreCheck();
    });//getJSON
  } else if(orderBy == "pointAll" && now == "all") {
    $.getJSON('../json/movies.json', function(data){
      for(i = 0, r=1; i < pointall.length; i++) {
        $.each(data, function() {
          if(pointall[i].point == this.point.netizen && pointall[i].title == this.title) {
            var genres = "";
            var leadingActors = "";
            for(o=0; o<this.genre.length;o++) {
              genres = genres + this.genre[o]+ " ";
            }
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+r+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + genres + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
            $('.rankingTable').append(movieList);
            r++;
          }
        })
      };
     trimList();
    });//getJSON
  } else if(orderBy == "pointAll" && now != "all") {
    $.getJSON('../json/movies.json', function(data){
      for(i = 0, r=1; i < pointall.length; i++) {
        $.each(data, function() {
          if(pointall[i].point == this.point.netizen && pointall[i].title == this.title) {
            var genres = "";
            var leadingActors = "";
            for(o=0; o<this.genre.length;o++) {
              genres = genres + this.genre[o]+ " ";
            }
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+r+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + genres + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
            $('.rankingTable').append(movieList);
            r++;
          }
        })
      };
     trimList();
     genreCheck();
    });//getJSON
  } else if (orderBy == "rankNow" && now != "all"){
    $.getJSON('../json/movies.json', function(data){
      $.each(data, function() {
        for(i = 1; i <= data.length; i++) {
          if(this.ranking == i && this.type == "current"  && this.genre.indexOf(now)>=0) {
            var genres = "";
            var leadingActors = "";
            for(o=0; o<this.genre.length;o++) {
              genres = genres + this.genre[o]+ " ";
            }
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+i+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + genres + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
            $('.rankingTable').append(movieList);
          }
        }
      });
     trimList();
    });//getJSON
  } else {
    $.getJSON('../json/movies.json', function(data){
      $.each(data, function() {
        for(i = 1; i <= data.length; i++) {
          if(this.ranking == i && this.type == "current") {
            var genres = "";
            var leadingActors = "";
            for(o=0; o<this.genre.length;o++) {
              genres = genres + this.genre[o]+ " ";
            }
            for(u=0; u<this.actor.leading.length;u++) {
              leadingActors = leadingActors + this.actor.leading[u].name+ " ";
            }
            var movieList = '<tr class="record"><td class="ranking">'+i+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu">등급</div><div class="title subMenu">'+this.title+'</div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + genres + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +this.director.name+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';
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
