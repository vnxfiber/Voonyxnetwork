// Script exclusivo para o menu mobile
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando menu mobile...');
    
    // Selecionar elementos
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    
    if (!menuToggle || !navLinks) {
        console.error('Elementos do menu mobile não encontrados!');
        console.log('menuToggle:', menuToggle);
        console.log('navLinks:', navLinks);
        return;
    }
    
    console.log('Menu mobile: elementos encontrados');
    
    // Função para alternar o menu
    function toggleMenu() {
        console.log('Botão do menu clicado');
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
        
        // Impedir rolagem do body quando o menu está aberto
        if (navLinks.classList.contains('active')) {
            body.style.overflow = 'hidden';
            console.log('Menu aberto');
            
            // Aplicar animação aos itens do menu
            const menuItems = navLinks.querySelectorAll('li');
            menuItems.forEach((item, index) => {
                item.style.transitionDelay = (0.1 * index) + 's';
            });
        } else {
            body.style.overflow = '';
            console.log('Menu fechado');
        }
    }
    
    // Adicionar evento de clique ao botão do menu
    menuToggle.addEventListener('click', toggleMenu);
    
    // Fechar o menu quando um link é clicado
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verificar se é um link interno
            const href = this.getAttribute('href');
            
            // Sempre fechar o menu quando qualquer link for clicado na versão mobile
            if (window.innerWidth <= 768) {
                console.log('Link clicado no mobile, fechando menu');
                toggleMenu();
                
                // Se for link interno, prevenir comportamento padrão e fazer scroll suave
                if (href.startsWith('#')) {
                    e.preventDefault();
                    
                    const targetId = href;
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        // Aguardar um momento para o menu fechar e depois fazer o scroll
                        setTimeout(function() {
                            const headerHeight = document.querySelector('header').offsetHeight;
                            const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                            
                            window.scrollTo({
                                top: targetPosition,
                                behavior: 'smooth'
                            });
                        }, 300);
                    }
                }
            } else if (href.startsWith('#')) {
                // Para desktop, apenas fechar se for link interno
                console.log('Link interno clicado no desktop');
                // Não implementar rolagem suave aqui, deixar para o smooth-scroll.js
            }
        });
    });
    
    // Não implementar rolagem suave aqui, deixar para o smooth-scroll.js
    
    // Fechar o menu ao clicar fora dele (exceto no popup de cookies)
    document.addEventListener('click', function(e) {
        // Verificar se o menu está aberto
        if (!navLinks.classList.contains('active')) return;
        
        // Se o clique não foi no menu nem no botão de toggle
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            // Verificar se o clique foi no popup de cookies
            const cookieContainer = document.querySelector('.cookie-consent-container');
            const cookieButton = document.getElementById('cookie-accept-all');
            const cookieOverlay = document.getElementById('cookie-consent-overlay');
            
            // Não fechar o menu se o clique foi no popup de cookies
            if ((cookieContainer && cookieContainer.contains(e.target)) || 
                (cookieButton && cookieButton.contains(e.target)) ||
                (cookieOverlay && cookieOverlay.contains(e.target))) {
                console.log('Clique no popup de cookies, não fechando menu');
                return;
            }
            
            toggleMenu();
            console.log('Clique fora do menu, fechando menu');
        }
    });
    
    // Fechar menu com a tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            toggleMenu();
            console.log('ESC pressionado, fechando menu');
        }
    });
    
    console.log('Menu mobile inicializado com sucesso');
}); 