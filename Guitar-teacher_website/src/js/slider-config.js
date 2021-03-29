/**
 * Tiny Slider 2: https://github.com/ganlanyuan/tiny-slider
 */
(function () {
	//* slider for reviews section
	const reviewsSlider = tns({
		container: '.reviews__slider',
		items: 3,
		slideBy: 'page',
		controls: false,
		nav: false,
		mouseDrag: true,
		swipeAngle: false,
	});

	document.querySelector('.reviews__slider-prev').addEventListener('click', function () {
		reviewsSlider.goTo('prev');
	});

	document.querySelector('.reviews__slider-next').addEventListener('click', function () {
		reviewsSlider.goTo('next');
	});

	//* slider for about-us section
	const aboutUsSlider = tns({
		container: '.about-us__slider',
		items: 4,
		slideBy: 'page',
		mouseDrag: true,
		swipeAngle: false,
		controls: false,
		navPosition: 'bottom',
	});

	document.querySelector('.about-us__slider-next').addEventListener('click', function () {
		aboutUsSlider.goTo('next');
	});
})();
