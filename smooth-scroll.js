/**
 * Smooth Scroll - Script para navegação suave entre seções
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando smooth-scroll.js');
    
    // Habilitar rolagem suave nativamente
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Seleciona todos os links que começam com # (links internos)
    const links = document.querySelectorAll('a[href^="#"]');
    
    // Adiciona evento de clique para cada link
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Previne o comportamento padrão
            e.preventDefault();
            
            console.log('Link interno clicado:', this.getAttribute('href'));
            
            // Obtém o alvo do link
            const targetId = this.getAttribute('href');
            
            // Se o ID existe no documento
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    console.log('Elemento alvo encontrado:', targetId);
                    
                    // Obter a altura do header para compensar
                    const headerHeight = document.querySelector('header').offsetHeight;
                    console.log('Altura do header:', headerHeight);
                    
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    console.log('Posição alvo:', targetPosition);
                    
                    // Verificar se o navegador suporta scrollBehavior
                    if ('scrollBehavior' in document.documentElement.style) {
                        // Método nativo de smooth scroll
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        console.log('Usando scrollBehavior nativo');
                    } else {
                        // Fallback para navegadores que não suportam scrollBehavior
                        smoothScrollTo(targetPosition);
                        console.log('Usando fallback para smooth scroll');
                    }
                } else {
                    console.warn('Elemento alvo não encontrado:', targetId);
                }
            }
        });
    });
    
    // Função de fallback para smooth scroll
    function smoothScrollTo(targetPosition) {
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
    
    console.log('smooth-scroll.js inicializado com sucesso');
}); 