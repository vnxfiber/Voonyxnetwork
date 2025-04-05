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
                // Garantir que os itens fiquem visíveis
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateX(0)';
                }, 100);
            });
        } else {
            body.style.overflow = '';
            console.log('Menu fechado');
        }
    }
    
    // Adicionar evento de clique ao botão do menu
    menuToggle.addEventListener('click', toggleMenu);
    
    // Ajustar botão Central do Assinante no menu mobile
    function adjustCentralButton() {
        const centralItem = document.querySelector('.nav-links li:nth-child(5)');
        if (centralItem && window.innerWidth <= 768) {
            centralItem.style.display = 'flex';
            centralItem.style.justifyContent = 'center';
            centralItem.style.width = '100%';
            
            const centralBtn = centralItem.querySelector('.central-assinante');
            if (centralBtn) {
                centralBtn.style.margin = '0.8rem auto';
                centralBtn.style.textAlign = 'center';
                centralBtn.style.display = 'flex';
                centralBtn.style.justifyContent = 'center';
            }
        }
    }
    
    // Chamar a função inicial e em cada redimensionamento
    adjustCentralButton();
    window.addEventListener('resize', adjustCentralButton);
    
    // Fechar o menu quando um link é clicado
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Verificar se é um link interno
            const href = this.getAttribute('href');
            
            // Sempre fechar o menu quando qualquer link for clicado na versão mobile
            if (window.innerWidth <= 1024) {
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
            }
        });
    });
    
    // Fechar o menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        // Verificar se o menu está aberto
        if (!navLinks.classList.contains('active')) return;
        
        // Se o clique não foi no menu nem no botão de toggle
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
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