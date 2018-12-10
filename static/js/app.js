// on page load, insert navbar.html into header using jQuery
$.get('../../components/navbar.html', function(response) {
  $('#nav').html(response);
});
