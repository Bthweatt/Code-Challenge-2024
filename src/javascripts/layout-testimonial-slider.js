document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const previousBtn = document.querySelector('.previous');
    const nextBtn = document.querySelector('.next');
    let currentSlideIndex = 0;
	let slideInterval;

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
		const activeSlide = document.querySelector('.slide.active');
		const previousSlide = activeSlide.previousElementSibling || slides[slides.length - 1];
	
		activeSlide.classList.add('transition-out-previous'); 
	
		// Listen for the transitionend event on the active slide
		activeSlide.addEventListener('transitionend', function transitionEndHandler() {
			activeSlide.classList.remove('transition-out-previous', 'active');
			previousSlide.classList.add('active'); 
			activeSlide.removeEventListener('transitionend', transitionEndHandler); 
		});
	}
	
	function goToNextSlide() {
		const activeSlide = document.querySelector('.slide.active');
		const nextSlide = activeSlide.nextElementSibling || slides[0];
	
		activeSlide.classList.add('transition-out-next'); 
	
		// Listen for the transitionend event on the active slide
		activeSlide.addEventListener('transitionend', function transitionEndHandler() {
			activeSlide.classList.remove('transition-out-next', 'active');
			nextSlide.classList.add('active'); // Set the next slide as active after the animation completes
			activeSlide.removeEventListener('transitionend', transitionEndHandler); // Remove the event listener to avoid memory leaks
		});
	}
	function startSlideInterval() {
        slideInterval = setInterval(goToNextSlide, 5000); // Change slide every 5 seconds
    }

    // Function to stop the auto-switching timer
    function stopSlideInterval() {
        clearInterval(slideInterval);
    }

    // Event listener for previous button click
    previousBtn.addEventListener('click', () => {
        stopSlideInterval(); // Stop the auto-switching timer when manually changing slides
        goToPreviousSlide();
    });

    // Event listener for next button click
    nextBtn.addEventListener('click', () => {
        stopSlideInterval(); // Stop the auto-switching timer when manually changing slides
        goToNextSlide();
    });

    // Start the auto-switching timer when the page loads
    startSlideInterval();
	
	

    previousBtn.addEventListener('click', goToPreviousSlide);
    nextBtn.addEventListener('click', goToNextSlide);

    // Show the initial slide
    showSlide(currentSlideIndex);
});

