$(document).ready(function(){
  $('.disable').on('click', function() {
    alert('준비중입니다');
    return false;
  })

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
  var preMovie = [];

  $.getJSON('../json/movies.json', function(data){
    $.each(data, function() {
      for(i = 1; i <= $('.slider.slide1 .listWrap:nth-child(1) .slideList').length; i++) {
        if(this.ranking == i && this.type=="current") {
          $('.slider.slide1 .slideList:nth-child('+i+') img').attr('src', this.poster)
          $('.slider.slide1 .slideList:nth-child('+i+') img').attr('alt', this.title)
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
        $('.slider.slide2 .slideList:nth-child('+(i+1)+') img').attr('src', currentMovies[i].poster);
        $('.slider.slide2 .slideList:nth-child('+i+') img').attr('alt', currentMovies[i].title)
        $('.slider.slide2 .slideList:nth-child('+(i+1)+') > .releaseNow').text(currentMovies[i].release+" 개봉")
      }
    })

    $(function() {
      preMovie.sort(function(a, b){return new Date(b.release) - new Date(a.release)});
      for(i = 0; i < $('.slider.slide3 .listWrap:nth-child(1) .slideList').length; i++) {
        $('.slider.slide3 .slideList:nth-child('+(i+1)+') img').attr('src', preMovie[i].poster);
        $('.slider.slide3 .slideList:nth-child('+i+') img').attr('alt', preMovie[i].title)
        $('.slider.slide3 .slideList:nth-child('+(i+1)+') > .preMovie').text(preMovie[i].release+" 개봉")
      }
    })

    $(function() {
      currentMovies.sort(function(a, b){return b.point - a.point});
      for(i = 0; i < $('.slider.slide4 .listWrap:nth-child(1) .slideList').length; i++) {
        $('.slider.slide4 .slideList:nth-child('+(i+1)+') img').attr('src', currentMovies[i].poster)
        $('.slider.slide4 .slideList:nth-child('+i+') img').attr('alt', currentMovies[i].title)
      }
    })

    var random = shuffle(currentMovies);

    for(u=0; u<4; u++) {
      if(random[u]) {
        $('.reviewList:nth-child('+(u+1)+') .miniposter img').attr("src", random[u].poster);
        $('.reviewList:nth-child('+(u+1)+') .miniTitle>a').text(random[u].title);
        $('.reviewList:nth-child('+(u+1)+') .miniTitle .rateYo').text(random[u].point);
        $('.reviewList:nth-child('+(u+1)+') .miniTitle .miniPoint').text(random[u].point+" / 10");
      }
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

  $(document).on('click', '.slideList>a', function() {
    var movieName = $(this).find('img').attr('alt');
    sessionStorage.setItem("selectedMovie", movieName);
  });

  $(document).on('click', '.reviewList a', function() {
    var movieName = $(this).parents('.reviewList').find('.miniTitle>a').text();
    sessionStorage.setItem("selectedMovie", movieName);
  });

  // movieDetail 파트

  var title = sessionStorage.getItem("selectedMovie");

  $.getJSON('../json/movies.json', function(data){
    $.each(data, function() {
      if(this.title == title) {
        var number =0;
        $('.outlineWrap .poster img').attr('src', this.poster);
        $('.outlineWrap .title').text(this.title);
        var genres = "";
        for(o=0; o<this.genre.length;o++) {
          genres = genres + this.genre[o]+ " ";
        }
        var directorShort = "";
        for(u=0; u<this.director.length; u++) {
          directorShort = directorShort +this.director[u].name;
          number++;
        };
        $('.outlineWrap .genre').text(genres);
        $('.outlineWrap .nation').text(this.nation);
        $('.outlineWrap .runningTime').text(this.runningtime);
        $('.outlineWrap .release').text(this.release);
        var leadingActors = "";
        for(i=0; i<this.actor.leading.length; i++) {
          leadingActors = leadingActors + this.actor.leading[i].name + " ";
        }
        var director = "";
        for(u=0; u<this.director.length; u++) {
          director = director + '<li class="director"><div class="picture"><img src="'+this.director[u].img+'"width="100%" heigth="100%"></div><div class="name">'+this.director[u].name+'</div><div class="role">감독</div></li>';
        };
        $('.outlineWrap .actor').text(leadingActors);
        $('.outlineWrap .rating').text(this.point.netizen);
        $('.detailsWrap .details .story .keyword').text(this.storyline.keyword);
        $('.detailsWrap .details .story .storyline').text(this.storyline.description);
        $('.outlineMenu .director').text(directorShort);
        $('.outlineMenu .actor').text(leadingActors);
        $('.outlineMenu .filmRating').text(this.grade);
        $('.outlineMenu .rating').text(this.point.netizen);
        $('.player iframe').attr('src', 'https://www.youtube.com/embed/' + this.video[0].link);
        $('.production .companyName').text(this.production);
        $('.importer .companyName').text(this.importer);
        $('.distributor .companyName').text(this.distributor);
      }
    });
    $('.companyName').each(function() {
      if($(this).text() == "") {
        $(this).parents('tr').remove();
      }
    })
  });//getJSON

  $('.reserveBtn').on("click", function() {
    var movieName = title;
    sessionStorage.setItem("selectedMovie", movieName);
  });

  var newReview = JSON.parse(sessionStorage.getItem("reviews"));

  var reviews = [];

  if(newReview) {
    reviews.push({
      title: newReview.title,
      point: newReview.point,
      review: newReview.review,
      date: newReview.date,
      writer: newReview.writer,
      userId: newReview.userId,
      like: newReview.like,
      dislike: newReview.dislike
    });
  }


  $.getJSON('../json/review.json', function(data){
    $.each(data, function() {
      if(this.title == title && this.type != "critic") {
        var userId = this.userId.slice(0,3);
        for(i=0; i<this.userId.length-3; i++) {
          userId = userId+"*"
        };
        reviews.push({
          title: this.title,
          point: this.point,
          review: this.review,
          date: this.date,
          writer: this.writer,
          userId: userId,
          like: this.like,
          dislike: this.dislike
        });
      } else if(this.title == title && this.type == "critic") {
        var addReview = '<li class="grade clearfix"><div class="pointWrap"><div class="starPoint reviewData">'+this.point+'</div><div class="point reviewData">'+this.point+'/10</div></div><div class="commentWrap"><p>'+this.review+'</p><div class="writerWrap"><div class="writer">'+this.writer+'</div><div class="writeDate">'+this.date+'</div></div></div></li>'
        $('.critic.grades').append(addReview);
      }
    });
    reviews.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
    for(i=0; i <reviews.length; i++) {
      var addReview = '<li class="grade clearfix"><div class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></div><div class="commentWrap"><p>'+reviews[i].review+'</p><div class="writerWrap"><div class="writer">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate">'+reviews[i].date+'</div><div class="report"><button type="button" class="reportBtn">신고</button></div></div><div class="likeWrap"><button type="button">공감</button><button type="button">비공감</button></div></div></li>'
      $('.netizen.grades.reviewWrap').append(addReview);
    }
    for(i=0; i < 5; i++) {
      if(reviews.length<=i) {
        break
      } else {
      var addReview = '<li class="grade clearfix"><div class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></div><div class="commentWrap"><p>'+reviews[i].review+'</p><div class="writerWrap"><div class="writer">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate">'+reviews[i].date+'</div><div class="report"><button type="button" class="reportBtn">신고</button></div></div><div class="likeWrap"><button type="button">공감</button><button type="button">비공감</button></div></div></li>'
      $('.shortRatings .netizen.grades.someReview').append(addReview);
      }
    }
    $('.starPoint').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true,
        starWidth:"20px"
      })
    })
  });//getJSON
});
