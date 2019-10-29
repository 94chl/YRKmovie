//movieDetail에서 옴
$(document).ready(function(){
  var title = sessionStorage.getItem("selectedMovie");
  console.log(title);
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
        $('.outlineWrap .poster img').attr('src', this.poster);
        $('.outlineWrap .title').text(this.title);
        $('.outlineWrap .genre').text(this.genre);
        $('.outlineWrap .nation').text(this.nation);
        $('.outlineWrap .runningTime').text(this.runningtime);
        $('.outlineWrap .release').text(this.release);
        $('.outlineWrap .director').text(this.director.name);
        $('.outlineWrap .actor').text(this.actor[0].name);
        $('.outlineWrap .filmRating').text(this.grade);
        $('.outlineWrap .rating').text(this.point.netizen);
        $('.detailsWrap .details .story .keyword').text(this.storyline.keyword);
        $('.detailsWrap .details .story .storyline').text(this.storyline.description);
        $('.shortActorDirector > ul').append('<li><div class="picture"><img src="'+this.director.img+'"width="100%" heigth="100%"></div><div class="name">'+this.director.name+'</div><div class="role">'+this.director.role+'</div></li>');
        $('.crewDirector>ul').append('<li><div class="picture"><img src="'+this.director.img+'"width="100%" heigth="100%"></div><div class="name">'+this.director.name+'</div><div class="nameEng">'+this.director.nameEng+'</div><div class="role">감독</div></li>');
        for(i=0; i<this.actor.length && i<5; i++) {
          $('.shortActorDirector>ul').append('<li><div class="picture"><img src="'+this.actor[i].img+'"width="100%" heigth="100%"></div><div class="name">'+this.actor[i].name+'</div><div class="role">'+this.actor[i].role+' 역</div></li>');
        };
        for(i=0; i<this.actor.length; i++) {
          $('.crewActor>ul').append('<li><div class="picture"><img src="'+this.actor[i].img+'"width="100%" heigth="100%"></div><div class="name">'+this.actor[i].name+'</div><div class="nameEng">'+this.actor[i].nameEng+'</div><div class="part">'+this.actor[i].part+'</div><div class="role">'+this.actor[i].role+' 역</div></li>');
        };
        $('.player iframe').attr('src', 'https://www.youtube.com/embed/' + this.video[0]);
        for(i=0; i<this.video.length; i++) {
          $('.trailers').append('<li class="trailer"><button type="button" class="videos"><img src="http://img.youtube.com/vi/' +this.video[i]+ '/default.jpg" height="100%" alt="video" id="'+this.video[i]+'"></button></li>');
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
    console.log(movieName);
    sessionStorage.setItem("selectedMovie", movieName);
    location.href = "../ticket/reserve.html";
  })

});


$('.trailers').on('click',$('.trailers .trailer>button'), function(e) {
  var src = e.target.id;
  $('.player iframe').attr('src', 'https://www.youtube.com/embed/'+src);
});
