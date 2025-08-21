// ========================================
// GOVHUB - MAIN JAVASCRIPT FILE
// ========================================

// Função para carrossel de clientes
function moveCarousel(direction) {
    const carousel = document.querySelector('.clients-cards');
    const cardWidth = 280 + 24; // largura do card + gap
    const scrollAmount = cardWidth * direction;
    
    carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

// Função para mostrar imagens na seção interativa
function showImage(imageNumber) {
    // Esconde todas as imagens
    for (let i = 1; i <= 5; i++) {
        const img = document.getElementById(`image-${i}`);
        if (i === imageNumber) {
            img.classList.remove('image-fade-out');
            img.classList.add('image-fade-in');
        } else {
            img.classList.remove('image-fade-in');
            img.classList.add('image-fade-out');
        }
    }
}

// Função para menu mobile
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
            });
        });
    }
}

// Função para scroll suave nos links de navegação
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Ajuste para navbar fixa
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Função para navbar com scroll
function initNavbarScroll() {
    const navbar = document.querySelector('.custom-navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Função para animações de entrada
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ser animados
    const animatedElements = document.querySelectorAll('.publication-card, .client-card, .feature-item');
    animatedElements.forEach(el => observer.observe(el));
}

// Função para preload de imagens
function preloadImages() {
    const imagesToPreload = [
        './images/exemploamarelo.png',
        './images/exemploroxo.png',
        './images/exemplopreto.png',
        './images/exemplovermelho.png',
        './images/exemploazul.png',
        './images/computador.png',
        './images/book.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Função para inicializar todas as funcionalidades
function initApp() {
    // Inicializar funcionalidades quando o DOM estiver carregado
    document.addEventListener('DOMContentLoaded', function() {
        initMobileMenu();
        initSmoothScroll();
        initNavbarScroll();
        initScrollAnimations();
        preloadImages();
        
        console.log('GovHub - Aplicação inicializada com sucesso! 🚀');
    });
}

// Inicializar a aplicação
initApp();

// Exportar funções para uso global (se necessário)
window.moveCarousel = moveCarousel;
window.showImage = showImage;
