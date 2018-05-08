$(document).ready( function() {

var url = 'https://jsonplaceholder.typicode.com/posts';
var $element = $('.js-nca-order-list'); 


if($element.length) {
  $.ajax({ 
      type: 'GET', 
      url: url, 
      data: { get_param: 'value' }, 
      dataType: 'json',
      success: function (data) { 
          $.each(data, function(index, element) {
              $element.append('<li class="nca_order-list-item"><a href="#" class="nca_order-list-item-link">'+element.title+'</>');
          });
      },
      error: function(data) {
          $element.append('<h3>No news</h3>')
      }
  });
}

});
