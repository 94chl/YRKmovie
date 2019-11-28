function trimList() {
  //첫줄의 첫번째 목록은 margin-left를 없앤다
  for(i=0; i <= $('.container .list .movie').length; i++) {
    if(i % 4 == 1) {
      $('.container .list .movie:nth-child('+i+')').css('margin-left','0');
    };
  };
};

function addList(rank, list) {
  var movieList = '<tr class="record"><td class="ranking">'+rank+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+list.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu"><img src="../img/'+list.gIcon+'.png" alt="gradeIcon" height="100%"></div><div class="title subMenu"><a href="../movieDetail/main.html">'+list.title+'</a></div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + list.point + '</div><div class="subMenu">예매율</div><div class="bookRate">' + list.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + list.genre + '</li><li class="runningTime">' + list.runningtime + '</li><li class="release">개봉일 '+list.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +list.director+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+list.actor+'</div></div><div class="outlineMenu media"><a href="../movieDetail/main.html">포토</a><div class="videoWrap"><div class="videoTab clearfix">관련 영상</div><ul class="videos">'+list.video+'</ul></div></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';

  $('.rankingTable').append(movieList);
}

var pointnow = [];
var pointall = [];
var ranknow = [];

var now = "all";

$(document).ready(function (){
  sessionStorage.removeItem("selectedMovie");

   $.getJSON('../json/movies.json', function(data){
     $.each(data, function() {
       var genres = "";
       var leadingActors = "";
       var director = "";
       var video = "";
       var gIcon = "";
       if (this.grade == "전체 관람가") {
         gIcon = "gall";
       } else if (this.grade == "12세 관람가") {
         gIcon = "g12";
       } else if (this.grade == "15세 관람가") {
         gIcon = "g15";
       } else {
         gIcon = "g19";
       }
       for(u=0; u<this.video.length;u++) {
         video = video + "<li class='video' id='" + this.video[u].link+"'>"+this.video[u].name+"</li>"
       }
       for(u=0; u<this.director.length; u++) {
         director = director + this.director[u].name+ " ";
       }
       for(o=0; o<this.genre.length;o++) {
         genres = genres + this.genre[o]+ " ";
       }
       for(u=0; u<this.actor.leading.length;u++) {
         leadingActors = leadingActors + this.actor.leading[u].name+ " ";
       }
       for(i = 1; i <= data.length; i++) {
         if(this.ranking == i && this.type == "current") {
           var movieList = '<tr class="record"><td class="ranking">'+i+'</td><td class="movie"><div class="outlines"><a href="../movieDetail/main.html" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating subMenu"><img src="../img/'+gIcon+'.png" alt="gradeIcon" height="100%"></div><div class="title subMenu"><a href="../movieDetail/main.html">'+this.title+'</a></div></div><div class="outlineMenu"><div class="subMenu">평점</div><div class="rating">' + this.point.netizen + '</div><div class="subMenu">예매율</div><div class="bookRate">' + this.bookrate + '%</div></div><div class="outlineMenu"><div class="subMenu">개요</div><ul class="outline"><li class="genre">' + genres + '</li><li class="runningTime">' + this.runningtime + '</li><li class="release">개봉일 '+this.release+'</li></ul></div><div class="outlineMenu"><div class="subMenu">감독</div><div class="director">' +director+'</div></div><div class="outlineMenu"><div class="subMenu">출연</div><div class="actor">'+leadingActors+'</div></div><div class="outlineMenu media"><a href="../movieDetail/main.html">포토</a><div class="videoWrap"><div class="videoTab clearfix">관련 영상</div><ul class="videos">'+video+'</ul></div></div><a href="../ticket/reserve.html" class="reserveBtn">예매</a></div></td></tr>';

           $('.rankingTable').append(movieList);
           pointnow.push({
             ranking: this.ranking,
             grade:this.grade,
             gIcon:gIcon,
             poster: this.poster,
             title: this.title,
             point: this.point.netizen,
             genre: this.genre,
             bookrate: this.bookrate,
             runningtime: this.runningtime,
             release: this.release,
             video: video,
             director: director,
             actor: leadingActors
           });
           ranknow.push({
             ranking: this.ranking,
             grade:this.grade,
             gIcon:gIcon,
             poster: this.poster,
             title: this.title,
             point: this.point.netizen,
             genre: this.genre,
             bookrate: this.bookrate,
             runningtime: this.runningtime,
             release: this.release,
             video: video,
             director: director,
             actor: leadingActors
           });
         }
       }
       pointall.push({
         ranking: this.ranking,
         grade:this.grade,
         gIcon:gIcon,
         poster: this.poster,
         title: this.title,
         point: this.point.netizen,
         genre: this.genre,
         bookrate: this.bookrate,
         runningtime: this.runningtime,
         release: this.release,
         video: video,
         director: director,
         actor: leadingActors
       });
     });
    ranknow.sort(function(a, b){return a.ranking - b.ranking});
    pointnow.sort(function(a, b){return b.point - a.point});
    pointall.sort(function(a, b){return b.point - a.point});
    trimList();
   });//getJSON

   $('.contentsWrap #genres').on('change', function() {
     now = $('#genres .genre[value=' + $('#genres').val() + ']').text();
     if(now == "전체") {
       now = "all"
     }
     var orderBy = $('.orderBy.clicked')[0].classList[1];
     $('.record').remove();
     if(orderBy == "rankNow" && now =="all") {
       for(i=0; i<10; i++) {
         if(ranknow[i]) {
           var r = i+1;
           addList(r, ranknow[i]);
         }
       }
     } else if(orderBy == "rankNow" && now !="all") {
       for(i=0, r=1; i<10; i++) {
         if(ranknow[i] && ranknow[i].genre.indexOf(now)>=0) {
           addList(r, ranknow[i]);
           r++
         } else if(!ranknow[i]) {
           break
         }
       }
     } else if(orderBy == "pointNow" && now == "all") {
       for(i=0; i<10; i++) {
         if(pointnow[i]) {
           var r = i+1;
           addList(r, pointnow[i]);
         }
       }
     } else if(orderBy == "pointNow" && now != "all") {
       for(i=0, r=1; i<10; i++) {
         if(pointnow[i] && pointnow[i].genre.indexOf(now)>=0) {
           addList(r, pointnow[i]);
           r++
         } else if(!pointnow[i]) {
           break
         }
       }
     } else if(orderBy == "pointAll" && now == "all") {
       for(i=0; i<10; i++) {
         if(pointall[i]) {
           var r = i+1;
           addList(r, pointall[i]);
         }
       }
     } else if(orderBy == "pointAll" && now != "all") {
       for(i=0, r=1; r<11; i++) {
         if(pointall[i] && pointall[i].genre.indexOf(now)>=0) {
           addList(r, pointall[i]);
           r++
         } else if(!pointall[i]) {
           break
         }
       }
     }
   });

$(".orderList .orderBy").on("click", $(".orderBy"), function(e) {
  var orderBy = e.target.classList[1];
  $(".orderList .orderBy").removeClass('clicked');
  $(this).addClass('clicked');

  $('.record').remove();
  if(orderBy == "rankNow" && now =="all") {
    for(i=0; i<10; i++) {
      if(ranknow[i]) {
        var r = i+1;
        addList(r, ranknow[i]);
      }
    }
  } else if(orderBy == "rankNow" && now !="all") {
    for(i=0, r=1; i<10; i++) {
      if(ranknow[i] && ranknow[i].genre.indexOf(now)>=0) {
        addList(r, ranknow[i]);
        r++
      } else if(!ranknow[i]) {
        break
      }
    }
  } else if(orderBy == "pointNow" && now == "all") {
    for(i=0; i<10; i++) {
      if(pointnow[i]) {
        var r = i+1;
        addList(r, pointnow[i]);
      }
    }
  } else if(orderBy == "pointNow" && now != "all") {
    for(i=0, r=1; i<10; i++) {
      if(pointnow[i] && pointnow[i].genre.indexOf(now)>=0) {
        addList(r, pointnow[i]);
        r++
      } else if(!pointnow[i]) {
        break
      }
    }
  } else if(orderBy == "pointAll" && now == "all") {
    for(i=0; i<10; i++) {
      if(pointall[i]) {
        var r = i+1;
        addList(r, pointall[i]);
      }
    }
  } else if(orderBy == "pointAll" && now != "all") {
    for(i=0, r=1; r<11; i++) {
      if(pointall[i] && pointall[i].genre.indexOf(now)>=0) {
        addList(r, pointall[i]);
        r++
      } else if(!pointall[i]) {
        break
      }
    }
  }
});

$(document).on("click", "a.poster", function(e){
  var movieName = $(this).siblings('.outlineMenu.title').find('.title').text();
  sessionStorage.setItem("selectedMovie", movieName);
});

$(document).on("click", ".outlineMenu .title a", function(e){
  var movieName = $(this).parents('.subMenu.title').text();
  sessionStorage.setItem("selectedMovie", movieName);
});

$(document).on("click", ".outlineMenu.media a", function(e){
  var movieName = $(this).parents('.outlineMenu').siblings('.outlineMenu.title').find('.title').text();
  sessionStorage.setItem("selectedMovie", movieName);
});

$(document).on("click", "a.reserveBtn", function(e){
  var movieName = $(this).siblings('.outlineMenu.title').find('.title').text();
  sessionStorage.setItem("selectedMovie", movieName);
});

$(document).on('mouseenter', '.videoTab', function() {
  $(this).siblings('.videos').addClass('open');
  $(this).css("border-right", "none");
});

$(document).on('mouseleave', '.videoWrap', function() {
  $(this).find('.videos').removeClass('open');
  $(this).find('.videoTab').css("border-right", "1px solid #888");
});

$(document).on('click', '.videoWrap .video', function() {
  $('.player iframe').attr('src', 'https://www.youtube.com/embed/'+$(this).attr("id"));
  $('.player').addClass('open');
  // class text
})

$('.player .closeBtn').on('click', function() {
  $('.player').removeClass('open');
})

});//document

//
