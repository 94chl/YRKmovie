//slider조작 함수
$(window).on('load', function() {
  var slides = [];
  var now = 1;
  var sliderMove = setInterval(next, 3000);

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
    console.log(now)
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
    clearInterval(sliderMove);
  });

  $('.container .sliderBox .sliderWrap .slider .slideList').mouseleave(function() {
    $('.container .sliderBox .sliderWrap .slider .slideList div.listClickMenu').removeClass('now');
    clearInterval(sliderMove)
    sliderMove = setInterval(next, 3000);
  });

  //rewiewList 조작함수
  $('.container .contentsWrap .reviewSpotlight .review .reviewList').mouseover(function() {
    $('.container .contentsWrap .reviewSpotlight .review .reviewList').removeClass('now');
    $(this).addClass('now');
  });

});

$(document).ready(function(){
   $.getJSON('../json/movies.json', function(data){
     $.each(data, function() {
       for(i = 1; i <= $('.slider.slide1 .listWrap:nth-child(1) .slideList').length; i++) {
         if(this.ranking == i) {
           $('.slider.slide1 .slideList:nth-child('+i+') > .listClickMenu').attr('title', this.title)
           $('.slider.slide1 .slideList:nth-child('+i+') > img').attr('src', this.poster)
         }
       }
     });
   });//getJSON

  sessionStorage.removeItem("selectedMovie");
  $('.listClickMenu ul li').on('click', function() {
    var movieName = $(this).parents('.listClickMenu').attr('title')
    sessionStorage.setItem("selectedMovie", movieName);
  })
});
