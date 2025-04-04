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
            e.stopPropagation(); // Evitar propagação do clique
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Fechar menu ao clicar em um link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                body.style.overflow = '';
            });
        });

        // Fechar menu ao clicar fora
        document.addEventListener('click', (e) => {
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