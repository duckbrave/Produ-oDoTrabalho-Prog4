// Espera o conteúdo da página carregar completamente para rodar o script
document.addEventListener('DOMContentLoaded', () => {
    // Variável para guardar o nome do visitante
    let nomeSalvo = ""; 

    /**
     * Função principal que inicializa todas as funcionalidades
     */
    function init() {
        configurarSaudacao();
        configurarPersonalizacao();
        configurarToggleSecao();
        configurarCanvas();
        configurarLinksSociais();
    }

    // --- Funcionalidade 1: Saudação ---
    function configurarSaudacao() {
        const btn = document.getElementById('btn-saudacao');
        if (!btn) return; 
        btn.addEventListener('click', () => {
            alert('Olá! Obrigado por visitar o currículo interativo.');
        });
    }

    // --- Funcionalidade 2: Personalizar Título E LEGENDA ---
    function configurarPersonalizacao() {
        const btn = document.getElementById('btn-personalizar');
        const input = document.getElementById('nome-input');
        const titulo = document.getElementById('titulo-principal');
        const legenda = document.getElementById('nome-legenda'); // Encontra a legenda pelo ID

        if (!btn || !input || !titulo || !legenda) return;

        btn.addEventListener('click', () => {
            const nomeVisitante = input.value.trim();
            if (nomeVisitante) {
                // Atualiza o Título
                titulo.innerText = `Olá, ${nomeVisitante}! Bem-vindo(a) ao perfil.`;
                // Atualiza a Legenda
                legenda.innerText = `${nomeVisitante}, Desenvolvedor(a) Web`; 
                nomeSalvo = nomeVisitante;
            } else {
                // Volta ao texto original do Título
                titulo.innerText = "Olá, eu sou [Seu Nome]";
                // Volta ao texto original da Legenda
                legenda.innerText = "[Seu Nome], Desenvolvedor(a) Web";
                nomeSalvo = "";
                alert('Por favor, digite um nome para testar a personalização.');
            }
        });
    }

    // --- Funcionalidade 3: Mostrar/Esconder Seção ---
    function configurarToggleSecao() {
        const btn = document.getElementById('btn-toggle');
        const secao = document.getElementById('secao-oculta');
        if (!btn || !secao) return;
        
        btn.addEventListener('click', () => {
            const isHidden = secao.style.display === 'none' || secao.style.display === '';
            secao.style.display = isHidden ? 'block' : 'none';
            btn.innerText = isHidden ? 'Esconder Detalhes Adicionais' : 'Mostrar Detalhes Adicionais';
            btn.setAttribute('aria-expanded', isHidden);
        });
    }

    // --- Funcionalidade 4: Canvas ---
    function configurarCanvas() {
        const canvas = document.getElementById('meuCanvas');
        if (!canvas || !canvas.getContext) return;
        
        const ctx = canvas.getContext('2d');
        const input = document.getElementById('canvas-input');
        const btn = document.getElementById('btn-canvas');
        const saudacao = document.getElementById('canvas-saudacao');
        if (!input || !btn || !saudacao) return;

        function desenharCanvas(mensagem) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = 'rgba(0, 123, 255, 0.7)';
            ctx.fillRect(10, 10, 180, 80);
            ctx.fillStyle = 'white';
            ctx.font = '16px Arial';
            ctx.fillText(mensagem, 20, 55);
        }

        desenharCanvas('Canvas Ativo!');

        btn.addEventListener('click', () => {
            const texto = input.value.trim();
            desenharCanvas(texto || 'Digite algo!');
            if (texto) {
                 saudacao.innerText = nomeSalvo 
                    ? `Saudação para ${nomeSalvo}: ${texto}` 
                    : `Saudação: ${texto}`;
            } else {
                saudacao.innerText = '';
            }
        });
    }

    // --- Funcionalidade 5: Links Sociais (Formulário) ---
    function configurarLinksSociais() {
        const form = document.getElementById('form-sociais');
        const linksDiv = document.getElementById('links-sociais');
        if (!form || !linksDiv) return;

        function mostrarLinks(email, linkedin, github) {
            linksDiv.innerHTML = `
                <a href="mailto:${email}" target="_blank" rel="noopener noreferrer">E-mail</a>
                <a href="${linkedin}" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href="${github}" target="_blank" rel="noopener noreferrer">GitHub</a>
            `;
            linksDiv.style.display = 'block';
            form.style.display = 'none'; 
        }

        const emailSalvo = localStorage.getItem('emailSocial');
        const linkedinSalvo = localStorage.getItem('linkedinSocial');
        const githubSalvo = localStorage.getItem('githubSocial');

        if (emailSalvo && linkedinSalvo && githubSalvo) {
            mostrarLinks(emailSalvo, linkedinSalvo, githubSalvo);
        } else {
            form.style.display = 'block';
            linksDiv.style.display = 'none';
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = form.querySelector('#email-social').value.trim();
            const linkedin = form.querySelector('#linkedin-social').value.trim();
            const github = form.querySelector('#github-social').value.trim();

            localStorage.setItem('emailSocial', email);
            localStorage.setItem('linkedinSocial', linkedin);
            localStorage.setItem('githubSocial', github);

            mostrarLinks(email, linkedin, github);
        });
    }

    // Inicia tudo
    init();
});