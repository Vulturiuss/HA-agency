// Navigation mobile
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-links li');

// Toggle navigation
burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    
    // Animation des liens
    navLinks.forEach((link, index) => {
        if (link.style.animation) {
            link.style.animation = '';
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
        }
    });
    
    // Animation du burger
    burger.classList.toggle('toggle');
});

// Fermer le menu en cliquant sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
        
        navLinks.forEach(link => {
            link.style.animation = '';
        });
    });
});

// Header sticky avec changement au scroll
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop) {
        // Scroll vers le bas
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scroll vers le haut
        header.style.transform = 'translateY(0)';
    }
    
    // Ajouter une classe si on a scrollé
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// Formulaire de contact
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Récupération des données du formulaire
        const formData = new FormData(this);
        const formObject = {};
        
        formData.forEach((value, key) => {
            formObject[key] = value;
        });
        
        // Exemple avec Formspree - À configurer avec votre ID Formspree
        fetch('https://formspree.io/f/xgvkvqlp', {
            method: 'POST',
            body: JSON.stringify(formObject),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Message envoyé avec succès!');
                contactForm.reset();
            } else {
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur est survenue. Veuillez réessayer.');
        });
    });
}

// Animation au scroll
// Effet machine à écrire pour le mot BUSINESS
function typeWriter(element, text, speed, delay) {
    let i = 0;
    setTimeout(function() {
        const typing = setInterval(function() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, speed);
    }, delay);
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialiser l'effet machine à écrire
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        typeWriter(typewriterElement, 'BUSINESS', 150, 500);
    }
    
    // Initialisation du carrousel de vidéos
    initVideoCarousel();
    
    // Fonction pour initialiser le carrousel de vidéos
    function initVideoCarousel() {
        const carousel = document.getElementById('videoCarousel');
        if (!carousel) return;
        
        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = document.getElementById('carouselDots');
        const prevBtn = document.getElementById('prevSlide');
        const nextBtn = document.getElementById('nextSlide');
        
        let currentSlide = 0;
        let slideInterval;
        const intervalTime = 10000; // 10 secondes entre chaque transition
        
        // Créer les points de navigation
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        
        // Afficher le premier slide
        function showSlides() {
            slides.forEach(slide => {
                slide.classList.remove('active');
                // Pause toutes les vidéos sauf celle active
                const video = slide.querySelector('video');
                if (video) {
                    video.pause();
                }
            });
            
            dots.forEach(dot => {
                dot.classList.remove('active');
            });
            
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            
            // Lecture de la vidéo active
            const activeVideo = slides[currentSlide].querySelector('video');
            if (activeVideo) {
                activeVideo.currentTime = 0;
                activeVideo.play();
            }
        }
        
        // Navigation vers un slide spécifique
        function goToSlide(index) {
            currentSlide = index;
            showSlides();
        }
        
        // Navigation vers le slide suivant
        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlides();
        }
        
        // Navigation vers le slide précédent
        function prevSlide() {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlides();
        }
        
        // Réinitialiser l'intervalle
        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, intervalTime);
        }
        
        // Événements de navigation
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        
        // Démarrer le carrousel
        showSlides();
        slideInterval = setInterval(nextSlide, intervalTime);
        
        // Mettre en pause le défilement automatique lors du survol
        carousel.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        carousel.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, intervalTime);
        });
    }
    
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Éléments à animer
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .about-content, .contact-content');
    
    // Fonction pour animer les éléments visibles
    function checkForVisibility() {
        animateElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('animate');
            }
        });
    }
    
    // Vérifier au chargement et au scroll
    window.addEventListener('load', checkForVisibility);
    window.addEventListener('scroll', checkForVisibility);
});
