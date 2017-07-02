var QR_SIZE = 300;
var fore_bg;
var back_bg;
var img_size;
var is_transparnet_bg;

$(function () {
  var config_obj = JSON.parse(localStorage.getItem('config')) || {};
  fore_bg = config_obj.fore_bg || '#000000';
  back_bg = config_obj.back_bg || '#ffffff';
  img_size = config_obj.size;
  is_transparnet_bg = config_obj.is_transparnet_bg;
  
  setTimeout(function(){
    $('#qrcode-href').css('visibility', 'visible').focus().select();
  },99);


  chrome.tabs.query({active:true, currentWindow:true}, updateContentByTabs);
  $("#qrcode-regenerate").click(renderQRHandler);
  $('#version').text(chrome.app.getDetails().version);
  $('#credit_get').click(function(){
    trackContent('credit:get_this');
  })
  $('#credit_support').click(function(){
    trackContent('credit:support');
  })
  // Not firing when paste by mouse.
  $('#qrcode-href').on('keydown', function(){
    renderQRHandler();
  })
  $('#qrcode-href').on('keyup', function(e){
    renderQRHandler();
    //---      if(e.keyCode == 13){
    //---        var currentText = $('#qrcode-href').val();
    //---        $('#qrcode-href').replaceWith('<textarea id="qrcode-href"></textarea>');
    //---        $('#qrcode-href').val(currentText);
    //---        //$('#qrcode-href').remove();
    //---      }
  })

});
// Button press handler
function renderQRHandler(){
  var href = $("#qrcode-href").val();
  var $qrcode_img = $('#qrcode-img');
  $qrcode_img.html('');
  renderQR($qrcode_img, QR_SIZE, href);
  updateImgHref();
  trackContent('click:'+href);
}
function updateContentByTabs(tabs) {
    var href = tabs[0].url;
    var title = tabs[0].title;
    var $qrcode_img = $('#qrcode-img');
    setTimeout(function() {
      $qrcode_img.html('');
      renderQR($qrcode_img, QR_SIZE, href);
      updateImgHref();
    }, 70);
    $('#qrcode-href').val(href);
    trackContent('init:'+href);
}
function renderQR($el, the_size, the_text){
  var quiet = '0';
  if(back_bg != '#ffffff') {
    quiet = '1';
  }
  console.log(is_transparnet_bg);
  if (is_transparnet_bg) {
    back_bg = null;
  }
  $el.qrcode(qrObjectBuilder(the_size, fore_bg, the_text, back_bg,quiet));
  $('#qrcode-img-buffer').empty().qrcode(qrObjectBuilder(the_size, fore_bg, the_text, back_bg,0));
}
function qrObjectBuilder(s,f,t,b,q){
  //ecLevel: 'L',
  var o = {
    'render':'canvas',
    size:s,
    fill:f,
    text:t,
    background:b,
    'quiet':q
  }
  //'L', 'M', 'Q' or 'H'
  o.ecLevel = 'L';
  return o;
}
function updateImgHref() {
  var link = $("#export")[0];
  link.download = 'exported_qrcode_image.png';/// set a filename or a default
  link.href = $('#qrcode-img-buffer > canvas')[0].toDataURL();
}

// Tracker
function trackContent(c) {
  chrome.extension.sendMessage({pop: c}, function(response) {
  });
}