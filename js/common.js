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
  $(function() {
    var newWindowIcon="";
    if($('.indexPage').length>0) {
      newWindowIcon = newWindowIcon + '<img src="./img/newWindow.png" alt="newWindowIcon" class="newWindowIcon">';
    } else {
      newWindowIcon = newWindowIcon + '<img src="../img/newWindow.png" alt="newWindowIcon" class="newWindowIcon">';
    }
    $('header a[target="_blank"]').append(newWindowIcon)
  })

})
