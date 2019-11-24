$(document).ready(function(){
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
    reviews.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
    for(i=0; i <reviews.length; i++) {
      var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+reviews[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+reviews[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate reviewData">'+reviews[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">공감<em class="like reviewData"></em></button></td></tr>'
      $('.netizen.reviews').append(addReview);
    }
    $('.starPoint').each(function(){
      $(this).rateYo({
        rating:$(this).text()/2,
        readOnly: true
      })
    })
  });//getJSON

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

    for(i=0; i <reviews.length; i++) {
      if(selected == "전체"){
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+reviews[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+reviews[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate reviewData">'+reviews[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">공감<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
      } else if (selected != "all" && reviews[i].title == selected) {
        var addReview = '<tr class="review"><td class="title"><a href="#" class="title reviewData">'+reviews[i].title+'</a></td><td class="pointWrap"><div class="starPoint reviewData">'+reviews[i].point+'</div><div class="point reviewData">'+reviews[i].point+'/10</div></td><td class="commentWrap"><p class="comment reviewData">'+reviews[i].review+'</p><div class="report"><button type="button" class="reportBtn">신고</button></div></td><td class="writerWrap"><div class="writer reviewData">'+reviews[i].writer+'('+reviews[i].userId+')</div><div class="writeDate reviewData">'+reviews[i].date+'</div></td><td class="likeWrap"><button type="button" class="likeBtn">공감<em class="like reviewData"></em></button></td></tr>'
        $('.netizen.reviews').append(addReview);
      }
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
        title: $('.addReviewTitle .movieTitle>input:checked').val(),
        point: $("#rateYo").rateYo("rating")*2,
        review: $("form.addReview textarea").val(),
        date: newDate,
        strongPoint : strongPoints,
        tension: $('.question.tension input:radio:checked').val(),
        spoiler: $('.question.spoiler input:radio:checked').val(),
        writer: "임시 사용자",
        userId: "test"
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

});
