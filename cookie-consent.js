// Cookie Consent Script
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se o usuário já aceitou os cookies
    function checkCookieConsent() {
        try {
            // Tentar usar localStorage
            return localStorage.getItem('cookiesAccepted') === 'true';
        } catch (e) {
            // Fallback para cookies
            return document.cookie.indexOf('cookiesAccepted=true') !== -1;
        }
    }

    // Salvar a preferência do usuário
    function saveCookieConsent() {
        try {
            // Tentar usar localStorage
            localStorage.setItem('cookiesAccepted', 'true');
        } catch (e) {
            // Fallback para cookies (válido por 1 ano)
            const expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            document.cookie = `cookiesAccepted=true; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax`;
        }
    }

    // Mostrar o pop-up de consentimento
    function showCookieConsent() {
        const overlay = document.getElementById('cookie-consent-overlay');
        if (overlay) {
            // Aguardar um pequeno tempo para que a animação seja perceptível
            setTimeout(() => {
                overlay.classList.add('show');
            }, 500);
        }
    }

    // Esconder o pop-up de consentimento
    function hideCookieConsent() {
        const overlay = document.getElementById('cookie-consent-overlay');
        if (overlay) {
            overlay.classList.remove('show');
        }
    }

    // Configurar os event listeners
    function setupEventListeners() {
        const acceptAllBtn = document.getElementById('cookie-accept-all');
        const settingsBtn = document.getElementById('cookie-settings');

        if (acceptAllBtn) {
            acceptAllBtn.addEventListener('click', function() {
                saveCookieConsent();
                hideCookieConsent();
            });
        }

        if (settingsBtn) {
            settingsBtn.addEventListener('click', function() {
                // Neste exemplo, vamos apenas redirecionar para a página de privacidade
                // Em uma implementação real, você poderia mostrar um pop-up de configurações
                window.location.href = 'privacidade.html';
            });
        }
    }

    // Inicializar o sistema de consentimento de cookies
    function initCookieConsent() {
        // Verificar se o conteúdo da página já foi carregado
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            // Se o usuário ainda não aceitou os cookies, mostrar o pop-up
            if (!checkCookieConsent()) {
                setupEventListeners();
                showCookieConsent();
            }
        } else {
            // Se o documento ainda não foi carregado totalmente, aguardar o evento load
            window.addEventListener('load', function() {
                if (!checkCookieConsent()) {
                    setupEventListeners();
                    showCookieConsent();
                }
            });
        }
    }

    // Iniciar o sistema
    initCookieConsent();
}); 