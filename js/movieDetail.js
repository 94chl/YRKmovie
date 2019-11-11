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
        var genres = "";
        for(o=0; o<this.genre.length;o++) {
          genres = genres + this.genre[o]+ " ";
        }
        $('.outlineWrap .genre').text(genres);
        $('.outlineWrap .nation').text(this.nation);
        $('.outlineWrap .runningTime').text(this.runningtime);
        $('.outlineWrap .release').text(this.release);
        $('.outlineWrap .director').text(this.director.name);
        var leadingActors = "";
        for(i=0; i<this.actor.leading.length; i++) {
          leadingActors = leadingActors + this.actor.leading[0].name + " ";
        }
        $('.outlineWrap .actor').text(leadingActors);
        $('.outlineWrap .filmRating').text(this.grade);
        $('.outlineWrap .rating').text(this.point.netizen);
        $('.detailsWrap .details .story .keyword').text(this.storyline.keyword);
        $('.detailsWrap .details .story .storyline').text(this.storyline.description);
        $('.shortActorDirector > ul').append('<li><div class="picture"><img src="'+this.director.img+'"width="100%" heigth="100%"></div><div class="name">'+this.director.name+'</div><div class="role">감독</div></li>');
        $('.crewDirector>ul').append('<li><div class="picture"><img src="'+this.director.img+'"width="100%" heigth="100%"></div><div class="name">'+this.director.name+'</div><div class="nameEng">'+this.director.nameEng+'</div><div class="role">감독</div></li>');
        for(i=0, u=0; i<5; i++) {
          if(this.actor.leading[i]){
            $('.shortActorDirector>ul').append('<li><div class="picture"><img src="' + this.actor.leading[i].img + '"width="100%" heigth="100%"></div><div class="name">'+ this.actor.leading[i].name +'</div><div class="role">'+ this.actor.leading[i].role +' 역</div></li>');
          } else if (this.actor.supporting[u]) {
            $('.shortActorDirector>ul').append('<li><div class="picture"><img src="' + this.actor.supporting[u].img + '"width="100%" heigth="100%"></div><div class="name">'+ this.actor.supporting[u].name +'</div><div class="role">'+ this.actor.supporting[u].role +' 역</div></li>');
            u++
          }
        };
        for(i=0; i<this.actor.leading.length; i++) {
          $('.crewActor>ul').append('<li><div class="picture"><img src="'+this.actor.leading[i].img+'"width="100%" heigth="100%"></div><div class="name">'+this.actor.leading[i].name+'</div><div class="nameEng">'+this.actor.leading[i].nameEng+'</div><div class="part">'+this.actor.leading[i].part+'</div><div class="role">'+this.actor.leading[i].role+' 역</div></li>');
        };
        for(i=0; i<this.actor.supporting.length; i++) {
          $('.crewActor>ul').append('<li><div class="picture"><img src="'+this.actor.supporting[i].img+'"width="100%" heigth="100%"></div><div class="name">'+this.actor.supporting[i].name+'</div><div class="nameEng">'+this.actor.supporting[i].nameEng+'</div><div class="part">'+this.actor.supporting[i].part+'</div><div class="role">'+this.actor.supporting[i].role+' 역</div></li>');
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


$(document).on('click', '.trailers .trailer>button', function(e) {
  var src = e.target.id;
  console.log(e.target.id);
  $('.player iframe').attr('src', 'https://www.youtube.com/embed/'+src);
});
