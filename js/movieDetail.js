//movieDetail에서 옴
$(document).ready(function(){
  var title = sessionStorage.getItem("selectedMovie");
  //trailers 조작 함수
  var tCount = 1;
  var tList = '.container .contentsWrap .trailerWrap .trailers .trailer';

  $('.container .contentsWrap .trailerWrap>button.down').on('click', function() {
    if ($(tList).length > 3 && tCount < $(tList).length-2){
      $(tList+':nth-child('+tCount+')').addClass('hidden');
      tCount++;
    };
  });

  $('.container .contentsWrap .trailerWrap>button.up').on('click', function() {
    if($(tList).length > 3 && tCount > 1) {
      tCount--;
      $(tList+':nth-child('+tCount+')').removeClass('hidden')
    };
  });

  $.getJSON('../json/movies.json', function(data){
    $.each(data, function() {
      if(this.title == title) {
        var number =0;
        $('.outlineWrap .poster img').attr('src', this.poster);
        $('.outlineWrap .title').text(this.title);
        if(this.aka != "") {
          $('.outlineWrap .aka').text('(a.k.a '+this.aka+')');
        }
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
        $('.outlineWrap .director').text(directorShort);
        var leadingActors = "";
        for(i=0; i<this.actor.leading.length; i++) {
          leadingActors = leadingActors + this.actor.leading[0].name + " ";
        }
        var director = "";
        for(u=0; u<this.director.length; u++) {
          director = director + '<li class="director"><div class="picture"><img src="'+this.director[u].img+'"width="100%" heigth="100%"></div><div class="name">'+this.director[u].name+'</div><div class="role">감독</div></li>';
        };
        $('.outlineWrap .actor').text(leadingActors);
        $('.outlineWrap .filmRating').text(this.grade);
        $('.outlineWrap .rating').text(this.point.netizen);
        $('.detailsWrap .details .story .keyword').text(this.storyline.keyword);
        $('.detailsWrap .details .story .storyline').text(this.storyline.description);
        $('.shortActorDirector > ul').append(director);
        $('.crewDirector>ul').append(director);
        for(i=0, u=0; i<6-number; i++) {
          if(this.actor.leading[i]){
            $('.shortActorDirector>ul').append('<li class="actor"><div class="picture"><img src="' + this.actor.leading[i].img + '"width="100%" heigth="100%"></div><div class="name">'+ this.actor.leading[i].name +'</div><div class="role">'+ this.actor.leading[i].role +' 역</div></li>');
          } else if (this.actor.supporting[u]) {
            $('.shortActorDirector>ul').append('<li class="actor"><div class="picture"><img src="' + this.actor.supporting[u].img + '"width="100%" heigth="100%"></div><div class="name">'+ this.actor.supporting[u].name +'</div><div class="role">'+ this.actor.supporting[u].role +' 역</div></li>');
            u++
          }
        };
        for(i=0; i<this.actor.leading.length; i++) {
          $('.crewActor>ul').append('<li class="actor"><div class="picture"><img src="'+this.actor.leading[i].img+'"width="100%" heigth="100%"></div><div class="name">'+this.actor.leading[i].name+'</div><div class="nameEng">'+this.actor.leading[i].nameEng+'</div><div class="part">주연</div><div class="role">'+this.actor.leading[i].role+' 역</div></li>');
        };
        for(i=0; i<this.actor.supporting.length; i++) {
          $('.crewActor>ul').append('<li class="actor"><div class="picture"><img src="'+this.actor.supporting[i].img+'"width="100%" heigth="100%"></div><div class="name">'+this.actor.supporting[i].name+'</div><div class="nameEng">'+this.actor.supporting[i].nameEng+'</div><div class="part">조연</div><div class="role">'+this.actor.supporting[i].role+' 역</div></li>');
        };
        $('.player iframe').attr('src', 'https://www.youtube.com/embed/' + this.video[0].link);
        for(i=0; i<this.video.length; i++) {
          $('.trailers').append('<li class="trailer"><button type="button" class="videos"><img src="http://img.youtube.com/vi/' +this.video[i].link+ '/sddefault.jpg" height="100%" alt="video" id="'+this.video[i].link+'"></button></li>');
        };
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
    var movieName = $('.outlineWrap .outlines .title').text();
    sessionStorage.setItem("selectedMovie", movieName);
    location.href = "../ticket/reserve.html";
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
      $('.reviewWrap .netizen.grades').append(addReview);
    }
    for(i=0; i < 5; i++) {
      if(reviews.length<=i) {
        break
      } else {
      var addReview = '<li class="grade clearfix"><div class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></div><div class="commentWrap"><p>'+reviews[i].review+'</p><div class="writerWrap"><div class="writer">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate">'+reviews[i].date+'</div><div class="report"><button type="button" class="reportBtn">신고</button></div></div><div class="likeWrap"><button type="button">공감</button><button type="button">비공감</button></div></div></li>'
      $('.shortRatings .netizen.grades').append(addReview);
      }
    }
    $('.starPoint').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true
      })
    })
  });//getJSON

  $(".addReviewBtn").on('click', function() {
    $("form.addReview").show();
    $("form.addReview .addReviewTitle").text(title);
  });

  $('.cancleBtn').on('click', function() {
    $("form.addReview textarea").val('');
    $("form.addReview input:checkbox").prop("checked", false);
    $("form.addReview input:radio").prop("checked", false);
    $("form.addReview").hide();
  });

  $('.confirmBtn').on('click', function() {
    if($('.question.strongPoint input:checkbox:checked').length == 0){
      alert("감상포인트를 선택해주세요.");
    } else if ($('.question.tension input:radio:checked').length == 0) {
      alert("긴장감 지수를 선택해주세요.");
    } else if ($('.question.review .textCheck em').text() == 0) {
      alert("감상평을 작성해주세요.")
    } else if ($('.question.spoiler input:radio:checked').length == 0) {
      alert("스포일러 여부를 선택해주세요.");
    } else {
      var d = new Date();
      var newDate = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
      var strongPoints = [];
      for(i=0; i < $('.question.strongPoint input:checkbox:checked').length; i++) {
        strongPoints.push($('.question.strongPoint input:checkbox:checked')[i].value)
      }
      var newReview = {
        title: title,
        point: $("#rateYo").rateYo("rating")*2,
        review: $("form.addReview textarea").val(),
        date: newDate,
        strongPoint : strongPoints,
        tension: $('.question.tension input:radio:checked').val(),
        spoiler: $('.question.spoiler input:radio:checked').val(),
        writer: "임시 사용자",
        userId: "test",
        like:0
      };
      //로그인시스템 미구현으로 userId, writer는 임시값
      sessionStorage.setItem("reviews", JSON.stringify(newReview));
      $("form.addReview").hide();
      window.location.reload()
    }
  })

  $('.review.question textarea').keyup(function (e){
    var content = $(this).val();
    $('.textCheck em').text(content.length);
    //글자수 실시간 카운팅

    if (content.length > 1000){
        alert("최대 1000자까지 입력 가능합니다.");
        $(this).val(content.substring(0, 1000));
        $('.textCheck em').text("1000");
    }
  });
});


$(document).on('click', '.trailers .trailer>button', function(e) {
  var src = e.target.id;
  $('.player iframe').attr('src', 'https://www.youtube.com/embed/'+src);
});
