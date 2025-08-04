// loader.js - VERSIÓN CORREGIDA CON DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Todo el código original va aquí dentro.
  // Ahora se ejecutará de forma segura solo cuando la página de Moodle esté lista.

  (function() {
    // Evita que el script se ejecute más de una vez
    if (document.getElementById('chatbot-flotante-container')) {
      return;
    }

    // URL del bot que se cargará en la ventana
    const botUrl = 'https://fede-mc.github.io/LTEBot/';

    // Definir los estilos CSS para el bot flotante
    const estilosCss = `
      #chatbot-flotante-container {
        position: fixed;
        bottom: 25px;
        right: 25px;
        z-index: 10000;
      }
      #chatbot-bubble {
        width: 60px;
        height: 60px;
        background-color: #005a9e; /* Color primario del bot */
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      #chatbot-bubble:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 16px rgba(0,0,0,0.3);
      }
      #chatbot-bubble svg {
        width: 32px;
        height: 32px;
        fill: white;
        transition: transform 0.3s ease;
      }
      #chatbot-window.open ~ #chatbot-bubble svg {
          transform: rotate(90deg) scale(0.8);
      }
      #chatbot-window {
        position: absolute;
        bottom: 80px; /* Posición arriba de la burbuja */
        right: 0;
        width: 370px;
        height: 550px;
        max-width: 90vw;
        max-height: calc(100vh - 150px);
        background-color: #fff;
        border: 1px solid #ddd;
        border-radius: 15px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.2);
        overflow: hidden;
        display: flex;
        flex-direction: column;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s ease, transform 0.3s ease;
        pointer-events: none; /* Invisible a clics cuando está cerrado */
      }
      #chatbot-window.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto; /* Se puede interactuar cuando está abierto */
      }
      #chatbot-window iframe {
        width: 100%;
        height: 100%;
        border: none;
      }
    `;

    // Crear los elementos HTML
    const container = document.createElement('div');
    container.id = 'chatbot-flotante-container';

    const chatWindow = document.createElement('div');
    chatWindow.id = 'chatbot-window';

    const bubble = document.createElement('div');
    bubble.id = 'chatbot-bubble';
    bubble.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path></svg>`;
    
    const iframe = document.createElement('iframe');
    iframe.src = botUrl;
    iframe.title = 'Tutor Virtual';
    
    // Ensamblar los elementos
    chatWindow.appendChild(iframe);
    container.appendChild(chatWindow);
    container.appendChild(bubble);

    // Inyectar los estilos y el HTML en la página principal
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = estilosCss;
    document.head.appendChild(styleSheet);
    
    document.body.appendChild(container);

    // Añadir el evento de clic a la burbuja
    bubble.addEventListener('click', function() {
      chatWindow.classList.toggle('open');
    });
  })();

});
