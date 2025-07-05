// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

// Mobile Navigation Toggle
navToggle.addEventListener('click', () => {
	navMenu.classList.toggle('active');
	navToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
	link.addEventListener('click', () => {
		navMenu.classList.remove('active');
		navToggle.classList.remove('active');
	});
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
	if (window.scrollY > 100) {
		navbar.style.background = 'rgba(10, 10, 10, 0.98)';
		navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
	} else {
		navbar.style.background = 'rgba(10, 10, 10, 0.95)';
		navbar.style.boxShadow = 'none';
	}
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
	link.addEventListener('click', (e) => {
		e.preventDefault();
		
		const targetId = link.getAttribute('href');
		const targetSection = document.querySelector(targetId);
		
		if (targetSection) {
			const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
			
			window.scrollTo({
				top: offsetTop,
				behavior: 'smooth'
			});
		}
	});
});

// Intersection Observer for scroll animations
const observerOptions = {
	threshold: 0.1,
	rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
	entries.forEach(entry => {
		if (entry.isIntersecting) {
			entry.target.classList.add('visible');
		}
	});
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
	const fadeElements = document.querySelectorAll('.about-content, .features-grid, .gallery-grid, .contact-content');
	
	fadeElements.forEach(element => {
		element.classList.add('fade-in');
		observer.observe(element);
	});
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
	const scrolled = window.pageYOffset;
	const heroBackground = document.querySelector('.hero-background');
	
	if (heroBackground) {
		const rate = scrolled * -0.5;
		heroBackground.style.transform = `translateY(${rate}px)`;
	}
});

// Button click effects
document.addEventListener('DOMContentLoaded', () => {
	const buttons = document.querySelectorAll('.btn');
	
	buttons.forEach(button => {
		button.addEventListener('click', function(e) {
			// Create ripple effect
			const ripple = document.createElement('span');
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;
			
			ripple.style.width = ripple.style.height = size + 'px';
			ripple.style.left = x + 'px';
			ripple.style.top = y + 'px';
			ripple.classList.add('ripple');
			
			this.appendChild(ripple);
			
			setTimeout(() => {
				ripple.remove();
			}, 600);
		});
	});
});

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
	const contactForm = document.querySelector('.contact-form form');
	
	if (contactForm) {
		contactForm.addEventListener('submit', (e) => {
			e.preventDefault();
			
			// Get form data
			const formData = new FormData(contactForm);
			const email = contactForm.querySelector('input[type="email"]').value;
			const message = contactForm.querySelector('textarea').value;
			
			// Simple validation
			if (!email || !message) {
				showNotification('Please fill in all fields', 'error');
				return;
			}
			
			if (!isValidEmail(email)) {
				showNotification('Please enter a valid email address', 'error');
				return;
			}
			
			// Simulate form submission
			showNotification('Message sent successfully!', 'success');
			contactForm.reset();
		});
	}
});

// Email validation
function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
	// Remove existing notifications
	const existingNotification = document.querySelector('.notification');
	if (existingNotification) {
		existingNotification.remove();
	}
	
	// Create notification element
	const notification = document.createElement('div');
	notification.className = `notification notification-${type}`;
	notification.innerHTML = `
		<div class="notification-content">
			<span class="notification-message">${message}</span>
			<button class="notification-close">&times;</button>
		</div>
	`;
	
	// Add styles
	notification.style.cssText = `
		position: fixed;
		top: 100px;
		right: 20px;
		background: ${type === 'success' ? '#00d4ff' : type === 'error' ? '#ff4444' : '#333'};
		color: white;
		padding: 15px 20px;
		border-radius: 5px;
		box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
		z-index: 10000;
		transform: translateX(100%);
		transition: transform 0.3s ease;
		max-width: 300px;
	`;
	
	// Add to page
	document.body.appendChild(notification);
	
	// Animate in
	setTimeout(() => {
		notification.style.transform = 'translateX(0)';
	}, 100);
	
	// Close button functionality
	const closeBtn = notification.querySelector('.notification-close');
	closeBtn.addEventListener('click', () => {
		notification.style.transform = 'translateX(100%)';
		setTimeout(() => {
			notification.remove();
		}, 300);
	});
	
	// Auto remove after 5 seconds
	setTimeout(() => {
		if (notification.parentNode) {
			notification.style.transform = 'translateX(100%)';
			setTimeout(() => {
				notification.remove();
			}, 300);
		}
	}, 5000);
}

// Add ripple effect styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
	.btn {
		position: relative;
		overflow: hidden;
	}
	
	.ripple {
		position: absolute;
		border-radius: 50%;
		background: rgba(255, 255, 255, 0.3);
		transform: scale(0);
		animation: ripple-animation 0.6s linear;
		pointer-events: none;
	}
	
	@keyframes ripple-animation {
		to {
			transform: scale(4);
			opacity: 0;
		}
	}
`;
document.head.appendChild(rippleStyles);

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
	let inThrottle;
	return function() {
		const args = arguments;
		const context = this;
		if (!inThrottle) {
			func.apply(context, args);
			inThrottle = true;
			setTimeout(() => inThrottle = false, limit);
		}
	}
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
	// Navbar background effect
	if (window.scrollY > 100) {
		navbar.style.background = 'rgba(10, 10, 10, 0.98)';
		navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
	} else {
		navbar.style.background = 'rgba(10, 10, 10, 0.95)';
		navbar.style.boxShadow = 'none';
	}
	
	// Parallax effect
	const scrolled = window.pageYOffset;
	const heroBackground = document.querySelector('.hero-background');
	
	if (heroBackground) {
		const rate = scrolled * -0.5;
		heroBackground.style.transform = `translateY(${rate}px)`;
	}
}, 16)); // ~60fps

// Add loading animation
window.addEventListener('load', () => {
	document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
	body:not(.loaded) {
		overflow: hidden;
	}
	
	body:not(.loaded)::before {
		content: '';
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--primary-bg);
		z-index: 9999;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	body:not(.loaded)::after {
		content: 'PROJECTEY';
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: var(--font-display);
		font-size: 2rem;
		color: var(--accent-blue);
		z-index: 10000;
		animation: pulse 1.5s infinite;
	}
	
	@keyframes pulse {
		0%, 100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}
`;
document.head.appendChild(loadingStyles); 