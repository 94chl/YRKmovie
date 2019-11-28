function trimList() {
  //첫줄의 첫번째 목록은 margin-left를 없앤다
  for(i=0; i <= $('.container .list .movie').length; i++) {
    if(i % 4 == 1) {
      $('.container .list .movie:nth-child('+i+')').css('margin-left','0');
    };
  };
};

var current = [];
var pre = [];

$(document).ready(function (){
  sessionStorage.removeItem("selectedMovie");
  var thisPage = $('.container section.listWrap')[0].classList[0];
   $.getJSON('../json/movies.json', function(data){
     $.each(data, function() {
       for(i = 1; i <= data.length; i++) {
         if(this.ranking == i && thisPage == "current" && this.type=="current") {
           var movieList = '<div class="'+thisPage+' movie"><div class="'+thisPage+' poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+this.storyline.description+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="'+thisPage+' title"><a href="../movieDetail/main.html">'+this.title+'</a></div><div class="'+thisPage+' grade">등급: '+this.grade+'</div><div class="'+thisPage+' release">개봉일: '+this.release+'</div><div class="'+thisPage+' bookRate">예매율: '+this.bookrate+'%</div></div>'
           $('.list').append(movieList);
           var currentM = {
             poster: this.poster,
             story: this.storyline.description,
             title:this.title,
             grade:this.grade,
             point:this.point.netizen,
             release:this.release,
             bookrate:this.bookrate,
             ranking:this.ranking
           }
           current.push(currentM);
         };
       }
       if (thisPage == "premovie" && this.type=="premovie") {
         var movieList = '<div class="'+thisPage+' movie"><div class="'+thisPage+' poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+this.storyline.description+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="'+thisPage+' title"><a href="../movieDetail/main.html">'+this.title+'</a></div><div class="'+thisPage+' grade">등급: '+this.grade+'</div><div class="'+thisPage+' release">개봉일: '+this.release+'</div><div class="'+thisPage+' bookRate">예매율: '+this.bookrate+'%</div></div>'
         $('.list').append(movieList);
         var preM = {
           poster: this.poster,
           story: this.storyline.description,
           title:this.title,
           grade:this.grade,
           release:this.release,
           bookrate:this.bookrate
         }
         pre.push(preM);
       }
     });
    trimList();
   });//getJSON

$(".listOrder .orderBtn").on("click", $("button"), function(e) {
  var orderBy = e.target.innerText;
  $(".listOrder button").removeClass('clicked');
  e.target.setAttribute('class', 'clicked');

  $('.movie').remove();

  if(orderBy == "개봉순") {
    current.sort(function(a, b){return new Date(b.release) - new Date(a.release)});
    pre.sort(function(a, b){return new Date(b.release) - new Date(a.release)});
    if(thisPage == "current") {
      for(i = 0; i < current.length; i++) {
        var movieList = '<div class="'+thisPage+' movie"><div class="'+thisPage+' poster"><img src="'+current[i].poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+current[i].story+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="'+thisPage+' title">'+current[i].title+'</div><div class="'+thisPage+' grade">등급: '+current[i].grade+'</div><div class="'+thisPage+' rate">평점: '+current[i].point+'</div><div class="'+thisPage+' release">개봉일: '+current[i].release+'</div><div class="'+thisPage+' bookRate">예매율: '+current[i].bookrate+'%</div></div>'
        $('.list').append(movieList);
      }
    } else if(thisPage == "premovie") {
      for(i = 0; i < pre.length; i++) {
        var movieList = '<div class="'+thisPage+' movie"><div class="'+thisPage+' poster"><img src="'+pre[i].poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+pre[i].story+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="'+thisPage+' title">'+pre[i].title+'</div><div class="'+thisPage+' grade">등급: '+pre[i].grade+'</div><div class="'+thisPage+' release">개봉일: '+pre[i].release+'</div><div class="'+thisPage+' bookRate">예매율: '+pre[i].bookrate+'%</div></div>'
        $('.list').append(movieList);
      }
    };
  } else {
    current.sort(function(a, b){return a.ranking - b.ranking});
    pre.sort(function(a, b){return b.bookrate - a.bookrate});
    if(thisPage == "current") {
      for(i = 0; i < current.length; i++) {
        var movieList = '<div class="'+thisPage+' movie"><div class="'+thisPage+' poster"><img src="'+current[i].poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+current[i].story+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="'+thisPage+' title">'+current[i].title+'</div><div class="'+thisPage+' grade">등급: '+current[i].grade+'</div><div class="'+thisPage+' rate">평점: '+current[i].point+'</div><div class="'+thisPage+' release">개봉일: '+current[i].release+'</div><div class="'+thisPage+' bookRate">예매율: '+current[i].bookrate+'%</div></div>'
        $('.list').append(movieList);
      }
    } else if(thisPage == "premovie") {
      for(i = 0; i < pre.length; i++) {
        var movieList = '<div class="'+thisPage+' movie"><div class="'+thisPage+' poster"><img src="'+pre[i].poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+pre[i].story+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="'+thisPage+' title">'+pre[i].title+'</div><div class="'+thisPage+' grade">등급: '+pre[i].grade+'</div><div class="'+thisPage+' release">개봉일: '+pre[i].release+'</div><div class="'+thisPage+' bookRate">예매율: '+pre[i].bookrate+'%</div></div>'
        $('.list').append(movieList);
      }
    };
  }
  trimList();
})
});//document

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

$(document).on('click', ".title>a", function() {
  var movieName = $(this).text();
  sessionStorage.setItem("selectedMovie", movieName);
})

//
