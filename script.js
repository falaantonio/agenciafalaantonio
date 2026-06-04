/**
 * ============================================
 * FALA, ANTÔNIO - Agência de Notícias Escolar
 * JavaScript - Interações e Animações
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // ----- ELEMENTOS DO DOM -----
    const loadingScreen = document.getElementById('loadingScreen');
    const header = document.getElementById('header');
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const btnTopo = document.getElementById('btnTopo');
    const revealElements = document.querySelectorAll('.reveal');

    // ----- LOADING SCREEN -----
    // Aguarda o carregamento completo da página e adiciona um pequeno delay
    window.addEventListener('load', () => {
        // Delay mínimo para a animação ser apreciada
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            // Habilita o scroll (caso tenha sido bloqueado)
            document.body.style.overflow = 'auto';
        }, 1800); // 1.8 segundos para apreciar o equalizador
    });

    // Bloqueia o scroll durante o loading
    document.body.style.overflow = 'hidden';

    // ----- HEADER COM EFEITO AO ROLAR (SCROLL) -----
    function updateHeaderOnScroll() {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    window.addEventListener('scroll', updateHeaderOnScroll);

    // ----- MENU HAMBURGER (MOBILE) -----
    hamburgerBtn.addEventListener('click', () => {
        hamburgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link (navegação suave)
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Fecha o menu mobile
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');

            // Scroll suave para a seção (comportamento padrão do HTML já faz)
            // Apenas garantimos que não haja conflito
        });
    });

    // Fechar menu ao clicar fora dele (em mobile)
    document.addEventListener('click', (event) => {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburgerBtn.contains(event.target);

        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ----- BOTÃO VOLTAR AO TOPO -----
    function toggleBtnTopo() {
        if (window.scrollY > 600) {
            btnTopo.classList.add('show');
        } else {
            btnTopo.classList.remove('show');
        }
    }
    window.addEventListener('scroll', toggleBtnTopo);

    btnTopo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ----- ANIMAÇÃO REVEAL AO ROLAR (INTERSECTION OBSERVER) -----
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.15 // dispara quando 15% do elemento está visível
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Uma vez visível, não precisa observar mais
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos os elementos com a classe .reveal
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ----- FECHAR MENU COM TECLA ESC (ACESSIBILIDADE) -----
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ----- ANO ATUAL NO RODAPÉ (DINÂMICO) -----
    // O ano está fixo em 2026 no HTML, mas podemos deixar dinâmico
    // caso queira que sempre mostre o ano corrente (remover comentário)
    // const anoSpan = document.querySelector('.footer-bottom p');
    // if (anoSpan) {
    //     const anoAtual = new Date().getFullYear();
    //     anoSpan.innerHTML = anoSpan.innerHTML.replace('2026', anoAtual);
    // }

    console.log('🎙️ Fala, Antônio - Agência de Notícias Escolar pronta!');
    console.log('📍 CETEP de Tempo Integral Santo Antônio - Queimadas/BA');
});