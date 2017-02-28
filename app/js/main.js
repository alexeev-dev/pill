$(document).ready(function () {

});

$(window).scroll(function(){
	var pageHeight = $('body').height(),
		pageOffset = $(window).scrollTop(),
		windowH = $(window).height(),
		headerH = $('.js-headerBg').outerHeight();

	if(pageOffset >= pageHeight/2) {
		$('.wr-intro').css('z-index','1');
		$('.wr-epidemic, .wr-footer').css('z-index','2');
	} else {
		$('.wr-intro').css('z-index','2');
		$('.wr-epidemic, .wr-footer').css('z-index','1');
	}
	if(pageOffset <= windowH-headerH) {
		$('.js-headerBg').css('background', 'rgba(255,68,68,' + (pageOffset)/(windowH-headerH) + ')');
	} else {
		$('.js-headerBg').css('background', 'rgba(255,68,68,1)');
	}
	
	$('.js-parallax-bottom').css('transform', 'translateX(-' + pageOffset*1.5 + 'px)');
	$('.js-parallax-top-fixed').css('transform', 'translateX(' + pageOffset*1.5 + 'px)');
	$('.js-parallax-scale').css('transform', 'translate(-50%, -50%) scale(' + (1-pageOffset/750) + ')');
	$('.js-parallax-hands').css('transform', 'translate(-50%,' + ((pageHeight-pageOffset-windowH)/3) + 'px)');

	$('.js-parallax-top').each(function() {
		var coeff = pageOffset - $(this).offset().top + windowH;
		if(coeff >= 0) {
			$(this).css('transform', 'translateX(' + coeff*1.5 + 'px)');
		}
		// console.log(coeff);
	});

});