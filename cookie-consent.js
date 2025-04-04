// Script para gerenciar o consentimento de cookies
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando script de consentimento de cookies');
    
    // Verificar se o usuário já deu consentimento
    const cookieConsent = localStorage.getItem('cookieConsent');
    
    // Selecionar elementos relacionados aos cookies
    const cookieOverlay = document.getElementById('cookie-consent-overlay');
    const acceptButton = document.getElementById('cookie-accept-all');
    
    if (!cookieOverlay || !acceptButton) {
        console.error('Elementos do consentimento de cookies não encontrados!');
        return;
    }
    
    // Se já tiver consentimento, esconder o overlay
    if (cookieConsent === 'accepted') {
        cookieOverlay.style.display = 'none';
        console.log('Consentimento de cookies já aceito');
    } else {
        cookieOverlay.style.display = 'flex';
        console.log('Mostrando banner de consentimento de cookies');
    }
    
    // Função para aceitar cookies
    function acceptCookies() {
        localStorage.setItem('cookieConsent', 'accepted');
        
        // Animação de fechamento
        cookieOverlay.style.opacity = '0';
        cookieOverlay.style.transform = 'translateY(100%)';
        
        setTimeout(function() {
            cookieOverlay.style.display = 'none';
        }, 500);
        
        console.log('Cookies aceitos pelo usuário');
    }
    
    // Adicionar eventos aos botões
    acceptButton.addEventListener('click', acceptCookies);
    
    // Adicionar estilos para animação ao overlay
    cookieOverlay.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    console.log('Script de consentimento de cookies inicializado com sucesso');
}); 