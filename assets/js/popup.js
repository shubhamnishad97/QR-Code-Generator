function qr_create() {
  var text = '';
  text = $('textarea#input').val();
  if(text.length > 1276 || text == '') {
    text = chrome.i18n.getMessage('invalid_text');
  }
  console.log(text)
  $('#output').empty();
  $('#output').qrcode({
    // width: 256,
    // height: 256,
    // correctLevel: 0,
    text: text
  });
}

$(function(){
  qr_create();
});

$(document).ready(function(){
  $('#create').on('click', qr_create);
  $("#input").on('change keyup paste', qr_create);
});