/**
 * Smooth Scroll - Script para navegação suave entre seções
 */
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links que começam com # (links internos)
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Adiciona evento de clique para cada link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previne o comportamento padrão
            e.preventDefault();
            
            // Obtém o alvo do link
            const targetId = this.getAttribute('href');
            
            // Se o ID existe no documento
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Verifica se o navegador suporta scrollBehavior
                    if ('scrollBehavior' in document.documentElement.style) {
                        // Método nativo de smooth scroll
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    } else {
                        // Fallback para navegadores que não suportam scrollBehavior
                        smoothScrollTo(targetElement);
                    }
                }
            }
        });
    });
    
    // Função de fallback para smooth scroll
    function smoothScrollTo(element) {
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 500; // ms
        let startTimestamp = null;
        
        function animation(timestamp) {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = timestamp - startTimestamp;
            const run = easeInOutQuad(progress, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (progress < duration) {
                window.requestAnimationFrame(animation);
            }
        }
        
        // Função de easing para animar o scroll
        function easeInOutQuad(t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        }
        
        window.requestAnimationFrame(animation);
    }
}); 