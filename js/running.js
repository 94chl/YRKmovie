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
         if(this.ranking == i && this.now == "now") {
           var movieList = '<div class="current movie"><div class="current poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+this.storyline.description+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="current title">'+this.title+'</div><div class="current rate">평점: '+this.point.netizen+'</div><div class="current release">개봉일: '+this.release+'</div><div class="current bookRate">예매율: '+this.bookrate+'%</div></div>'
           $('.current.list').append(movieList);
         }
       }
       release.push(this.release)
     });
    release.sort(function(a, b){return new Date(b) - new Date(a)});
    trimList();
   });//getJSON
});//document

$(".current.listOrder").on("click", $("button"), function(e) {
  var orderBy = e.target.innerText;
  $(".current.listOrder button").removeClass('clicked');
  e.target.setAttribute('class', 'clicked');

  $('.current.movie').remove();

  if(orderBy == "개봉순") {
    $.getJSON('../json/movies.json', function(data){
      for(i = 0; i < release.length; i++) {
        $.each(data, function() {
          if(release[i] == this.release && this.now == "now") {
            var movieList = '<div class="current movie"><div class="current poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+this.storyline.description+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="current title">'+this.title+'</div><div class="current rate">평점: '+this.point.netizen+'</div><div class="current release">개봉일: '+this.release+'</div><div class="current bookRate">예매율: '+this.bookrate+'%</div></div>'
            $('.current.list').append(movieList);
          }
        })
      };
     trimList();
    });//getJSON
  } else {
    $.getJSON('../json/movies.json', function(data){
      $.each(data, function() {
        for(i = 1; i <= data.length; i++) {
          if(this.ranking == i && this.now == "now") {
            var movieList = '<div class="current movie"><div class="current poster"><img src="'+this.poster+'" alt="poster" width="100%" height="100%"></div><div class="posterMenu"><div>'+this.storyline.description+'</div><ul><li><a href="../movieDetail/main.html">상세보기</a></li><li><a href="../ticket/reserve.html">예매하기</a></li></ul></div><div class="current title">'+this.title+'</div><div class="current rate">평점: '+this.point.netizen+'</div><div class="current release">개봉일: '+this.release+'</div><div class="current bookRate">예매율: '+this.bookrate+'%</div></div>'
            $('.current.list').append(movieList);
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

$(document).on('click', ".posterMenu ul li a", function() {
  var movieName = $(this).parents('.posterMenu').siblings('.title').text();
  sessionStorage.setItem("selectedMovie", movieName);
})

//
