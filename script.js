// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		e.preventDefault();
		const target = document.querySelector(this.getAttribute('href'));
		if (target) {
			target.scrollIntoView({
				behavior: 'smooth'
			});
		}
	});
});

// Scroll animation for elements
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
			observer.unobserve(entry.target);
		}
	});
}, observerOptions);

// Observe service cards and feature items
document.querySelectorAll('.service-card, .feature-item, .pricing-card').forEach(el => {
	el.style.opacity = '0';
	observer.observe(el);
});

// Add fade out animation
const style = document.createElement('style');
style.textContent = `
	@keyframes fadeOut {
		from {
			opacity: 1;
			transform: translateY(0);
		}
		to {
			opacity: 0;
			transform: translateY(-10px);
		}
	}
`;
document.head.appendChild(style);

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
	const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	
	if (scrollTop > 100) {
		navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
	} else {
		navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
	}
	
	lastScrollTop = scrollTop;
});

// Active nav link highlighting
window.addEventListener('scroll', () => {
	const sections = document.querySelectorAll('section');
	const navLinks = document.querySelectorAll('.nav-link');
	
	let current = '';
	sections.forEach(section => {
		const sectionTop = section.offsetTop;
		if (pageYOffset >= sectionTop - 200) {
			current = section.getAttribute('id');
		}
	});
	
	navLinks.forEach(link => {
		link.classList.remove('active');
		if (link.getAttribute('href') === '#' + current) {
			link.style.color = 'var(--primary-color)';
			link.style.fontWeight = '600';
		} else {
			link.style.color = 'var(--text-dark)';
			link.style.fontWeight = '500';
		}
	});
});
