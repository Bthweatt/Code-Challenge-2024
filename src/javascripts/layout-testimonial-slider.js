/* eslint-disable linebreak-style */
document.addEventListener('DOMContentLoaded', () => {
	const slides = document.querySelectorAll('.slide');
	const previousBtn = document.querySelector('.previous');
	const nextBtn = document.querySelector('.next');
	let currentSlideIndex = 0;

	function showSlide(index) {
		slides.forEach((slide, i) => {
			if (i === index) {
				slide.classList.add('active');
			} else {
				slide.classList.remove('active');
			}
		});
	}

	function goToPreviousSlide() {
		currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
		showSlide(currentSlideIndex);
	}

	function goToNextSlide() {
		currentSlideIndex = (currentSlideIndex + 1) % slides.length;
		showSlide(currentSlideIndex);
	}previousBtn.addEventListener('click', goToPreviousSlide);
	nextBtn.addEventListener('click', goToNextSlide);
});
