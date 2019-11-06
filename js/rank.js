function trimList() {
  //첫줄의 첫번째 목록은 margin-left를 없앤다
  for(i=0; i <= $('.container .list .movie').length; i++) {
    if(i % 4 == 1) {
      $('.container .list .movie:nth-child('+i+')').css('margin-left','0');
    };
  };
};

var release = [];

$(document).ready(function (){
  sessionStorage.removeItem("selectedMovie");

   $.getJSON('../json/movies.json', function(data){
     $.each(data, function() {
       for(i = 1; i <= data.length; i++) {
         if(this.ranking == i && this.type == "current") {
           var movieList = '<tr class="record"><td class="ranking">'+i+'</td><td class="movie"><div class="outlines"><a href="#" class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></a><div class="outlineMenu title"><div class="filmRating">등급</div><div class="title">'+this.title+'</div></div><div class="outlineMenu"><div>평점: '+this.point.netizen+'</div><div class="rating"></div><div>예매율: '+this.bookrate+'%</div><div class="bookRate"></div></div><div class="outlineMenu"><div>개요</div><ul class="outline"><li class="genre">'+this.genre+'</li><li class="runningTime">'+this.runningtime+'</li><li class="release">개봉일: '+this.release+'</li></ul></div><div class="outlineMenu"><div>감독: '+this.director+'</div><div class="director"></div></div><div class="outlineMenu"><div>출연: '+this.actor.name+'</div><div class="actor"></div></div><div class="outlineMenu media"><a href="#">포토</a><a href="#">관련 영상</a></div><button type="button" name="reserve" class="reserveBtn">예매</button></div></td></tr>';
           $('.rankingTable').append(movieList);
         }
       }
       release.push(this.release)
     });
    release.sort(function(a, b){return new Date(b) - new Date(a)});
    trimList();
   });//getJSON
});//document

$(".listOrder").on("click", $("button"), function(e) {
  var orderBy = e.target.innerText;
  $(".listOrder button").removeClass('clicked');
  e.target.setAttribute('class', 'clicked');

  $('.movie').remove();

  if(orderBy == "개봉순") {
    $.getJSON('../json/movies.json', function(data){
      for(i = 0; i < release.length; i++) {
        $.each(data, function() {
          if(release[i] == this.release && this.type == thisPage) {
            var movieList = '<div class="movie"><div class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+this.storyline.description+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="title">'+this.title+'</div><div class="rate">평점: '+this.point.netizen+'</div><div class="release">개봉일: '+this.release+'</div><div class="bookRate">예매율: '+this.bookrate+'%</div></div>'
            $('.list').append(movieList);
          }
        })
      };
     trimList();
    });//getJSON
  } else {
    $.getJSON('../json/movies.json', function(data){
      $.each(data, function() {
        for(i = 1; i <= data.length; i++) {
          if(this.ranking == i && this.type == thisPage) {
            var movieList = '<div class="movie"><div class="poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+this.storyline.description+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="title">'+this.title+'</div><div class="rate">평점: '+this.point.netizen+'</div><div class="release">개봉일: '+this.release+'</div><div class="bookRate">예매율: '+this.bookrate+'%</div></div>'
            $('.list').append(movieList);
          }
        }
      });
     trimList();
    });//getJSON
  }
})

$(document).on("mouseenter", ".poster", function() {
  $(this).siblings('.posterMenu').addClass('now');
})

$(document).on("mouseleave", ".posterMenu", function() {
  $(this).removeClass('now');
})

$(document).on('click', ".posterMenu ul li a", function() {
  var movieName = $(this).parents('.posterMenu').siblings('.title').text();
  sessionStorage.setItem("selectedMovie", movieName);
})

//
