$(document).ready(function(){
  $('.sideBarBtn').on('click', function() {
    $('.sidebarWrap').addClass('open');
  })

  $('.sidebar .closeBtn').on('click', function() {
    $('.sidebarWrap').removeClass('open');
  })

  $('.sidebarWrap .sidebarClose').on('click', function() {
    $('.sidebarWrap').removeClass('open');
  })

  //headerNavList 작동 함수
  $('.sidebar>ul>li').click(function() {
    $('.sidebar>ul>li').removeClass('now');
    $('.sidebar>ul>li .sideBarList').text('▼');
    $(this).addClass('now');
    if($(this).find('.sideBarList')) {
      $(this).find('.sideBarList').text('▲')
    }
  });

  //top버튼 구현
  $('#topBtn').on('click', function() {
    $(window).scrollTop(0);
  });
  var newWindowIcon = '<img src="../img/newWindow.png" alt="newWindowIcon" class="newWindowIcon">';
  $('header a[target="_blank"]').append(newWindowIcon)

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

  //rewiewList 조작함수
  $('.container .contentsWrap .reviewsEvents .review .reviewList').click(function() {
    $('.container .contentsWrap .reviewsEvents .review .reviewList').removeClass('now');
    $(this).addClass('now');
  });

  var currentMovies = [];

  $.getJSON('../json/movies.json', function(data){
    $.each(data, function() {
      for(i = 1; i <= $('.slider.slide1 .listWrap:nth-child(1) .slideList').length; i++) {
        if(this.ranking == i && this.type=="current") {
          $('.slider.slide1 .slideList:nth-child('+i+') img').attr('src', this.poster)
           var movie = {
             title: this.title,
             point: this.point.netizen,
             poster: this.poster,
             video:this.video[0]
          }
           currentMovies.push(movie);
        }
      }
    });
    var random = shuffle(currentMovies);

    for(u=0; u<4; u++) {

      $('.reviewList:nth-child('+(u+1)+') .miniposter img').attr("src", random[u].poster);
      $('.reviewList:nth-child('+(u+1)+') .miniTitle>a').text(random[u].title);
      $('.reviewList:nth-child('+(u+1)+') .miniTitle .rateYo').text(random[u].point);
      $('.reviewList:nth-child('+(u+1)+') .miniTitle .miniPoint').text(random[u].point+" / 10");
    }
    $('.miniTitle .rateYo').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true,
        starWidth:"20px"
      })
    })
  });//getJSON

  $.getJSON('../json/review.json', function(data){
    var miniReview = []
    $.each(data, function() {
      for(i=0; i<4; i++) {
        if(currentMovies[i] && currentMovies[i].title == this.title) {
          miniReview.push({
            title:this.title,
            review:this.review,
            like:this.like
          })
        }
      }
    })
    miniReview.sort(function(a, b){return b.like - a.like});
    $('.miniTitle>a').each(function() {
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
});
