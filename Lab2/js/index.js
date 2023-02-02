let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevButton = document.querySelector('#prev');
const nextButton = document.querySelector('#next');
const startStop  = document.querySelector('#startStop');

prevButton.addEventListener('click', () => { 
  goToSlide(currentSlide - 1);
});

nextButton.addEventListener('click', () => {
  goToSlide(currentSlide + 1);
});

function goToSlide(n) {
  slides[currentSlide].style.left = '100%';
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].style.left = '0';
}

