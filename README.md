# Site VNX Fiber

Site institucional moderno e responsivo para a VNX Fiber, uma empresa de serviços de internet via fibra óptica.

## Características

- Design moderno e responsivo
- Animações suaves e efeitos visuais
- Hero section com efeito de fibra óptica animado
- Logo com gradiente e efeitos modernos
- Carousel de planos com navegação
- Estatísticas dinâmicas
- Depoimentos de clientes
- Formulário de contato integrado com WhatsApp
- Menu mobile responsivo
- Otimizado para SEO

## Seções

1. **Hero**
   - Efeito de fibra óptica animado
   - Badges e features destacadas
   - Call-to-action para planos

2. **Benefícios**
   - Cards com ícones animados
   - Destaques dos serviços

3. **Planos**
   - Carousel interativo
   - Plano em destaque
   - Preços com desconto
   - Botões de ação para WhatsApp

4. **Cobertura**
   - Verificação via WhatsApp
   - Interface intuitiva

5. **Sobre**
   - Estatísticas da empresa
   - Informações institucionais
   - Imagem ilustrativa

6. **Depoimentos**
   - Grid de depoimentos
   - Avaliações com estrelas
   - Informações dos clientes

7. **Contato**
   - Formulário integrado
   - Informações de contato
   - Horário de atendimento
   - Links para redes sociais

## Tecnologias Utilizadas

- HTML5
- CSS3 (com variáveis e flexbox/grid)
- JavaScript (ES6+)
- Font Awesome 6.0.0 (ícones)
- Google Fonts (Poppins)
- Efeitos de gradiente e animações CSS
- Integração com WhatsApp

## Estrutura do Projeto

```
vnx-fiber/
├── index.html      # Página principal
├── styles.css      # Estilos e animações
├── script.js       # Funcionalidades JavaScript
├── faq.html        # Página de FAQ
├── area-tecnica.html   # Área técnica
├── termos.html     # Termos de uso
├── privacidade.html    # Política de privacidade
└── README.md       # Documentação
```

## Desenvolvimento Local e Erros 403

### Problema com Erros 403

Ao abrir o site diretamente pelo sistema de arquivos (protocolo `file://`), você pode encontrar erros 403 (Forbidden) relacionados a favicons e outros recursos. Isso ocorre devido a restrições de segurança em navegadores modernos.

### Solução 1: Usando um Servidor Local (Recomendado)

A melhor maneira de trabalhar em desenvolvimento é usando um servidor web local:

#### Com Python:
```bash
# Python 3
python -m http.server

# Python 2
python -m SimpleHTTPServer
```
Então acesse: http://localhost:8000

#### Com Node.js:
```bash
# Instalar (uma única vez)
npm install -g http-server

# Executar
http-server
```
Então acesse: http://localhost:8080

#### Com VS Code:
Instale a extensão "Live Server" e clique em "Go Live" na barra de status.

### Solução 2: Configuração Simplificada para Arquivo Local

Para desenvolvimento rápido, o site está configurado com um favicon básico (`favicon.ico`) no diretório raiz. Isso reduz os erros, mas o ideal é usar um servidor local para desenvolvimento completo.

### Na Publicação em Servidor Web

Quando for fazer deploy do site em um servidor web real, você pode restaurar os favicons completos no HTML:

```html
<!-- Favicons completos para servidor web -->
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicon/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicon/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="assets/favicon/apple-touch-icon.png">
<link rel="shortcut icon" type="image/x-icon" href="assets/favicon/favicon.ico">
<link rel="manifest" href="assets/favicon/site.webmanifest">
```

## Personalização

Para personalizar o site, você pode:

1. Alterar as cores no arquivo `styles.css` (variáveis CSS na raiz)
2. Modificar os textos no arquivo `index.html`
3. Atualizar os planos e preços
4. Ajustar as animações e efeitos
5. Personalizar as imagens e ícones

## Variáveis CSS Principais

```css
:root {
  --primary-color: #00A3FF;
  --accent-color: #0056b3;
  --secondary-color: #ffffff;
  --text-color: #333333;
  --success-color: #4DFF00;
}
```

## Contato

- Email: contato@vnxfiber.com.br
- WhatsApp: (98) 99988-2215
- Telefone: (98) 3222-8869

## Licença

Este projeto está sob a licença MIT. 