//* Smooth scroll
(function () {
	const smoothLinks = document.querySelectorAll('a[href^="#"]');

	smoothLinks.forEach((link) => {
		link.addEventListener('click', function (e) {
			e.preventDefault();

			const id = link.getAttribute('href');

			document.querySelector(id).scrollIntoView({
				behavior: 'smooth',
				block: 'start',
			});
		});
	});
})();
