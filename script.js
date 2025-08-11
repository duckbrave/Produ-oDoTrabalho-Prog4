// Espera o conteúdo da página carregar completamente para rodar o script
document.addEventListener('DOMContentLoaded', function() {

    // --- FUNCIONALIDADE 1: Exibir uma saudação com alert() ---
    const btnSaudacao = document.getElementById('btn-saudacao');
    btnSaudacao.addEventListener('click', function() {
        alert('Olá! Obrigado por visitar o currículo interativo.');
    });

    // --- FUNCIONALIDADE 2: Personalizar título e salvar nome ---
    const btnPersonalizar = document.getElementById('btn-personalizar');
    const nomeInput = document.getElementById('nome-input');
    const tituloPrincipal = document.getElementById('titulo-principal');
    let nomeSalvo = ""; // variável global para guardar o nome

    btnPersonalizar.addEventListener('click', function() {
        const nomeVisitante = nomeInput.value.trim();
        if (nomeVisitante) {
            tituloPrincipal.innerText = `Olá, ${nomeVisitante}! Bem-vindo(a) ao perfil.`;
            nomeSalvo = nomeVisitante; // salva o nome para usar no Canvas
        } else {
            tituloPrincipal.innerText = "Olá, eu sou [Seu Nome]";
            nomeSalvo = "";
            alert('Por favor, digite um nome para testar a personalização.');
        }
    });

    // --- FUNCIONALIDADE 3 (EXTRA): Mostrar ou esconder uma seção ---
    const btnToggle = document.getElementById('btn-toggle');
    const secaoOculta = document.getElementById('secao-oculta');

    btnToggle.addEventListener('click', function() {
        if (secaoOculta.style.display === 'none' || secaoOculta.style.display === '') {
            secaoOculta.style.display = 'block';
            btnToggle.innerText = 'Esconder Detalhes Adicionais';
        } else {
            secaoOculta.style.display = 'none';
            btnToggle.innerText = 'Mostrar Detalhes Adicionais';
        }
    });

    // --- FUNCIONALIDADE CANVAS: Exibir mensagem digitada e saudação ---
    const canvas = document.getElementById('meuCanvas');
    const canvasInput = document.getElementById('canvas-input');
    const btnCanvas = document.getElementById('btn-canvas');
    const canvasSaudacao = document.getElementById('canvas-saudacao');

    function desenharCanvas(mensagem) {
        if (canvas.getContext) {
            const ctx = canvas.getContext('2d');
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 123, 255, 0.7)';
            ctx.fillRect(10, 10, 180, 80);
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(mensagem, 20, 55);
        }
    }

    btnCanvas.addEventListener('click', function() {
        const texto = canvasInput.value.trim();
        if (texto) {
            desenharCanvas(texto);
            if (nomeSalvo) {
                canvasSaudacao.innerText = `Saudação para ${nomeSalvo}: ${texto}`;
            } else {
                canvasSaudacao.innerText = `Saudação: ${texto}`;
            }
        } else {
            desenharCanvas('Canvas Ativo!');
            canvasSaudacao.innerText = '';
        }
    });

    // --- FUNCIONALIDADE LINKS SOCIAIS PERSONALIZADOS ---
    const formSociais = document.getElementById('form-sociais');
    const linksSociaisDiv = document.getElementById('links-sociais');

    function mostrarLinksSociais(email, linkedin, github) {
        linksSociaisDiv.innerHTML = `
            <a href="mailto:${email}" target="_blank">E-mail</a>
            <a href="${linkedin}" target="_blank">LinkedIn</a>
            <a href="${github}" target="_blank">GitHub</a>
        `;
        linksSociaisDiv.style.display = 'block';
        formSociais.style.display = 'none';
    }

    // Verifica se já existe no localStorage
    const emailSalvo = localStorage.getItem('emailSocial');
    const linkedinSalvo = localStorage.getItem('linkedinSocial');
    const githubSalvo = localStorage.getItem('githubSocial');

    if (emailSalvo && linkedinSalvo && githubSalvo) {
        mostrarLinksSociais(emailSalvo, linkedinSalvo, githubSalvo);
    } else {
        formSociais.style.display = 'block';
        linksSociaisDiv.style.display = 'none';
    }

    formSociais.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email-social').value.trim();
        const linkedin = document.getElementById('linkedin-social').value.trim();
        const github = document.getElementById('github-social').value.trim();

        localStorage.setItem('emailSocial', email);
        localStorage.setItem('linkedinSocial', linkedin);
        localStorage.setItem('githubSocial', github);

        mostrarLinksSociais(email, linkedin, github);
    });

});