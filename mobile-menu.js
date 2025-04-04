// Script exclusivo para o menu mobile
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando menu mobile...');

    // Elementos do menu
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    if (menuToggle && navLinks) {
        console.log('Menu mobile: elementos encontrados');
        
        // Ativar/desativar menu ao clicar no botão
        menuToggle.addEventListener('click', function(e) {
            console.log('Botão do menu clicado');
            e.preventDefault(); // Prevenir comportamento padrão
            e.stopPropagation(); // Evitar propagação do clique
            
            // Toggle das classes
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            
            // Controlar overflow do body
            if (navLinks.classList.contains('active')) {
                body.style.overflow = 'hidden';
            } else {
                body.style.overflow = '';
            }
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Fechar menu ao clicar fora (com verificação adicional para cookie-consent)
        document.addEventListener('click', (e) => {
            const cookieContainer = document.querySelector('.cookie-consent-container');
            const cookieOverlay = document.getElementById('cookie-consent-overlay');
            
            // Verificar se o clique foi dentro do cookie consent
            const isClickInCookieConsent = cookieContainer && cookieContainer.contains(e.target);
            const isClickInCookieButton = e.target.id === 'cookie-accept-all';
            
            // Não fechar o menu se o clique foi no cookie consent
            if (isClickInCookieConsent || isClickInCookieButton) {
                return;
            }
            
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            }
        });
    } else {
        console.error('ERRO: Elementos do menu mobile não encontrados!');
    }
}); 