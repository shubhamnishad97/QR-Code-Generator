
$(function() {
    $("#version_span").text(chrome.app.getDetails().version);
        var config_obj = JSON.parse(localStorage.getItem('config')) || {};
		var fore_bg = config_obj.fore_bg || '#000000';
		var back_bg = config_obj.back_bg || '#ffffff';
		var size = config_obj.size;
		var is_transparnet_bg = config_obj.is_transparnet_bg;

    $('#cp1').colorpicker('setValue', fore_bg);
    $('#cp2').colorpicker('setValue', back_bg);
    $('#img-size').val(size);
    $('#transbg').prop('checked', is_transparnet_bg);
    if (is_transparnet_bg) {
      	$("#cp2").colorpicker('disable');
    	} else {
      	$("#cp2").colorpicker('enable');
    	}
    $('#transbg').change(function(){
    	var is_transparnet_bg = $('#transbg').prop('checked');
    	if (is_transparnet_bg) {
      	  $("#cp2").colorpicker('disable');
    	} else {
      	  $("#cp2").colorpicker('enable');
    	}
    });
    $('#show-form').click(function(){
    	$(this).hide();
    	$('iframe').show();
    })
    $('#save').click(function(){
    	var fore_bg = $("#cp1").colorpicker('getValue');
    	var back_bg = $("#cp2").colorpicker('getValue');
    	var size = $('#img-size').val();
    	if(isNaN(size)) size = 0;
    	size = Math.max(20, size);
    	size = Math.min(5000, size);
    	var is_transparnet_bg = $('#transbg').prop('checked');
    	var obj = {};
    	obj.fore_bg = fore_bg;
    	obj.back_bg = back_bg;
    	obj.size = size;
    	obj.is_transparnet_bg = is_transparnet_bg;
    	var config_str = (JSON.stringify(obj));
    	localStorage.setItem('config', config_str);
    	$('.saved_bubble').remove();
    	$('#save').after('<span class="saved_bubble">Saved!</span>');
    	$('.saved_bubble').show();
    	$('.saved_bubble').fadeOut('slow');
    })

    if(window.location.hash.includes('pop')){
      $('#back-form').show();
      $('body').addClass('body-pop');
    } else {
      $('#show-form').show();
    }

});

