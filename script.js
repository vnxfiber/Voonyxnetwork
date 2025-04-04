// Menu mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const body = document.body;

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        body.style.overflow = '';
    });
});

// Fechar menu ao clicar fora
document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('active') && 
        !navLinks.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
        body.style.overflow = '';
    }
});

// Smooth scroll para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animação de scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.beneficio-card, .plano-card, .sobre-content, .contato-form').forEach(element => {
    observer.observe(element);
});

// Formulário de contato
const contactForm = document.querySelector('.contato-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Simulação de envio
        setTimeout(() => {
            submitButton.textContent = 'Mensagem Enviada!';
            submitButton.style.backgroundColor = 'var(--success-color)';
            contactForm.reset();
            
            setTimeout(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                submitButton.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
}

// Formulário de cobertura
const coberturaForm = document.querySelector('.cobertura-form');
if (coberturaForm) {
    coberturaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const cepInput = coberturaForm.querySelector('input');
        const checkButton = coberturaForm.querySelector('.check-button');
        const originalText = checkButton.textContent;
        
        if (cepInput.value.length < 8) {
            alert('Por favor, digite um CEP válido');
            return;
        }
        
        checkButton.textContent = 'Verificando...';
        checkButton.disabled = true;
        
        // Simulação de verificação
        setTimeout(() => {
            checkButton.textContent = 'Disponível!';
            checkButton.style.backgroundColor = 'var(--success-color)';
            
            setTimeout(() => {
                checkButton.textContent = originalText;
                checkButton.disabled = false;
                checkButton.style.backgroundColor = '';
                cepInput.value = '';
            }, 3000);
        }, 1500);
    });
}

// Header scroll effect - Nova implementação para ocultar totalmente o menu quando rolar para baixo
const header = document.querySelector('header');
let lastScroll = 0;
const scrollThreshold = 80; // Altura do header

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    if (currentScroll <= 0) {
        // No topo da página - mostrar o menu
        header.classList.remove('hide');
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
        // Scroll para baixo e não está no topo - esconder o menu
        header.classList.add('hide');
    } else {
        // Scroll para cima - mostrar o menu
        header.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});

// Adicionar classe de visibilidade para elementos com animação
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.plano-card, .valor-item, .contato-form').forEach(element => {
        element.classList.add('visible');
    });
});

// Verificação e inicialização do FAQ
document.addEventListener('DOMContentLoaded', function() {
    console.log('Verificando componentes do FAQ...');
    
    // Verificar os itens do FAQ
    const faqItems = document.querySelectorAll('.faq-item');
    if (faqItems.length > 0) {
        console.log(`FAQ encontrado: ${faqItems.length} itens de pergunta.`);
    } else {
        console.log('Nenhum item FAQ encontrado na página.');
    }
    
    // Verificar as perguntas do FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    if (faqQuestions.length > 0) {
        console.log(`Perguntas FAQ encontradas: ${faqQuestions.length} perguntas.`);
    } else {
        console.log('Nenhuma pergunta FAQ encontrada na página.');
    }
    
    // Verificar as respostas do FAQ
    const faqAnswers = document.querySelectorAll('.faq-answer');
    if (faqAnswers.length > 0) {
        console.log(`Respostas FAQ encontradas: ${faqAnswers.length} respostas.`);
    } else {
        console.log('Nenhuma resposta FAQ encontrada na página.');
    }
    
    // Verificar se o número de perguntas e respostas coincide
    if (faqQuestions.length !== faqAnswers.length) {
        console.warn('AVISO: O número de perguntas e respostas não coincide!');
    }
    
    // Adicionar funcionalidade para abrir/fechar as perguntas
    faqQuestions.forEach((question, index) => {
        console.log(`Adicionando evento de clique à pergunta ${index + 1}`);
        
        question.addEventListener('click', function() {
            console.log(`Clique na pergunta: "${this.textContent.trim()}"`);
            
            // Verificar se já está ativo
            const isActive = this.classList.contains('active');
            
            // Fechar todas as perguntas primeiro
            faqQuestions.forEach(q => q.classList.remove('active'));
            faqAnswers.forEach(a => a.classList.remove('show'));
            
            // Se não estava ativo, abrir esta pergunta
            if (!isActive) {
                this.classList.add('active');
                
                // Obter a resposta correspondente (próximo elemento)
                const answer = this.nextElementSibling;
                if (answer && answer.classList.contains('faq-answer')) {
                    answer.classList.add('show');
                    console.log('Resposta exibida');
                } else {
                    console.error('Resposta não encontrada ou estrutura incorreta');
                }
            } else {
                console.log('Pergunta fechada');
            }
        });
    });
});

// Adicionar classe de visibilidade para elementos de suporte
document.querySelectorAll('.suporte-card').forEach(element => {
    observer.observe(element);
});

// Formulário de Contato via WhatsApp
document.querySelector('.contato-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const telefone = this.querySelector('input[type="tel"]').value;
    const assunto = this.querySelector('select').value;
    const mensagem = this.querySelector('textarea').value;
    
    // Formatar a mensagem para o WhatsApp
    const mensagemWhatsApp = `Olá! Me chamo ${nome}.\n\n` +
        `*Assunto:* ${assunto}\n` +
        `*Email:* ${email}\n` +
        `*Telefone:* ${telefone}\n\n` +
        `*Mensagem:*\n${mensagem}`;
    
    // Codificar a mensagem para URL
    const mensagemCodificada = encodeURIComponent(mensagemWhatsApp);
    
    // Redirecionar para o WhatsApp
    window.open(`https://wa.me/5598999882215?text=${mensagemCodificada}`, '_blank');
    
    // Limpar o formulário
    this.reset();
    
    // Mostrar mensagem de sucesso
    alert('Você será redirecionado para o WhatsApp!');
});

// Carrossel de Planos
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.planos-track');
    const cards = document.querySelectorAll('.plano-card');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    
    let currentIndex = 0;
    const cardWidth = cards[0].offsetWidth + 20; // Largura do card + gap
    
    function updateCarousel() {
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    }
    
    function nextSlide() {
        currentIndex = (currentIndex + 1) % cards.length;
        updateCarousel();
    }
    
    function prevSlide() {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateCarousel();
    }
    
    // Event listeners para os botões
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);
    
    // Touch events para mobile
    let startX;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let isDragging = false;
    
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        track.style.transition = 'none';
    });
    
    track.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        currentTranslate = prevTranslate + diff;
        track.style.transform = `translateX(${currentTranslate}px)`;
    });
    
    track.addEventListener('touchend', () => {
        isDragging = false;
        track.style.transition = 'transform 0.3s ease-in-out';
        
        const movedBy = currentTranslate - prevTranslate;
        
        if (Math.abs(movedBy) > cardWidth / 3) {
            if (movedBy > 0) {
                prevSlide();
            } else {
                nextSlide();
            }
        }
        
        updateCarousel();
        prevTranslate = currentTranslate;
    });
    
    // Atualizar carrossel quando a janela for redimensionada
    window.addEventListener('resize', () => {
        updateCarousel();
    });
});

// Efeito de Partículas no Hero
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'hero-particles';
    hero.appendChild(particlesContainer);

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Inicializar partículas
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
});

// Geração de CSRF Token
function generateCSRFToken() {
    return Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

// Sanitização de inputs
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Validação de telefone
function formatPhone(phone) {
    return phone.replace(/\D/g, '')
               .replace(/^(\d{2})(\d)/g, '($1) $2')
               .replace(/(\d)(\d{4})$/, '$1-$2');
}

// Proteção XSS nos inputs
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('input', (e) => {
        e.target.value = sanitizeInput(e.target.value);
    });
});

// Formatação automática do telefone
document.getElementById('telefone')?.addEventListener('input', (e) => {
    e.target.value = formatPhone(e.target.value);
});

// Proteção do formulário
document.getElementById('contactForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Validação adicional
    const email = document.getElementById('email').value;
    const phone = document.getElementById('telefone').value;
    
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
        alert('Por favor, insira um email válido');
        return;
    }
    
    if (!phone.match(/^\([0-9]{2}\)\s[0-9]{4,5}-[0-9]{4}$/)) {
        alert('Por favor, insira um telefone válido');
        return;
    }
    
    // Dados do formulário
    const formData = new FormData(e.target);
    formData.append('csrf_token', document.getElementById('csrf_token').value);
    
    try {
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'X-CSRF-Token': document.getElementById('csrf_token').value,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.fromEntries(formData))
        });
        
        if (!response.ok) throw new Error('Erro no envio');
        
        alert('Mensagem enviada com sucesso!');
        e.target.reset();
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao enviar mensagem. Tente novamente.');
    }
});

// Proteção contra ataques de clickjacking
if (window.self !== window.top) {
    window.top.location = window.self.location;
}

// Headers de segurança (adicionar no servidor)
/*
Content-Security-Policy: default-src 'self'; 
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self';
    frame-ancestors 'none';
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: geolocation=(), microphone=(), camera=()
*/

// Inicialização de segurança
document.addEventListener('DOMContentLoaded', () => {
    // Gerar e definir CSRF token
    document.getElementById('csrf_token').value = generateCSRFToken();
    
    // Desabilitar devtools (básico)
    document.addEventListener('contextmenu', e => e.preventDefault());
    document.addEventListener('keydown', e => {
        if (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83)) {
            e.preventDefault();
        }
    });
});

// Carrossel de Planos Mobile
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.planos-track');
    const cards = document.querySelectorAll('.plano-card');
    
    // Criar indicadores
    if (window.innerWidth <= 768) {
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'carousel-indicators';
        
        cards.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.className = 'carousel-indicator';
            if (index === 0) indicator.classList.add('active');
            indicatorsContainer.appendChild(indicator);
        });
        
        track.parentElement.appendChild(indicatorsContainer);
        
        // Atualizar indicadores ao rolar
        const indicators = document.querySelectorAll('.carousel-indicator');
        
        track.addEventListener('scroll', () => {
            const scrollPosition = track.scrollLeft;
            const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
            const activeIndex = Math.round(scrollPosition / cardWidth);
            
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === activeIndex);
            });
        });
        
        // Scroll suave ao clicar nos indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight);
                track.scrollTo({
                    left: index * cardWidth,
                    behavior: 'smooth'
                });
            });
        });
    }
});

// Calculadora de Planos - Implementação super simples
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando calculadora...');
    
    // Seleção dos elementos
    const cards = document.querySelectorAll('.option-card');
    const calcularBtn = document.getElementById('calcular-btn');
    const resultContainer = document.querySelector('.result-container');
    
    // Verificações básicas
    if (!cards.length) console.error('Cards não encontrados');
    if (!calcularBtn) console.error('Botão não encontrado');
    if (!resultContainer) console.error('Container de resultado não encontrado');
    
    // Objeto para armazenar respostas selecionadas
    const respostas = {};
    
    // Adicionar eventos de clique aos cards
    cards.forEach(card => {
        card.addEventListener('click', (e) => {
            // Encontrar seção e pergunta
            const section = card.closest('.calculadora-section');
            const pergunta = section.querySelector('h3').textContent;
            
            // Desmarcar outros cards da mesma seção
            section.querySelectorAll('.option-card').forEach(c => 
                c.classList.remove('selected'));
            
            // Marcar card atual
            card.classList.add('selected');
            
            // Salvar resposta
            respostas[pergunta] = card.dataset.value;
            
            console.log(`Selecionado: ${pergunta} = ${card.dataset.value}`);
        });
    });
    
    // Evento de clique no botão calcular
    calcularBtn.addEventListener('click', () => {
        try {
            console.log('Botão calcular clicado');
            console.log('Respostas:', respostas);
            
            // Verificar se todas as perguntas foram respondidas
            const sections = document.querySelectorAll('.calculadora-section');
            if (Object.keys(respostas).length < sections.length) {
                // Alertar usuário
                alert('Por favor, responda todas as perguntas!');
                return;
            }
            
            // Obter valores para cálculo
            const velocidade = parseInt(respostas['Velocidade Desejada']);
            const dispositivos = parseInt(respostas['Quantos dispositivos conectados?']);
            const uso = respostas['Como você usa a internet?'];
            
            // Calcular recomendação
            let plano;
            const score = (velocidade / 100) + (dispositivos * 10) + 
                          (uso === 'basic' ? 20 : 
                           uso === 'streaming' ? 40 : 
                           uso === 'gaming' ? 60 : 50);
            
            // Determinar plano com base no score
            if (score <= 50) {
                plano = {
                    nome: 'Plano 300 MB',
                    velocidade: '300',
                    preco: 'R$ 79,90',
                    beneficios: ['Download até 300 MB', 'Upload até 150 MB', 'Wi-Fi Grátis'],
                    descricao: 'Ideal para uso básico e poucos dispositivos',
                    link: 'https://wa.me/5598999882215?text=Olá! Gostaria de contratar o plano de 300 MB'
                };
            } else if (score <= 80) {
                plano = {
                    nome: 'Plano 400 MB',
                    velocidade: '400',
                    preco: 'R$ 99,90',
                    beneficios: ['Download até 400 MB', 'Upload até 200 MB', 'Wi-Fi Grátis'],
                    descricao: 'Ótimo para streaming e famílias',
                    link: 'https://wa.me/5598999882215?text=Olá! Gostaria de contratar o plano de 400 MB'
                };
            } else {
                plano = {
                    nome: 'Plano 500 MB',
                    velocidade: '500',
                    preco: 'R$ 109,90',
                    beneficios: ['Download até 500 MB', 'Upload até 250 MB', 'Wi-Fi Grátis'],
                    descricao: 'Ideal para gamers e profissionais',
                    link: 'https://wa.me/5598999882215?text=Olá! Gostaria de contratar o plano de 500 MB'
                };
            }
            
            // Mostrar resultado
            resultContainer.style.display = 'block';
            resultContainer.innerHTML = `
                <h3>Plano Recomendado</h3>
                <div class="recommended-plan">
                    <h3>${plano.nome}</h3>
                    <div class="plan-price">${plano.preco} <span>/mês</span></div>
                    <p>${plano.descricao}</p>
                    <div class="plan-benefits">
                        ${plano.beneficios.map(b => `<span class="plan-benefit">${b}</span>`).join('')}
                    </div>
                    <div class="plan-cta">
                        <a href="${plano.link}" target="_blank">Assine Agora</a>
                    </div>
                </div>
                <button class="recalcular-btn">
                    <i class="fas fa-redo"></i> Calcular Novamente
                </button>
            `;
            
            // Scroll até o resultado
            resultContainer.scrollIntoView({behavior: 'smooth'});
            
            // Adicionar evento ao botão recalcular
            resultContainer.querySelector('.recalcular-btn').addEventListener('click', () => {
                // Reiniciar calculadora
                resultContainer.style.display = 'none';
                
                // Limpar seleções
                cards.forEach(c => c.classList.remove('selected'));
                
                // Limpar respostas
                Object.keys(respostas).forEach(k => delete respostas[k]);
            });
        } catch (error) {
            console.error('Erro ao calcular:', error);
            alert('Ocorreu um erro. Por favor, tente novamente.');
        }
    });
});

// Inicialização do menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.querySelector('.menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
    }
});

// Menu Mobile Aprimorado
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    let scrollPosition = 0;

    // Adicionar spans ao menu-toggle se não existirem
    if (menuToggle && !menuToggle.querySelector('span')) {
        menuToggle.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
    }

    // Adicionar ícones aos links do menu se não existirem
    const menuIcons = {
        'Home': 'fas fa-home',
        'Planos': 'fas fa-wifi',
        'Sobre': 'fas fa-info-circle',
        'Contato': 'fas fa-envelope',
        'Central do Assinante': 'fas fa-user'
    };

    document.querySelectorAll('.nav-links a').forEach(link => {
        const text = link.textContent.trim();
        if (!link.querySelector('i') && menuIcons[text]) {
            link.innerHTML = `<i class="${menuIcons[text]}"></i>${text}`;
        }
    });

    // Função para gerenciar o scroll
    function handleScroll(action) {
        if (action === 'disable') {
            scrollPosition = window.pageYOffset;
            body.classList.add('menu-open');
            body.style.top = `-${scrollPosition}px`;
        } else {
            body.classList.remove('menu-open');
            body.style.top = '';
            window.scrollTo(0, scrollPosition);
        }
    }

    // Toggle do menu
    menuToggle.addEventListener('click', () => {
        const isOpen = navLinks.classList.contains('active');
        
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        if (!isOpen) {
            handleScroll('disable');
        } else {
            handleScroll('enable');
        }
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            handleScroll('enable');
            
            // Se for um link interno, aplicar scroll suave
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                event.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    setTimeout(() => {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }, 300); // Pequeno delay para o menu fechar primeiro
                }
            }
        });
    });

    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            handleScroll('enable');
        }
    });

    // Ajustar altura do menu em mudanças de orientação
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            handleScroll('enable');
        }
    });
});

// Prevenção de zoom e melhorias de responsividade
document.addEventListener('DOMContentLoaded', function() {
    // Prevenir zoom em dispositivos touch
    document.addEventListener('touchmove', function(event) {
        if (event.scale !== 1) {
            event.preventDefault();
        }
    }, { passive: false });
    
    // Prevenir zoom com gestos de pinça
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);
    
    // Ajustar layout em orientação landscape para mobile
    function checkOrientation() {
        if (window.innerWidth < 992 && window.innerWidth > window.innerHeight) {
            // Dispositivo está em modo paisagem e é mobile/tablet
            document.documentElement.style.fontSize = '14px';
            
            // Ajustar altura do hero para evitar conteúdo escondido
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.minHeight = '450px';
            }
        } else {
            // Restaurar configurações padrão
            document.documentElement.style.fontSize = '';
            
            const hero = document.querySelector('.hero');
            if (hero) {
                hero.style.minHeight = '';
            }
        }
    }
    
    // Verificar orientação inicial e em cada mudança
    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
    
    // Ajustar elementos problemáticos em telas pequenas
    function fixResponsiveElements() {
        // Ajustar cards em telas pequenas
        if (window.innerWidth < 576) {
            document.querySelectorAll('.plano-card, .beneficio-card').forEach(card => {
                card.style.width = 'calc(100% - 20px)';
                card.style.margin = '0 auto 20px';
            });
            
            // Ajustar tamanhos de fonte para elementos específicos
            document.querySelectorAll('.hero h1, .section-title').forEach(el => {
                el.style.fontSize = Math.min(1.75, window.innerWidth / 320) + 'rem';
            });
        } else {
            // Restaurar estilos quando a tela for maior
            document.querySelectorAll('.plano-card, .beneficio-card').forEach(card => {
                card.style.width = '';
                card.style.margin = '';
            });
            
            document.querySelectorAll('.hero h1, .section-title').forEach(el => {
                el.style.fontSize = '';
            });
        }
    }
    
    // Executar ajustes iniciais e em cada redimensionamento
    fixResponsiveElements();
    window.addEventListener('resize', fixResponsiveElements);
});

// Função para ajustar a logo em dispositivos móveis
document.addEventListener('DOMContentLoaded', function() {
    // Ajusta a logo para evitar quebras em mobile
    function ajustarLogo() {
        const logo = document.querySelector('.logo');
        const logoContent = document.querySelector('.logo-content');
        const logoTitle = document.querySelector('.logo h1');
        const subtitle = document.querySelector('.logo .subtitle');
        
        if (window.innerWidth <= 480) {
            console.log('Ajustando logo para mobile muito pequeno');
            if (logo) {
                logo.style.padding = '0.1rem 0.1rem';
                logo.style.marginTop = '2px';
                logo.style.height = 'calc(100% - 4px)';
            }
            if (logoContent) {
                logoContent.style.alignItems = 'center';
            }
            if (logoTitle) {
                logoTitle.style.fontSize = '1.2rem';
                logoTitle.style.marginBottom = '1px';
                logoTitle.style.lineHeight = '1.2';
                logoTitle.style.marginTop = '0';
            }
            if (subtitle) {
                subtitle.style.fontSize = '0.5rem';
                subtitle.style.alignSelf = 'center';
            }
        } else if (window.innerWidth <= 576) {
            console.log('Ajustando logo para mobile pequeno');
            if (logo) {
                logo.style.padding = '0.2rem 0.2rem';
                logo.style.marginTop = '3px';
                logo.style.height = 'calc(100% - 6px)';
            }
            if (logoContent) {
                logoContent.style.alignItems = 'center';
            }
            if (logoTitle) {
                logoTitle.style.fontSize = '1.5rem';
                logoTitle.style.marginBottom = '2px';
                logoTitle.style.lineHeight = '1.2';
                logoTitle.style.marginTop = '0';
            }
            if (subtitle) {
                subtitle.style.fontSize = '0.55rem';
                subtitle.style.alignSelf = 'center';
            }
        } else if (window.innerWidth <= 768) {
            console.log('Ajustando logo para tablet');
            if (logo) {
                logo.style.padding = '0.2rem 0.5rem';
                logo.style.minWidth = 'unset';
                logo.style.marginTop = '5px';
                logo.style.height = 'calc(100% - 10px)';
                logo.style.alignItems = 'center';
            }
            if (logoContent) {
                logoContent.style.alignItems = 'center';
            }
            if (logoTitle) {
                logoTitle.style.fontSize = '1.8rem';
                logoTitle.style.marginBottom = '2px';
                logoTitle.style.lineHeight = '1.2';
                logoTitle.style.marginTop = '0';
            }
            if (subtitle) {
                subtitle.style.fontSize = '0.65rem';
                subtitle.style.alignSelf = 'center';
            }
        } else {
            // Restaurar valores padrão para desktop
            if (logo) {
                logo.style.padding = '0.5rem 2rem';
                logo.style.minWidth = '250px';
                logo.style.marginTop = '5px';
                logo.style.height = 'calc(100% - 10px)';
                logo.style.alignItems = 'center';
                logo.style.justifyContent = 'flex-start';
            }
            if (logoContent) {
                logoContent.style.alignItems = 'flex-start';
            }
            if (logoTitle) {
                logoTitle.style.fontSize = '2.5rem';
                logoTitle.style.marginBottom = '5px';
                logoTitle.style.lineHeight = '1.2';
                logoTitle.style.marginTop = '0';
            }
            if (subtitle) {
                subtitle.style.fontSize = '0.75rem';
                subtitle.style.alignSelf = 'flex-end';
            }
        }
    }
    
    // Executar ajuste inicial
    ajustarLogo();
    
    // Ajustar em caso de redimensionamento
    window.addEventListener('resize', ajustarLogo);
});

// Função para ajustar a altura do elemento logo-content com melhorias para o subtítulo
function ajustarAlturaLogo() {
    const logoContent = document.querySelector('.logo-content');
    const logoH1 = document.querySelector('.logo h1');
    const subtitle = document.querySelector('.logo .subtitle');
    
    if (logoContent && logoH1 && subtitle) {
        // Garantir que o subtitle esteja visível com estilos diretos
        subtitle.style.visibility = 'visible';
        subtitle.style.overflow = 'visible';
        subtitle.style.display = 'block';
        
        // Verificar o tamanho atual do texto e ajustar se necessário
        const subtitleComputedStyle = window.getComputedStyle(subtitle);
        const subtitleHeight = subtitle.offsetHeight;
        
        if (subtitleHeight < 12) {
            // Se a altura for muito pequena, aumentar para garantir visibilidade
            subtitle.style.marginBottom = '8px';
            subtitle.style.paddingBottom = '4px';
        }
        
        // Calcular a altura necessária com base no conteúdo
        const h1Height = logoH1.offsetHeight;
        const subtitleVisibleHeight = subtitle.offsetHeight;
        // Adicionar margem extra para garantir espaço suficiente
        const alturaTotal = h1Height + subtitleVisibleHeight + 15;
        
        // Definir a altura mínima para acomodar todo o conteúdo
        logoContent.style.minHeight = `${alturaTotal}px`;
        
        console.log(`Altura ajustada: total=${alturaTotal}px, h1=${h1Height}px, subtitle=${subtitleVisibleHeight}px`);
    }
}

// Adicionar chamada da função com verificação de carga completa de fontes
document.addEventListener('DOMContentLoaded', function() {
    // Executar primeiro ajuste básico
    ajustarAlturaLogo();
    
    // Verificar se document.fonts está disponível (compatibilidade com navegadores)
    if (document.fonts && typeof document.fonts.ready === 'object') {
        // Esperar que as fontes sejam carregadas completamente para um ajuste mais preciso
        document.fonts.ready.then(() => {
            // Ajustar depois que as fontes forem carregadas
            ajustarAlturaLogo();
            
            // Ajustar novamente após 1 segundo para garantir
            setTimeout(ajustarAlturaLogo, 1000);
        });
    } else {
        // Alternativa para navegadores que não suportam document.fonts
        // Executar após um tempo para permitir carregamento de fontes
        setTimeout(ajustarAlturaLogo, 500);
        setTimeout(ajustarAlturaLogo, 1500);
    }
    
    // Também ajustar ao redimensionar a janela
    window.addEventListener('resize', ajustarAlturaLogo);
}); 