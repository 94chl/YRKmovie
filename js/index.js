$(document).ready(function(){
  var slides = [];
  var now = 1;
  // var sliderMove = setInterval(next, 3000);

  $('.container .sliderBox .sliderWrap ul li:first-child').addClass('now');
  $('.container .sliderBox .sliderWrap .sliderBtnBox .sliderMenu li:first-child').addClass('now');

  //slider의 갯수만큼 slides에 숫자 추가
  for(i=1; i <= $('.container .sliderBox .sliderWrap .slider').length; i++){
    slides.push(i);
  };

  //sliderBtnBox 의 now클래스 지정
  $('.sliderBtnBox .sliderMenu li').on('click', function(){
    $('.container .sliderBox .sliderWrap .slider').removeClass('now');
    $('.container .sliderBtnBox .sliderMenu li').removeClass('now');
    now = $(this).attr('class').substring(9);
    $('.container .sliderBox .sliderWrap .slider:nth-child(' + now + ')').addClass('now');
    $('.container .sliderBtnBox .sliderMenu li:nth-child(' + now + ')').addClass('now');
  });

  //prev버튼 구현
  $('.sliderBtn.prev').on('click', function(){
    if (now == 1) {
      now = slides.length;
      $('.container .sliderBox .sliderWrap .slider').removeClass('now');
      $('.container .sliderBtnBox .sliderMenu li').removeClass('now');
      $('.container .sliderBox .sliderWrap .slider:nth-child(' + now + ')').addClass('now');
      $('.container .sliderBtnBox .sliderMenu li:nth-child(' + now + ')').addClass('now');
    } else {
      now--;
      $('.container .sliderBox .sliderWrap .slider').removeClass('now');
      $('.container .sliderBtnBox .sliderMenu li').removeClass('now');
      $('.container .sliderBox .sliderWrap .slider:nth-child(' + now + ')').addClass('now');
      $('.container .sliderBtnBox .sliderMenu li:nth-child(' + now + ')').addClass('now');
    };
  });
  //다음 슬라이드로 넘어가는 함수는 따로 선언. 자동재생 기능으로 활용하기 위해
  function next(){
   if (now == slides.length) {
     now = 1;
     $('.container .sliderBox .sliderWrap .slider').removeClass('now');
     $('.container .sliderBtnBox .sliderMenu li').removeClass('now');
     $('.container .sliderBox .sliderWrap .slider:nth-child(' + now + ')').addClass('now');
     $('.container .sliderBtnBox .sliderMenu li:nth-child(' + now + ')').addClass('now');
   } else {
     now++;
     $('.container .sliderBox .sliderWrap .slider').removeClass('now');
     $('.container .sliderBtnBox .sliderMenu li').removeClass('now');
     $('.container .sliderBox .sliderWrap .slider:nth-child(' + now + ')').addClass('now');
     $('.container .sliderBtnBox .sliderMenu li:nth-child(' + now + ')').addClass('now');
   };
  };
  $('.sliderBtn.next').on('click', next);

  //listClickMenu조작 함수
  $('.container .sliderBox .sliderWrap .slider .slideList').mouseenter(function() {
    $(this).children('div.listClickMenu').addClass('now');
    // clearInterval(sliderMove);
  });

  $('.container .sliderBox .sliderWrap .slider .slideList').mouseleave(function() {
    $('.container .sliderBox .sliderWrap .slider .slideList div.listClickMenu').removeClass('now');
    // clearInterval(sliderMove)
    // sliderMove = setInterval(next, 3000);
  });

  //rewiewList 조작함수
  $('.container .contentsWrap .reviewsEvents .review .reviewList').mouseover(function() {
    $('.container .contentsWrap .reviewsEvents .review .reviewList').removeClass('now');
    $(this).addClass('now');
  });

  var currentMovies = [];
  var preMovie = [];

  $.getJSON('./json/movies.json', function(data){
    $.each(data, function() {
      for(i = 1; i <= $('.slider.slide1 .listWrap:nth-child(1) .slideList').length; i++) {
        if(this.ranking == i && this.type=="current") {
          $('.slider.slide1 .slideList:nth-child('+i+') > .listClickMenu').attr('title', this.title)
          $('.slider.slide1 .slideList:nth-child('+i+') > img').attr('src', this.poster)
           var movie = {
             title: this.title,
             point: this.point.netizen,
             poster: this.poster,
             video:this.video[0].link,
             release:this.release
          }
           currentMovies.push(movie);
        }
      }
      if (this.type == "premovie") {
        var movie = {
          title: this.title,
          point: this.point.netizen,
          poster: this.poster,
          video:this.video[0].link,
          release:this.release
       }
        preMovie.push(movie);
      }
    });
    $(function() {
      currentMovies.sort(function(a, b){return new Date(b.release) - new Date(a.release)});
      for(i = 0; i < $('.slider.slide2 .listWrap:nth-child(1) .slideList').length; i++) {
        $('.slider.slide2 .slideList:nth-child('+(i+1)+') > .listClickMenu').attr('title', currentMovies[i].title);
        $('.slider.slide2 .slideList:nth-child('+(i+1)+') > img').attr('src', currentMovies[i].poster);
        $('.slider.slide2 .slideList:nth-child('+(i+1)+') > .releaseNow').text(currentMovies[i].release+" 개봉")
      }
    })

    $(function() {
      preMovie.sort(function(a, b){return new Date(b.release) - new Date(a.release)});
      for(i = 0; i < $('.slider.slide3 .listWrap:nth-child(1) .slideList').length; i++) {
        $('.slider.slide3 .slideList:nth-child('+(i+1)+') > .listClickMenu').attr('title', preMovie[i].title);
        $('.slider.slide3 .slideList:nth-child('+(i+1)+') > img').attr('src', preMovie[i].poster);
        $('.slider.slide3 .slideList:nth-child('+(i+1)+') > .preMovie').text(preMovie[i].release+" 개봉")
      }
    })

    $(function() {
      currentMovies.sort(function(a, b){return b.point - a.point});
      for(i = 0; i < $('.slider.slide4 .listWrap:nth-child(1) .slideList').length; i++) {
        $('.slider.slide4 .slideList:nth-child('+(i+1)+') > .listClickMenu').attr('title', currentMovies[i].title)
        $('.slider.slide4 .slideList:nth-child('+(i+1)+') > img').attr('src', currentMovies[i].poster)
      }
    })

    var random = shuffle(currentMovies);

    for(u=0; u<4; u++) {
      $('.reviewList:nth-child('+(u+1)+') .miniposter img').attr("src", random[u].poster);
      $('.reviewList:nth-child('+(u+1)+') .miniTitle>div:first-child').text(random[u].title);
      $('.reviewList:nth-child('+(u+1)+') .miniTitle .rateYo').text(random[u].point);
      $('.reviewList:nth-child('+(u+1)+') .miniTitle .miniPoint').text(random[u].point+" / 10");
      $('.trailer .trailerList:nth-child('+(u+1)+')').addClass(random[u].video);
      $('.trailer .trailerList:nth-child('+(u+1)+')').text(random[u].title);
    }
    $('.miniTitle .rateYo').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true,
        starWidth:"20px"
      })
    })
    $('.trailer .trailerList').each(function() {
      var title = $(this).text();
      $(this).text("");
      $(this).append('<button type="button"><img src="http://img.youtube.com/vi/' +$(this)[0].classList[1]+ '/sddefault.jpg" height="100%" alt="video" id="'+$(this)[0].classList[1]+'"></button><div class="videoTitle"><a href="./movieDetail/main.html">'+title+'</a></div>');
    })
  });//getJSON

  $(document).on('click', '.trailer .trailerList>button', function() {
    $('.player .playerWrap iframe').attr('src', 'https://www.youtube.com/embed/'+$(this).find('img').attr("id"));
    $('.player').addClass('open');
  })

  $('.player .closeBtn').on('click', function() {
    $(this).siblings('.playerWrap').find('iframe').attr('src', 'https://www.youtube.com/embed/');
    $('.player').removeClass('open');
  })

  $.getJSON('./json/review.json', function(data){
    var miniReview = []
    $.each(data, function() {
      for(i=0; i<4; i++) {
        if(currentMovies[i].title == this.title) {
          miniReview.push({
            title:this.title,
            review:this.review,
            like:this.like
          })
        }
      }
    })
    miniReview.sort(function(a, b){return b.like - a.like});
    $('.miniTitle>div:first-child').each(function() {
      var limit = 0;
      for(i=0; i<miniReview.length; i++) {
        if($(this).text() == miniReview[i].title && limit <3){
          $(this).parents('.miniTitle').siblings('.miniReviews').find('.miniReview>a').eq(limit).text(miniReview[i].review);
          limit++;
        }
      }
    })
  })

  function shuffle(o) {
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  sessionStorage.removeItem("selectedMovie");
  $('.listClickMenu ul li').on('click', function() {
    var movieName = $(this).parents('.listClickMenu').attr('title');
    sessionStorage.setItem("selectedMovie", movieName);
  })

  $(document).on('click', '.reviewList a', function() {
    var movieName = $(this).parents('.reviewList').find('.miniTitle>div:first-child').text();
    sessionStorage.setItem("selectedMovie", movieName);
  })

  $(document).on('click', '.videoTitle>a', function() {
    var movieName = $(this).text();
    sessionStorage.setItem("selectedMovie", movieName);
  })
});
