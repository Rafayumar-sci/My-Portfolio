// ==================== AOS INITIALIZATION ====================

AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100,
});

// ==================== SMOOTH SCROLL ====================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==================== CAROUSEL FUNCTIONALITY ====================

class Carousel {
    constructor(containerSelector, prevSelector, nextSelector, dotSelector, slideSelector) {
        this.container = document.querySelector(containerSelector);
        this.prevBtn = this.container?.querySelector(prevSelector);
        this.nextBtn = this.container?.querySelector(nextSelector);
        this.dots = this.container?.querySelectorAll(dotSelector);
        this.slides = this.container?.querySelectorAll(slideSelector);
        this.currentIndex = 0;
        this.autoplayInterval = null;

        if (this.slides && this.slides.length > 0) {
            this.init();
        }
    }

    init() {
        this.prevBtn?.addEventListener('click', () => this.prevSlide());
        this.nextBtn?.addEventListener('click', () => this.nextSlide());
        this.dots?.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        this.startAutoplay();
        this.container?.addEventListener('mouseenter', () => this.stopAutoplay());
        this.container?.addEventListener('mouseleave', () => this.startAutoplay());
    }

    showSlide(index) {
        if (!this.slides || this.slides.length === 0) return;

        // Wrap index
        if (index >= this.slides.length) {
            this.currentIndex = 0;
        } else if (index < 0) {
            this.currentIndex = this.slides.length - 1;
        } else {
            this.currentIndex = index;
        }

        // Hide all slides
        this.slides.forEach(slide => {
            slide.classList.remove('active');
            slide.style.opacity = '0';
        });

        // Show current slide
        this.slides[this.currentIndex].classList.add('active');
        this.slides[this.currentIndex].style.opacity = '1';

        // Update dots
        this.dots?.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
                dot.style.width = '8px';
            } else {
                dot.classList.remove('active');
                dot.style.width = '6px';
            }
        });
    }

    nextSlide() {
        this.showSlide(this.currentIndex + 1);
        this.resetAutoplay();
    }

    prevSlide() {
        this.showSlide(this.currentIndex - 1);
        this.resetAutoplay();
    }

    goToSlide(index) {
        this.showSlide(index);
        this.resetAutoplay();
    }

    startAutoplay() {
        this.autoplayInterval = setInterval(() => {
            this.showSlide(this.currentIndex + 1);
        }, 5000); // Change slide every 5 seconds
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
        }
    }

    resetAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }
}

// Initialize carousels
document.addEventListener('DOMContentLoaded', () => {
    // About section carousel
    const aboutCarousel = new Carousel(
        '.carousel-container',
        '.carousel-prev',
        '.carousel-next',
        '.carousel-dot',
        '.carousel-slide'
    );

    // Achievements section carousel
    const achievementsCarousel = new Carousel(
        '.achievements-carousel-container',
        '.achievements-carousel-prev',
        '.achievements-carousel-next',
        '.achievements-carousel-dot',
        '.achievements-carousel-slide'
    );

    // Initialize first slides
    if (aboutCarousel.slides && aboutCarousel.slides.length > 0) {
        aboutCarousel.showSlide(0);
    }
    if (achievementsCarousel.slides && achievementsCarousel.slides.length > 0) {
        achievementsCarousel.showSlide(0);
    }
});

// ==================== ACTIVE NAV LINK ====================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 300) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('text-blue-400');
        link.classList.add('text-gray-300');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.remove('text-gray-300');
            link.classList.add('text-blue-400');
        }
    });
});

// ==================== GITHUB REPOS FETCHER ====================

// MUST UPDATE: Change this to your actual GitHub username!
const githubUsername = 'Rafayumar-sci';

async function fetchGitHubRepos() {
    try {
        // Fetch public repos, sorted by recently updated, limited to 3 (for optional use)
        const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=3`);

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const repos = await response.json();
        console.log('GitHub repos fetched:', repos);

        // Log them for reference - can be used to populate the static cards if needed
        repos.forEach((repo, index) => {
            console.log(`Repo ${index + 1}: ${repo.name} - ${repo.html_url}`);
        });

    } catch (error) {
        console.error('Error fetching repos:', error);
    }
}

// Uncomment to fetch and display in console
// fetchGitHubRepos();

// ==================== PAGE LOAD ANIMATION ====================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Trigger AOS animations on page load
window.addEventListener('load', () => {
    AOS.refresh();
});
