$(document).ready(function () {

	// прятать кнопку "на верх" если первая секция при загрузке страницы не пролистана
	if($(window).scrollTop() >= ($(window).height()-$('.wr-header').outerHeight())) {
		$('.to-top').show();
	}

	// скроллинг страницы по клику
	$('.js-scrollButton').click(function() {
		var scrollToElem = $(this).attr('href'),
			headerHeight = $('.wr-header').outerHeight();
		$('.js-moving').addClass('active');
		$('html, body').animate({
			scrollTop: $(scrollToElem).offset().top - headerHeight
		}, 1000);
		setTimeout(function(){
			$('.js-moving').removeClass('active');
		}, 1000);
		return false;
	});
});

$(window).scroll(function(){
	// набор переменных
	var pageHeight = $('body').height(),
		pageOffset = $(window).scrollTop(),
		windowH = $(window).height(),
		headerH = $('.js-headerBg').outerHeight();

	// переключение первой и последней секции
	if(pageOffset >= pageHeight/2) {
		$('.wr-intro').css('z-index','1');
		$('.wr-epidemic, .wr-footer').css('z-index','2');
	} else {
		$('.wr-intro').css('z-index','2');
		$('.wr-epidemic, .wr-footer').css('z-index','1');
	}

	// изменение бэкграунда у хедера при скроллинге
	if(pageOffset <= windowH-headerH) {
		$('.js-headerBg').css('background', 'rgba(255,68,68,' + (pageOffset)/(windowH-headerH) + ')');
	} else {
		$('.js-headerBg').css('background', 'rgba(255,68,68,1)');
	}
	
	// параллакс эффекты плюсиков первой секции, медикоментов, рук, текста первой секции
	$('.js-parallax-bottom').css('transform', 'translateX(-' + pageOffset*1.5 + 'px)');
	$('.js-parallax-top-fixed').css('transform', 'translateX(' + pageOffset*1.5 + 'px)');
	$('.js-parallax-scale').css('transform', 'translate(-50%, -50%) scale(' + (1-pageOffset/750) + ')');

	$('.js-parallax-hands li').each(function() {
		var coeff = $(this).data('coeff');
		$(this).css('transform', 'translate(' + (3*Math.sin(coeff*2*pageOffset*10*Math.PI/180)/3) + '%,' + (coeff*(pageHeight-pageOffset-windowH)/5) + 'px)');
	});

	// параллакс плюсиков вверху секций (кроме первой)
	$('.js-parallax-top').each(function() {
		var coeff = pageOffset - $(this).offset().top + windowH;
		if(coeff >= 0) {
			$(this).css('transform', 'translateX(' + coeff*1.5 + 'px)');
		}
	});

	// прятать и показывать кнопку "на верх"
	if(pageOffset < (windowH-headerH)) {
		$('.to-top').fadeOut();
	} else {
		$('.to-top').fadeIn();
	}

});

$(window).load(function() {
	$('body').removeClass('onload');
	$('.preloader').fadeOut();
});