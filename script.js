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
            // Remover todos os caracteres não numéricos
            let value = e.target.value.replace(/\D/g, '');
            
            // Limitar a 11 dígitos (DDD + 9 dígitos para celular)
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            // Manter apenas os dígitos, sem formatação
            e.target.value = value;
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
    
    // Reposicionar o botão Central do Assinante após o item Contato no menu mobile
    const navLinks = document.querySelector('.nav-links');
    const menuItems = navLinks.querySelectorAll('li');
    
    if (menuItems.length >= 5) {
        const contatoItem = menuItems[3]; // Item Contato (4º item, índice 3)
        const centralItem = menuItems[4]; // Item Central do Assinante (5º item, índice 4)
        
        // Garantir que o item Central do Assinante venha logo após o Contato
        if (contatoItem && centralItem) {
            contatoItem.after(centralItem);
            
            // Adicionar uma classe específica para melhor controle no CSS
            centralItem.classList.add('central-item');
            
            // Verificar se o menu está aberto e ajustar a visibilidade do botão
            const menuToggle = document.getElementById('mobile-menu-toggle');
            if (menuToggle) {
                menuToggle.addEventListener('click', function() {
                    // Dar um tempo para a animação do menu completar
                    setTimeout(() => {
                        // Garantir que o item da central esteja visível
                        if (navLinks.classList.contains('active')) {
                            centralItem.style.opacity = '1';
                            centralItem.style.transform = 'translateX(0)';
                        }
                    }, 300);
                });
            }
        }
    }
    
    // Garantir que o botão Central do Assinante esteja centralizado no menu mobile
    function adjustCentralButton() {
        const centralItem = document.querySelector('.nav-links li:nth-child(5)');
        if (centralItem) {
            centralItem.style.display = 'flex';
            centralItem.style.justifyContent = 'center';
            centralItem.style.width = '100%';
            
            const centralBtn = centralItem.querySelector('.central-assinante');
            if (centralBtn) {
                centralBtn.style.margin = '0 auto';
                centralBtn.style.textAlign = 'center';
            }
        }
    }
    
    // Chamar função ao abrir menu
    const menuToggle = document.getElementById('mobile-menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            setTimeout(adjustCentralButton, 100);
        });
    }
    
    // Chamar também na carga inicial
    document.addEventListener('DOMContentLoaded', function() {
        adjustCentralButton();
    });
    
    console.log('Script principal carregado com sucesso');
}); 