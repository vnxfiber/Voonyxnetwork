// Início do script.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script principal inicializado');
    
    // Nota: O código do menu mobile foi movido para mobile-menu.js
    // Não manipular o menu mobile aqui para evitar conflitos
    
    // Configurar rolagem suave para toda a página
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Adicionar rolagem suave para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            // Se já está sendo tratado em mobile-menu.js, não duplicar
            if (window.innerWidth <= 768) return;
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                if ('scrollBehavior' in document.documentElement.style) {
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                } else {
                    // Fallback para navegadores mais antigos
                    window.scrollTo(0, targetPosition);
                }
            }
        });
    });
    
    // Calcular altura dinâmica para seções
    function ajustarAlturaSections() {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        document.documentElement.style.setProperty('--header-height', headerHeight + 'px');
    }
    
    // Ajustar altura inicialmente e a cada redimensionamento
    ajustarAlturaSections();
    window.addEventListener('resize', ajustarAlturaSections);
    
    // Sanitizar entradas de formulário
    const inputs = document.querySelectorAll('input:not([type="submit"]), textarea');
    if (inputs.length > 0) {
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                // Sanitizar entrada para evitar XSS
                this.value = this.value.replace(/<script[^>]*>.*?<\/script>/gi, '');
            });
        });
    }
    
    // Formatação automática para telefone
    const telefone = document.getElementById('telefone');
    if (telefone) {
        telefone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 10) {
                // Formato (XX) XXXXX-XXXX para celular
                e.target.value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
            } else if (value.length > 6) {
                // Formato (XX) XXXX-XXXX para fixo
                e.target.value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
            } else if (value.length > 2) {
                // Apenas DDD
                e.target.value = value.replace(/^(\d{2})(\d{0,5}).*/, '($1) $2');
            } else {
                e.target.value = value;
            }
        });
    }
    
    // Função para processar o formulário e enviar para o WhatsApp
    window.processForm = function(event) {
        event.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value;
        
        if (!nome || !telefone || !assunto || !mensagem) {
            alert('Por favor, preencha todos os campos!');
            return false;
        }
        
        // Validação simples de telefone (apenas dígitos)
        const telefoneDigitos = telefone.replace(/\D/g, '');
        if (telefoneDigitos.length < 10 || telefoneDigitos.length > 11) {
            alert('Por favor, insira um número de telefone válido!');
            return false;
        }
        
        // Formatar a mensagem para o WhatsApp
        const mensagemFormatada = 
            `*Contato via Site - VNX Fiber*\n\n` +
            `*Nome:* ${nome}\n` +
            `*Telefone:* ${telefone}\n` +
            `*Assunto:* ${assunto}\n\n` +
            `*Mensagem:*\n${mensagem}`;
        
        // Codificar a mensagem para URL
        const mensagemCodificada = encodeURIComponent(mensagemFormatada);
        
        // Abrir WhatsApp em nova aba
        window.open(`https://wa.me/5598999882215?text=${mensagemCodificada}`, '_blank');
        
        // Limpar formulário
        document.getElementById('contactForm').reset();
        
        return false;
    };
    
    // Verificar scroll para exibir/ocultar botão de voltar ao topo
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    }
    
    // Gerenciar visibilidade do header durante scroll
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    if (header) {
        window.addEventListener('scroll', function() {
            let currentScroll = window.pageYOffset || document.documentElement.scrollTop;
            
            // Mostrar sempre no topo
            if (currentScroll <= 100) {
                header.classList.remove('hide');
                return;
            }
            
            // Esconder ao scrollar para baixo, mostrar ao scrollar para cima
            if (currentScroll > lastScrollTop && currentScroll > 200) {
                // Scrollando para baixo
                header.classList.add('hide');
            } else {
                // Scrollando para cima
                header.classList.remove('hide');
            }
            
            lastScrollTop = currentScroll;
        });
    }
    
    console.log('Script principal carregado com sucesso');
}); 