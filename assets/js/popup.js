jQuery(function(){
  var input = jQuery('#input').text();
  jQuery('#output').qrcode(input);
})