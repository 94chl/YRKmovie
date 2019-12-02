$(document).ready(function(){
  var newReview = JSON.parse(sessionStorage.getItem("reviews"));

  var reviews = [];

  var selectedReview = [];

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
  var page = 1;

  $.getJSON('../json/review.json', function(data){
    $.each(data, function() {
      if(this.type != "critic") {
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
      }
    });
    for(i=0; i<Math.ceil(reviews.length/10); i++) {
      $('.pageList .pages').append('<li class="page"><button type="button" name="button" class="pageBtn">'+(i+1)+'</button></li>')
    }

    reviews.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
    for(i=(page*10)-10, u=0; u<10; i++) {
      if(i<reviews.length) {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+reviews[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+reviews[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate reviewData">'+reviews[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+reviews[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
      }
    }
    $('.starPoint').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true
      })
    })
  });//getJSON

  $(document).on('click', '.page .pageBtn', function(e) {
    var checkTitle = $('.movieSelect .movieTitle>input:checked').val();
    page = e.target.innerText;
    $('.reviews .review').remove()
    for(i=(page*10)-10, u=0; u<10;) {
      if(i<reviews.length && checkTitle =="전체") {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+reviews[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+reviews[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate reviewData">'+reviews[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+reviews[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
        i++;
      } else if(i<selectedReview.length && checkTitle !="전체" && checkTitle == selectedReview[i].title) {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+selectedReview[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+selectedReview[i].point+'</div><div class="point reviewData">'+selectedReview[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+selectedReview[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+selectedReview[i].writer+'('+selectedReview[i].userId+')</div><div class="writeDate reviewData">'+selectedReview[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+selectedReview[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
        i++;
      } else {
        break
      }
    }

    $('.starPoint').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true
      })
    })
  })

  $.getJSON('../json/movies.json', function(data){
    $('.movieSelect').append('<label class="movieTitle"><input type="radio" name="movieTitle" value="전체" checked>전체</label>');
    $.each(data, function() {
      if(this.type == "current") {
        var movieTitle = '<label class="movieTitle"><input type="radio" name="movieTitle" value="' + this.title + '">' + this.title + '</label>';
        $('.movieSelect').append(movieTitle);
      }
    })
  });

  $(document).on('change', '.movieSelect .movieTitle>input',function() {
    var selected = $(this).val();

    $('.reviewWrap .reviews .review').remove();
    selectedReview.length = 0;

    for(i=0; i <reviews.length; i++) {
      if(selected == "전체"){
        selectedReview.push({
          title: reviews[i].title,
          point: reviews[i].point,
          review: reviews[i].review,
          date: reviews[i].date,
          writer: reviews[i].writer,
          userId: reviews[i].userId,
          like: reviews[i].like,
          dislike: reviews[i].dislike
        });
      } else if (selected != "all" && reviews[i].title == selected) {
        selectedReview.push({
          title: reviews[i].title,
          point: reviews[i].point,
          review: reviews[i].review,
          date: reviews[i].date,
          writer: reviews[i].writer,
          userId: reviews[i].userId,
          like: reviews[i].like,
          dislike: reviews[i].dislike
        });
      }
    }
    page = 1;
    for(i=(page*10)-10, u=0; u<10;) {
      if(i<reviews.length && selected =="전체") {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+reviews[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+reviews[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate reviewData">'+reviews[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+reviews[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
        i++;
      } else if(i<selectedReview.length && selected !="전체" && selected == selectedReview[i].title) {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+selectedReview[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+selectedReview[i].point+'</div><div class="point reviewData">'+selectedReview[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+selectedReview[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+selectedReview[i].writer+'('+selectedReview[i].userId+')</div><div class="writeDate reviewData">'+selectedReview[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+selectedReview[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
        i++;
      } else {
        break
      }
    };
    $('.pageList .pages .page').remove();
    for(i=0; i<Math.ceil(selectedReview.length/10); i++) {
      $('.pageList .pages').append('<li class="page"><button type="button" name="button" class="pageBtn">'+(i+1)+'</button></li>')
    }
    $('.reviewWrap .pointTab .selected').text(selected);
    $('.starPoint').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true
      })
    })
  })

  $.getJSON('../json/movies.json', function(data){
    $.each(data, function() {
      if(this.type == "current") {
        var movieTitle = '<label class="movieTitle"><input type="radio" name="movieTitle" value="' + this.title + '"">' + this.title + '</label>';
        $('.addReviewTitle').append(movieTitle);
      }
    })
  })

  $(document).on('change', '.addReviewTitle .movieTitle>input',function() {
    var selected = $(this).val();

    $('.addReview .addReviewTitle .selectedTitle').text(selected);
  })

  $(".addReviewBtn").on('click', function() {
    $("form.addReview").show();
  });

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

  $('.cancleBtn').on('click', function() {
    $("form.addReview textarea").val('');
    $("form.addReview input:checkbox").prop("checked", false);
    $("form.addReview input:radio").prop("checked", false);
    $('.addReview .addReviewTitle .selectedTitle').text('영화 제목을 선택해주세요');
    $("form.addReview").hide();
    rateYo.rateYo("option", "rating", 0.5);
  });

  $(document).on('click', '.confirmBtn', function() {
    if($('.addReviewTitle input:radio:checked').length == 0){
      alert("영화 제목을 선택해주세요.");
    } else if($('.question.strongPoint input:checkbox:checked').length == 0){
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
        title: $('.addReviewTitle .movieTitle>input:checked').val(),
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
  });

  var select = $("#minbeds");
  var rateYo = $("#rateYo").rateYo({
    halfStar:true,
    rating: select[0].selectedIndex+0.5
  });

  $("#minbeds").on("change", function() {
    rateYo.rateYo("option", "rating", (this.selectedIndex+1)/2);
  });

  $("#rateYo").on("rateyo.set", function (e, data) {
    $('#minbeds>option').each(function() {
      if($(this).val() == data.rating*2) {
        $(this).prop('selected',true);
        $('#minbeds').val($(this).val())
      }
    })
  });

  $(document).on('click', '.dateBtn', function() {
    var selected = $('.movieSelect .movieTitle>input:checked').val();
    $('.reviewWrap .reviews .review').remove();
    selectedReview.length = 0;

    for(i=0; i <reviews.length; i++) {
      if(selected == "전체"){
        selectedReview.push({
          title: reviews[i].title,
          point: reviews[i].point,
          review: reviews[i].review,
          date: reviews[i].date,
          writer: reviews[i].writer,
          userId: reviews[i].userId,
          like: reviews[i].like,
          dislike: reviews[i].dislike
        });
      } else if (selected != "all" && reviews[i].title == selected) {
        selectedReview.push({
          title: reviews[i].title,
          point: reviews[i].point,
          review: reviews[i].review,
          date: reviews[i].date,
          writer: reviews[i].writer,
          userId: reviews[i].userId,
          like: reviews[i].like,
          dislike: reviews[i].dislike
        });
      }
    }
    selectedReview.sort(function(a, b){return new Date(b.date) - new Date(a.date)});

    page = 1;
    for(i=(page*10)-10, u=0; u<10;) {
      if(i<reviews.length && selected =="전체") {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+selectedReview[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+selectedReview[i].point+'</div><div class="point reviewData">'+selectedReview[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+selectedReview[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+selectedReview[i].writer+'('+selectedReview[i].userId+')</div><div class="writeDate reviewData">'+selectedReview[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+selectedReview[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
        i++;
      } else if(i<selectedReview.length && selected !="전체" && selected == selectedReview[i].title) {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+selectedReview[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+selectedReview[i].point+'</div><div class="point reviewData">'+selectedReview[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+selectedReview[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+selectedReview[i].writer+'('+selectedReview[i].userId+')</div><div class="writeDate reviewData">'+selectedReview[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+selectedReview[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
        i++;
      } else {
        break
      }
    };
    $('.pageList .pages .page').remove();
    for(i=0; i<Math.ceil(selectedReview.length/10); i++) {
      $('.pageList .pages').append('<li class="page"><button type="button" name="button" class="pageBtn">'+(i+1)+'</button></li>')
    }
    $('.reviewWrap .pointTab .selected').text(selected);
    $('.starPoint').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true
      })
    })
  })

  $(document).on('click', '.likeBtn', function() {
    var selected = $('.movieSelect .movieTitle>input:checked').val();
    $('.reviewWrap .reviews .review').remove();
    selectedReview.length = 0;

    for(i=0; i <reviews.length; i++) {
      if(selected == "전체"){
        selectedReview.push({
          title: reviews[i].title,
          point: reviews[i].point,
          review: reviews[i].review,
          date: reviews[i].date,
          writer: reviews[i].writer,
          userId: reviews[i].userId,
          like: reviews[i].like,
          dislike: reviews[i].dislike
        });
      } else if (selected != "all" && reviews[i].title == selected) {
        selectedReview.push({
          title: reviews[i].title,
          point: reviews[i].point,
          review: reviews[i].review,
          date: reviews[i].date,
          writer: reviews[i].writer,
          userId: reviews[i].userId,
          like: reviews[i].like,
          dislike: reviews[i].dislike
        });
      }
    }
    selectedReview.sort(function(a, b){return b.like - a.like});

    page = 1;
    for(i=(page*10)-10, u=0; u<10;) {
      if(i<reviews.length && selected =="전체") {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+selectedReview[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+selectedReview[i].point+'</div><div class="point reviewData">'+selectedReview[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+selectedReview[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+selectedReview[i].writer+'('+selectedReview[i].userId+')</div><div class="writeDate reviewData">'+selectedReview[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+selectedReview[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
        i++;
      } else if(i<selectedReview.length && selected !="전체" && selected == selectedReview[i].title) {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+selectedReview[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+selectedReview[i].point+'</div><div class="point reviewData">'+selectedReview[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+selectedReview[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+selectedReview[i].writer+'('+selectedReview[i].userId+')</div><div class="writeDate reviewData">'+selectedReview[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">'+selectedReview[i].like+'<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
        u++;
        i++;
      } else {
        break
      }
    };
    $('.pageList .pages .page').remove();
    for(i=0; i<Math.ceil(selectedReview.length/10); i++) {
      $('.pageList .pages').append('<li class="page"><button type="button" name="button" class="pageBtn">'+(i+1)+'</button></li>')
    }
    $('.reviewWrap .pointTab .selected').text(selected);
    $('.starPoint').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true
      })
    })
  })

});
