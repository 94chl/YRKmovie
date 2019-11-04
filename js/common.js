$(document).ready(function() {
  $('#searchButton').on('click', function() {
    alert('준비중입니다');
  });
  $('#loginBox').on('click', function() {
    alert('준비중입니다');
  });

  //headerNavList 작동 함수
  $('.headerNav>ul>li').mouseover(function() {
    $(this).children('ul').addClass('now');
  });

  $('.headerNav>ul>li').mouseout(function() {
    $('.headerNav>ul>li>ul').removeClass('now');
  });

  //top버튼 구현
  $('#topBtn').on('click', function() {
    $(window).scrollTop(0);
  });
})
