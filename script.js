/**
 * BOMBEROS VOLUNTARIOS DE SAN ANDRÉS DE GILES
 * Script Oficial de Interactividad (Vanilla JavaScript ES6+)
 * 
 * Funcionalidades:
 * 1. Menú Móvil Hamburguesa Accesible
 * 2. Barra de Navegación Fija con Efecto de Scroll & Spy
 * 3. 5 Contadores Numéricos Animados con IntersectionObserver
 * 4. Sistema de Pestañas (Tabs) de Prevención Comunitaria
 * 5. Generador Inteligente de Consultas para WhatsApp
 * 6. Copia Rápida de Alias Bancario con Notificación Toast
 * 7. Botón "Volver Arriba" (Scroll-To-Top)
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 1. PANEL DESPLEGABLE (OFF-CANVAS DRAWER) Y ESTADO DEL NAVBAR EN SCROLL
  // =========================================================================
  const siteHeader = document.getElementById('header');
  const navToggle = document.getElementById('navToggle');
  const navDrawer = document.getElementById('navDrawer');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const drawerNavLinks = document.querySelectorAll('.drawer-nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Funciones de control del Panel Desplegable (Drawer)
  const openDrawer = () => {
    if (!navDrawer) return;
    navDrawer.classList.add('open');
    if (drawerBackdrop) drawerBackdrop.classList.add('active');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'true');
    navDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo
  };

  const closeDrawer = () => {
    if (!navDrawer) return;
    navDrawer.classList.remove('open');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
    navDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  // Eventos de apertura y cierre del Drawer
  if (navToggle) {
    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navDrawer && navDrawer.classList.contains('open');
      if (isOpen) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });
  }

  if (drawerCloseBtn) {
    drawerCloseBtn.addEventListener('click', closeDrawer);
  }

  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Cerrar Drawer al hacer clic en cualquier enlace interno
  drawerNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeDrawer();
    });
  });

  // Cerrar Drawer con tecla Escape si está abierto
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer && navDrawer.classList.contains('open')) {
      closeDrawer();
    }
  });

  // Control de visibilidad del navbar al hacer scroll y botón scroll-to-top
  const handleScroll = () => {
    const scrollPos = window.scrollY;

    // Solo visible en el inicio (scroll <= 25), se oculta al hacer scroll hacia abajo
    if (scrollPos > 25) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Botón scroll top
    if (scrollPos > 350) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Ejecutar al inicio

  // Scroll suave al hacer clic en Scroll to Top
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // =========================================================================
  // SISTEMA DE NAVEGACIÓN POR VISTAS (SPA ESTÁTICA)
  // =========================================================================
  const viewMap = {
    'inicio': 'inicio',
    'hero': 'inicio',
    'ultimas-noticias': 'inicio',
    'noticias': 'inicio',
    'comunicacion': 'inicio',
    'prensa': 'inicio',
    'radio': 'inicio',
    'acerca-de-nosotros': 'acerca-de-nosotros',
    'historia': 'acerca-de-nosotros',
    'archivo-historico': 'acerca-de-nosotros',
    'fundadores': 'acerca-de-nosotros',
    'autoridades': 'autoridades',
    'liderazgo': 'autoridades',
    'jefatura': 'autoridades',
    'comision': 'autoridades',
    'cuerpo-activo': 'autoridades',
    'blog-cuartel': 'blog-cuartel',
    'novedades': 'blog-cuartel',
    'facebook': 'blog-cuartel',
    'capacitacion': 'blog-cuartel',
    'formacion': 'blog-cuartel',
    'donar': 'donar',
    'donaciones': 'donar',
    'sostenimiento': 'donar',
    'apoyo-comunitario': 'donar',
    'prioridades-financiacion': 'donar',
    'colabora': 'donar',
    'rifa': 'donar',
    'eventos': 'donar',
    'cuartel': 'cuartel',
    'flota': 'cuartel',
    'parque-automotor': 'cuartel',
    'cadetes': 'cadetes',
    'institucion': 'cadetes',
    'nosotros': 'cadetes',
    'prevencion': 'prevencion',
    'seguridad': 'prevencion',
    'contacto': 'inicio',
    'guardia': 'inicio',
    'socios': 'portal-socios',
    'portal-socios': 'portal-socios',
    'socio': 'portal-socios',
    'sumate-como-socio': 'portal-socios'
  };

  const inicioSections = document.querySelectorAll('.section-inicio-view');
  const secondarySections = document.querySelectorAll('.section-secondary-view');
  const donateBanner = document.querySelector('.pre-footer-donate-cta');

  function mostrarVista(nombreVista, targetId = null) {
    const rawKey = (nombreVista || 'inicio').toLowerCase().replace('#', '').trim();
    const resolvedView = viewMap[rawKey] || 'inicio';
    const isContactoRequest = rawKey === 'contacto' || rawKey === 'guardia' || targetId === 'contacto';

    // 1. Cerrar automáticamente el menú lateral de 3 líneas si está abierto
    closeDrawer();

    // 2. Gestionar visibilidad de las secciones y estilo del header
    const headerEl = siteHeader || document.getElementById('header') || document.querySelector('header');

    if (resolvedView === 'inicio') {
      document.body.classList.remove('spa-view-active');

      // Header transparente en la vista de Inicio
      if (headerEl) {
        headerEl.classList.remove('header-solid');
      }

      // Mostrar Portada (Hero), Últimas Noticias, Banner de Donaciones y Contacto
      inicioSections.forEach(sec => {
        sec.style.display = '';
      });
      if (donateBanner) {
        donateBanner.style.display = 'flex';
      }

      // Ocultar todas las secciones secundarias
      secondarySections.forEach(sec => {
        sec.classList.remove('is-active-view');
        sec.style.display = 'none';
      });

      // Desplazamiento específico según lo solicitado
      if (isContactoRequest) {
        const contactoSec = document.getElementById('contacto');
        if (contactoSec) {
          setTimeout(() => {
            contactoSec.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      } else if (rawKey === 'comunicacion' || rawKey === 'prensa' || targetId === 'comunicacion' || targetId === 'prensa') {
        const comSec = document.getElementById('comunicacion');
        if (comSec) {
          setTimeout(() => {
            comSec.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      } else if (rawKey === 'ultimas-noticias' || targetId === 'ultimas-noticias') {
        const noticiasSec = document.getElementById('ultimas-noticias');
        if (noticiasSec) {
          setTimeout(() => {
            noticiasSec.scrollIntoView({ behavior: 'smooth' });
          }, 60);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      document.body.classList.add('spa-view-active');

      // Header negro sólido (#0b1120) en todas las secciones secundarias particulares
      if (headerEl) {
        headerEl.classList.add('header-solid');
        headerEl.classList.remove('scrolled');
      }

      // Ocultar portada, noticias, banner de donaciones y contacto
      inicioSections.forEach(sec => {
        sec.style.display = 'none';
      });
      if (donateBanner) {
        donateBanner.style.display = 'none';
      }

      // Mostrar únicamente la sección secundaria seleccionada
      secondarySections.forEach(sec => {
        const secView = sec.getAttribute('data-view-section');
        if (secView === resolvedView) {
          sec.classList.add('is-active-view');
          sec.style.display = 'block';
        } else {
          sec.classList.remove('is-active-view');
          sec.style.display = 'none';
        }
      });

      // Scroll arriba o al elemento interno solicitado (ej. #archivo-historico, #prioridades-financiacion)
      if (targetId && targetId !== resolvedView) {
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          setTimeout(() => {
            targetEl.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }

    // 3. Actualizar estado activo en los enlaces del menú lateral
    drawerNavLinks.forEach(link => {
      const linkView = link.getAttribute('data-view');
      const href = link.getAttribute('href');
      if (isContactoRequest) {
        if (linkView === 'contacto' || href === '#contacto') {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      } else if (linkView === resolvedView) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // 4. Actualizar hash en URL sin recarga brusca
    try {
      let newHash = '';
      if (resolvedView === 'inicio') {
        if (isContactoRequest) newHash = '#contacto';
        else if (rawKey === 'ultimas-noticias') newHash = '#ultimas-noticias';
      } else {
        newHash = `#${targetId || resolvedView}`;
      }
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash || window.location.pathname);
      }
    } catch (_) {}
  }

  // Exponer globalmente
  window.mostrarVista = mostrarVista;

  // Regreso garantizado a Inicio desde el Escudo Central del header o primer ítem del menú
  const brandIdentity = document.querySelector('.brand-identity');
  if (brandIdentity) {
    brandIdentity.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      mostrarVista('inicio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const drawerInicioLink = document.querySelector('.drawer-nav-link[data-view="inicio"]');
  if (drawerInicioLink) {
    drawerInicioLink.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      mostrarVista('inicio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Botón de llamado a donación en el banner
  const bannerDonateBtn = document.querySelector('.pre-footer-cta-btn');
  if (bannerDonateBtn) {
    bannerDonateBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      mostrarVista('donar');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Botón "Sumate como Socio" en el menú lateral
  const drawerSocioBtn = document.getElementById('drawerSocioBtn');
  if (drawerSocioBtn) {
    drawerSocioBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeDrawer();
      mostrarVista('socios');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Interceptar clics en elementos con data-view, data-target-view o enlaces de navegación interna
  document.addEventListener('click', (e) => {
    // 0. Botón del banner pre-footer de donaciones
    const preFooterBtn = e.target.closest('.pre-footer-cta-btn, [data-target-view]');
    if (preFooterBtn) {
      e.preventDefault();
      const target = preFooterBtn.getAttribute('data-target-view') || preFooterBtn.getAttribute('data-view') || 'donar';
      mostrarVista(target);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 1. Elemento con data-view explícito
    const viewTrigger = e.target.closest('[data-view]');
    if (viewTrigger) {
      const viewName = viewTrigger.getAttribute('data-view');
      const href = viewTrigger.getAttribute('href');
      const targetId = href && href.startsWith('#') ? href.replace('#', '') : null;
      e.preventDefault();
      mostrarVista(viewName, targetId);
      return;
    }

    // 2. Enlaces con anclas internas href="#..." que no sean de modales o tabs
    const anchorLink = e.target.closest('a[href^="#"]');
    if (anchorLink) {
      const href = anchorLink.getAttribute('href');
      if (!href || href === '#' || href === '#!') return;
      if (anchorLink.classList.contains('open-donation-modal') ||
          anchorLink.classList.contains('open-whatsapp-modal') ||
          anchorLink.hasAttribute('data-tab')) {
        return;
      }

      const targetId = href.replace('#', '').trim();
      if (viewMap[targetId]) {
        e.preventDefault();
        mostrarVista(targetId, targetId);
      }
    }
  });

  // Manejar navegación con botones Atrás / Adelante del navegador
  window.addEventListener('popstate', () => {
    const hash = window.location.hash.replace('#', '').trim();
    if (hash && viewMap[hash]) {
      mostrarVista(hash, hash);
    } else {
      mostrarVista('inicio');
    }
  });

  // Inicialización de la vista al cargar la página
  const initialHash = window.location.hash.replace('#', '').trim();
  if (initialHash && viewMap[initialHash]) {
    mostrarVista(initialHash, initialHash);
  } else {
    mostrarVista('inicio');
  }

  // =========================================================================
  // 2. CONTADORES NUMÉRICOS ANIMADOS (INTERSECTION OBSERVER)
  // =========================================================================
  const statCards = document.querySelectorAll('.stat-card');
  let countersAnimated = false;

  const animateNumber = (element, targetValue, duration = 1800, prefix = '', suffix = '') => {
    const startTime = performance.now();
    const startValue = 0;

    const updateCounter = (currentTime) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      // Easing cúbico hacia afuera para desaceleración natural
      const easeOutProgress = 1 - Math.pow(1 - progress, 3);
      const currentNumber = Math.floor(easeOutProgress * (targetValue - startValue) + startValue);

      element.textContent = `${prefix}${currentNumber}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = `${prefix}${targetValue}${suffix}`;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const initCounters = () => {
    statCards.forEach(card => {
      const numberEl = card.querySelector('.stat-number');
      const target = parseInt(card.getAttribute('data-counter'), 10);
      const suffix = card.getAttribute('data-suffix') || '';
      const prefix = card.getAttribute('data-prefix') || '';

      if (numberEl && !isNaN(target)) {
        animateNumber(numberEl, target, 1600, prefix, suffix);
      }
    });
  };

  // Observador para activar animación al entrar en el viewport
  const statsBand = document.getElementById('statsBand');
  if (statsBand && 'IntersectionObserver' in window) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
          countersAnimated = true;
          initCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    statsObserver.observe(statsBand);
  } else {
    // Fallback si IntersectionObserver no está soportado
    initCounters();
  }

  // =========================================================================
  // 3. SISTEMA DE PESTAÑAS (TABS) DE CONSEJOS DE PREVENCIÓN
  // =========================================================================
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTabId = button.getAttribute('data-tab');

      // 1. Quitar estado activo de todos los botones
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });

      // 2. Ocultar todos los paneles
      tabPanels.forEach(panel => {
        panel.classList.remove('active');
        panel.hidden = true;
      });

      // 3. Activar el botón clicado
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');

      // 4. Mostrar el panel correspondiente
      const activePanel = document.getElementById(`${targetTabId}Panel`);
      if (activePanel) {
        activePanel.classList.add('active');
        activePanel.hidden = false;
      }
    });

    // Soporte de navegación por teclado en Tabs (Accesibilidad WAI-ARIA)
    button.addEventListener('keydown', (e) => {
      const buttonArray = Array.from(tabButtons);
      const currentIndex = buttonArray.indexOf(button);

      let nextIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (currentIndex + 1) % buttonArray.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (currentIndex - 1 + buttonArray.length) % buttonArray.length;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        buttonArray[nextIndex].focus();
        buttonArray[nextIndex].click();
      }
    });
  });

  // =========================================================================
  // 3b. SISTEMA DE PESTAÑAS (TABS) DE AUTORIDADES Y MANDOS INSTITUCIONALES
  // =========================================================================
  const authorityTabButtons = document.querySelectorAll('.authority-tab-btn');
  const authorityTabPanels = document.querySelectorAll('.authority-tab-panel');

  if (authorityTabButtons.length > 0) {
    authorityTabButtons.forEach(button => {
      button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-authority-tab');

        // 1. Quitar estado activo en botones
        authorityTabButtons.forEach(btn => {
          btn.classList.remove('active');
          btn.setAttribute('aria-selected', 'false');
        });

        // 2. Ocultar todos los paneles
        authorityTabPanels.forEach(panel => {
          panel.classList.remove('active');
          panel.hidden = true;
        });

        // 3. Activar botón seleccionado
        button.classList.add('active');
        button.setAttribute('aria-selected', 'true');

        // 4. Mostrar panel correspondiente
        let activePanelId = '';
        if (targetTab === 'cuerpo-activo') {
          activePanelId = 'panelCuerpoActivo';
        } else if (targetTab === 'consejo-directivo') {
          activePanelId = 'panelConsejoDirectivo';
        }

        const activePanel = document.getElementById(activePanelId);
        if (activePanel) {
          activePanel.classList.add('active');
          activePanel.hidden = false;
        }
      });

      // Accesibilidad teclado en Tabs de Autoridades
      button.addEventListener('keydown', (e) => {
        const buttonArray = Array.from(authorityTabButtons);
        const currentIndex = buttonArray.indexOf(button);

        let nextIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          nextIndex = (currentIndex + 1) % buttonArray.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          nextIndex = (currentIndex - 1 + buttonArray.length) % buttonArray.length;
        }

        if (nextIndex !== null) {
          e.preventDefault();
          buttonArray[nextIndex].focus();
          buttonArray[nextIndex].click();
        }
      });
    });
  }

  // =========================================================================
  // 3c. LECTURA AUTOMÁTICA DE NOTICIAS DESDE INFOCIUDAD (WP REST API)
  // =========================================================================
  const newsGrid = document.getElementById('newsGrid');
  const INFOCIUDAD_API_URL = 'https://infociudad.com.ar/wp-json/wp/v2/posts?search=bomberos&_embed&per_page=6';

  const fetchLatestNews = async () => {
    if (!newsGrid) return;

    try {
      const response = await fetch(INFOCIUDAD_API_URL);
      if (!response.ok) return;

      const posts = await response.json();
      if (Array.isArray(posts) && posts.length > 0) {
        // Filtrar duplicados por URL con Set
        const seenUrls = new Set();
        const uniquePosts = [];

        for (const post of posts) {
          const postUrl = post.link;
          if (postUrl && !seenUrls.has(postUrl)) {
            seenUrls.add(postUrl);
            uniquePosts.push(post);
          }
        }

        if (uniquePosts.length === 0) return;

        // Limpiar contenedor y renderizar noticias de Infociudad
        newsGrid.innerHTML = '';

        uniquePosts.forEach(post => {
          // Título limpio
          let rawTitle = post.title && post.title.rendered ? post.title.rendered : 'Actualidad de Bomberos';
          const tempTitleDiv = document.createElement('div');
          tempTitleDiv.innerHTML = rawTitle;
          const cleanTitle = tempTitleDiv.textContent || tempTitleDiv.innerText || rawTitle;

          // Fecha formateada
          let formattedDate = 'Reciente';
          if (post.date) {
            try {
              const d = new Date(post.date);
              formattedDate = d.toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric' });
            } catch (err) {
              formattedDate = 'Reciente';
            }
          }

          // Portada original del diario (wp:featuredmedia)
          let coverImg = '';
          const embedded = post._embedded || {};
          const featured = embedded['wp:featuredmedia'];
          if (Array.isArray(featured) && featured.length > 0) {
            coverImg = featured[0].source_url || (featured[0].media_details && featured[0].media_details.sizes && featured[0].media_details.sizes.large && featured[0].media_details.sizes.large.source_url) || '';
          }

          if (!coverImg) {
            coverImg = 'https://infociudad.com.ar/wp-content/uploads/2026/09/bomberos-giles-1.png';
          }

          // Resumen
          let rawExcerpt = post.excerpt && post.excerpt.rendered ? post.excerpt.rendered : cleanTitle;
          const tempExcerptDiv = document.createElement('div');
          tempExcerptDiv.innerHTML = rawExcerpt;
          let summary = tempExcerptDiv.textContent || tempExcerptDiv.innerText || cleanTitle;
          summary = summary.replace(/\s+/g, ' ').trim();
          if (summary.length > 150) {
            summary = summary.substring(0, 147) + '...';
          }

          const card = document.createElement('article');
          card.className = 'news-card animate-fade-in';
          card.innerHTML = `
            <div class="news-img-frame">
              <a href="${post.link}" target="_blank" rel="noopener noreferrer">
                <img src="${coverImg}" alt="${cleanTitle}" class="news-img" loading="lazy" referrerpolicy="no-referrer">
              </a>
            </div>
            <div class="news-card-body">
              <div class="news-meta">
                <span class="news-source">Infociudad</span>
                <span class="news-dot">&bull;</span>
                <span class="news-date">${formattedDate}</span>
              </div>
              <h3 class="news-title">
                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="news-title-link">
                  ${cleanTitle}
                </a>
              </h3>
              <p class="news-summary">${summary}</p>
              <div class="news-action">
                <a href="${post.link}" target="_blank" rel="noopener noreferrer" class="news-btn">Leer más</a>
              </div>
            </div>
          `;

          newsGrid.appendChild(card);
        });
      }
    } catch (e) {
      // Si la API falla por CORS o conectividad, se mantienen intactas las 6 noticias verificadas del HTML
      console.warn('Infociudad API no disponible en este momento. Se mantienen las portadas y noticias del HTML.');
    }
  };

  fetchLatestNews();

  // =========================================================================
  // 4. GENERADOR INTELIGENTE DE WHATSAPP (MODAL)
  // =========================================================================
  const whatsappModal = document.getElementById('whatsappModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const whatsappForm = document.getElementById('whatsappForm');
  const contactReasonSelect = document.getElementById('contactReason');
  const senderNameInput = document.getElementById('senderName');
  const senderNeighborhoodInput = document.getElementById('senderNeighborhood');
  const senderMessageTextarea = document.getElementById('senderMessage');
  const openModalButtons = document.querySelectorAll('.open-whatsapp-modal');

  // Número oficial de WhatsApp institucional de Bomberos de San Andrés de Giles
  // Formato internacional: +54 9 2325 442020
  const WHATSAPP_PHONE = '5492325442020';

  // Mensajes sugeridos por defecto según el motivo seleccionado
  const defaultMessages = {
    rifa: 'Hola Bomberos de San Andrés de Giles, quisiera consultar números disponibles para la Nueva Rifa Anual Oficial (Sorteo Auto 0 km) y los medios de pago.',
    socio: 'Hola, quisiera sumarme como Socio Protector con aporte mensual para colaborar con el combustible, indumentaria y sostenimiento operativo del cuartel.',
    donacion: 'Hola, nos comunicamos en representación de nuestra empresa / cerealera / campo para coordinar una donación o colaboración institucional con Bomberos de Giles.',
    cadetes: 'Hola, quisiera conocer las fechas y requisitos para la inscripción a la Escuela de Cadetes "Comandante Mayor Rubén Denari" o al Curso de Aspirantes Mayores.',
    historia: 'Hola, tengo fotografías / documentos / recuerdos históricos de los primeros años del cuartel y me gustaría compartirlos para el archivo de los 58 años.',
    consulta: 'Hola Bomberos Voluntarios de San Andrés de Giles, me contacto para realizar una consulta general.'
  };

  // Abrir Modal
  const openModal = (reasonKey = 'rifa') => {
    if (!whatsappModal) return;

    // Seleccionar motivo en el dropdown
    if (contactReasonSelect) {
      contactReasonSelect.value = reasonKey;
      if (defaultMessages[reasonKey]) {
        senderMessageTextarea.value = defaultMessages[reasonKey];
      }
    }

    whatsappModal.hidden = false;
    // Forzar reflow para animación CSS
    setTimeout(() => {
      whatsappModal.classList.add('active');
      senderNameInput.focus();
    }, 10);

    // Evitar scroll en el fondo
    document.body.style.overflow = 'hidden';
  };

  // Cerrar Modal
  const closeModal = () => {
    if (!whatsappModal) return;

    whatsappModal.classList.remove('active');
    setTimeout(() => {
      whatsappModal.hidden = true;
      document.body.style.overflow = '';
    }, 250);
  };

  // Conectar todos los botones con data-reason o clase
  openModalButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const reason = btn.getAttribute('data-reason') || 'rifa';
      openModal(reason);
    });
  });

  // Eventos de cierre
  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  // Cerrar al pulsar fondo exterior
  if (whatsappModal) {
    whatsappModal.addEventListener('click', (e) => {
      if (e.target === whatsappModal) {
        closeModal();
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && whatsappModal && !whatsappModal.hidden) {
      closeModal();
    }
  });

  // Actualizar mensaje de ayuda cuando cambia el selector
  if (contactReasonSelect) {
    contactReasonSelect.addEventListener('change', () => {
      const selected = contactReasonSelect.value;
      if (defaultMessages[selected]) {
        senderMessageTextarea.value = defaultMessages[selected];
      }
    });
  }

  // Procesar envío del formulario y abrir WhatsApp con mensaje estructurado
  if (whatsappForm) {
    whatsappForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const reasonText = contactReasonSelect.options[contactReasonSelect.selectedIndex].text;
      const name = senderNameInput.value.trim();
      const neighborhood = senderNeighborhoodInput.value.trim() || 'San Andrés de Giles';
      const message = senderMessageTextarea.value.trim();

      if (!name || !message) {
        alert('Por favor, completa tu nombre y el mensaje.');
        return;
      }

      // Estructura clara y profesional del mensaje para los Bomberos
      const fullMessage = 
`🚨 *CONSULTA - BOMBEROS VOLUNTARIOS SAN ANDRÉS DE GILES*
----------------------------------------
📌 *Motivo:* ${reasonText}
👤 *Nombre:* ${name}
📍 *Localidad / Barrio:* ${neighborhood}
📝 *Mensaje:*
${message}
----------------------------------------
_Mensaje enviado desde el Sitio Web Oficial_`;

      const encodedMessage = encodeURIComponent(fullMessage);
      const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;

      // Abrir en nueva ventana/pestaña
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

      // Cerrar modal
      closeModal();
      whatsappForm.reset();
    });
  }

  // =========================================================================
  // 5. COPIAR ALIAS BANCARIO CON NOTIFICACIÓN TOAST
  // =========================================================================
  const btnCopyAlias = document.getElementById('btnCopyAlias');
  const bankAlias = document.getElementById('bankAlias');
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  const showToast = (message) => {
    if (!toastNotification) return;

    if (toastMessage) {
      toastMessage.textContent = message;
    }

    toastNotification.classList.add('active');

    setTimeout(() => {
      toastNotification.classList.remove('active');
    }, 3200);
  };

  const copyAliasToClipboard = () => {
    const aliasText = 'BOMBEROS.GILES.OFICIAL';

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(aliasText)
        .then(() => {
          showToast(`¡Alias "${aliasText}" copiado al portapapeles!`);
        })
        .catch(() => {
          fallbackCopy(aliasText);
        });
    } else {
      fallbackCopy(aliasText);
    }
  };

  const fallbackCopy = (text) => {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    showToast(`¡Alias "${text}" copiado al portapapeles!`);
  };

  if (btnCopyAlias) {
    btnCopyAlias.addEventListener('click', copyAliasToClipboard);
  }

  if (bankAlias) {
    bankAlias.addEventListener('click', copyAliasToClipboard);
    bankAlias.style.cursor = 'pointer';
  }

  // =========================================================================
  // 6. ALGORITMO DE LECTURA Y VALIDACIÓN TEMÁTICA DE NOTICIAS
  // =========================================================================

  /**
   * Valida y filtra estrictamente cualquier noticia antes de publicarla o enlazarla.
   * Aplica las 3 reglas obligatorias:
   * 1. Presencia obligatoria en el Título o Foco Principal (palabra 'bombero'/'bomberos' en título
   *    O BIEN mención explícita exacta de 'bomberos voluntarios de san andrés de giles' / 'bomberos voluntarios de giles' al menos 2 veces).
   * 2. Contexto Institucional/Operativo (al menos dos palabras clave del ámbito bomberil:
   *    voluntarios, cuartel, cuerpo activo, dotación, incendio, siniestro, rescate, autobomba, sirena, cadetes, boveri, rifa, subsidio).
   * 3. Lista Negra de Falsos Positivos (descarte automático de noticias con temas municipales ajenos
   *    donde el cuartel es solo referencia de calle: estacionamiento, motos, tránsito, hcd, concejo deliberante, licitacion, pavimento, elecciones
   *    si no tienen la palabra 'bomberos'/'bombero' en el título).
   * 
   * @param {string} titulo - Título de la noticia
   * @param {string} resumen - Bajada, copete o resumen de la nota
   * @param {string} contenidoCompleto - Cuerpo completo del artículo
   * @returns {boolean} true solo si trata genuinamente sobre los Bomberos Voluntarios de San Andrés de Giles
   */
  function esNoticiaValidaDeBomberos(titulo, resumen = '', contenidoCompleto = '') {
    const normalizar = (txt) => {
      return (txt || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '');
    };

    const normTitulo = normalizar(titulo);
    const normResumen = normalizar(resumen);
    const normContenido = normalizar(contenidoCompleto);
    const normTextoCompleto = `${normTitulo} ${normResumen} ${normContenido}`;

    // 1. Detección de palabra bomberil central en título ('bombero' o 'bomberos')
    const tieneBomberoEnTitulo = normTitulo.includes('bombero');

    // Regla 3: Lista Negra de Falsos Positivos (Exclusión)
    const blacklist = [
      'estacionamiento',
      'motos',
      'moto',
      'transito',
      'hcd',
      'concejo deliberante',
      'licitacion',
      'pavimento',
      'elecciones'
    ];
    const tieneTerminoExcluido = blacklist.some((termino) => normTitulo.includes(termino));
    if (tieneTerminoExcluido && !tieneBomberoEnTitulo) {
      return false;
    }

    // Regla 1: Presencia obligatoria en el Título o Foco Principal
    const contarOcurrencias = (texto, subcadena) => {
      if (!texto || !subcadena) return 0;
      let count = 0;
      let pos = 0;
      while ((pos = texto.indexOf(subcadena, pos)) !== -1) {
        count++;
        pos += subcadena.length;
      }
      return count;
    };

    const frase1 = 'bomberos voluntarios de san andres de giles';
    const frase2 = 'bomberos voluntarios de giles';
    const mencionesExactas =
      contarOcurrencias(normTextoCompleto, frase1) + contarOcurrencias(normTextoCompleto, frase2);

    const cumpleRegla1 = tieneBomberoEnTitulo || mencionesExactas >= 2;
    if (!cumpleRegla1) {
      return false;
    }

    // Regla 2: Validación de Contexto Institucional/Operativo (mínimo 2 palabras clave)
    const keywordsBomberiles = [
      'voluntarios',
      'cuartel',
      'cuerpo activo',
      'dotacion',
      'incendio',
      'siniestro',
      'rescate',
      'autobomba',
      'sirena',
      'cadetes',
      'boveri',
      'rifa',
      'subsidio'
    ];

    let matchesKeywords = 0;
    for (const kw of keywordsBomberiles) {
      if (normTextoCompleto.includes(kw)) {
        matchesKeywords++;
        if (matchesKeywords >= 2) break;
      }
    }

    if (matchesKeywords < 2) {
      return false;
    }

    // Validación de pertenencia geográfica e institucional a San Andrés de Giles
    const mencionaGiles = normTextoCompleto.includes('giles') || normTextoCompleto.includes('san andres');
    if (!mencionaGiles) {
      return false;
    }
    if (normTitulo.includes('carmen de areco') && !normTitulo.includes('giles')) {
      return false;
    }

    return true;
  }

  // Exportar al ámbito global para pruebas o llamadas externas
  window.esNoticiaValidaDeBomberos = esNoticiaValidaDeBomberos;

  // =========================================================================
  // 7. SISTEMA DE CARRUSEL PAGINADO Y CARGA DINÁMICA DE NOTICIAS (36 NOTICIAS / 4 PESTAÑAS)
  // =========================================================================
  const newsTrack = document.getElementById('newsTrack');
  const newsViewport = document.getElementById('newsViewport');
  const newsPageBtns = document.querySelectorAll('.news-page-btn');
  const newsPrevBtn = document.getElementById('newsPrevBtn');
  const newsNextBtn = document.getElementById('newsNextBtn');

  const MAX_PAGES = 4;
  const ITEMS_PER_PAGE = 9;

  const MESES_ES = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];

  const formatearFechaEspanol = (dateStr) => {
    if (!dateStr) return 'Fecha reciente';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return 'Fecha reciente';
      return `${d.getDate()} de ${MESES_ES[d.getMonth()]} de ${d.getFullYear()}`;
    } catch (e) {
      return 'Fecha reciente';
    }
  };

  // --- Control de Paginación del Carrusel (Estrictamente 4 pestañas: 1, 2, 3, 4) ---
  if (newsTrack) {
    let currentPage = 0;

    const goToPage = (pageIndex) => {
      if (pageIndex < 0 || pageIndex >= MAX_PAGES) return;
      currentPage = pageIndex;

      // Desplazamiento horizontal por bloques del 100%
      newsTrack.style.transform = `translateX(-${currentPage * 100}%)`;

      // Actualizar estado activo en botones numéricos
      newsPageBtns.forEach((btn, idx) => {
        const isActive = (idx === currentPage);
        btn.classList.toggle('active', isActive);
        if (isActive) {
          btn.setAttribute('aria-current', 'page');
        } else {
          btn.removeAttribute('aria-current');
        }
      });

      // Actualizar flechas de navegación
      if (newsPrevBtn) newsPrevBtn.disabled = (currentPage === 0);
      if (newsNextBtn) newsNextBtn.disabled = (currentPage === MAX_PAGES - 1);
    };

    // Eventos de botones numéricos (1, 2, 3, 4)
    newsPageBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetPage = parseInt(btn.getAttribute('data-page-index'), 10);
        goToPage(targetPage);
      });
    });

    // Eventos de flechas anterior / siguiente
    if (newsPrevBtn) {
      newsPrevBtn.addEventListener('click', () => {
        if (currentPage > 0) goToPage(currentPage - 1);
      });
    }

    if (newsNextBtn) {
      newsNextBtn.addEventListener('click', () => {
        if (currentPage < MAX_PAGES - 1) goToPage(currentPage + 1);
      });
    }

    // Soporte para deslizamiento táctil (Swipe) en dispositivos móviles
    if (newsViewport) {
      let touchStartX = 0;
      let touchEndX = 0;

      newsViewport.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });

      newsViewport.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 45) {
          if (diffX > 0 && currentPage < MAX_PAGES - 1) {
            goToPage(currentPage + 1);
          } else if (diffX < 0 && currentPage > 0) {
            goToPage(currentPage - 1);
          }
        }
      }, { passive: true });
    }

    // --- Consulta Asíncrona Ampliada a la API de WordPress (Páginas 1 y 2) ---
    const urlsUnicas = new Set();
    const enlacesExistentes = newsTrack.querySelectorAll('a[href]');
    enlacesExistentes.forEach((a) => {
      const href = a.getAttribute('href');
      if (href && href.startsWith('http')) {
        urlsUnicas.add(href.trim());
      }
    });

    const apiEndpoints = [
      'https://infociudad.com.ar/wp-json/wp/v2/posts?search=bomberos&_embed&per_page=50&page=1',
      'https://infociudad.com.ar/wp-json/wp/v2/posts?search=bomberos&_embed&per_page=50&page=2'
    ];

    Promise.allSettled(apiEndpoints.map(url => fetch(url).then(r => r.ok ? r.json() : [])))
      .then((results) => {
        const fetchedPosts = [];
        results.forEach((res) => {
          if (res.status === 'fulfilled' && Array.isArray(res.value)) {
            fetchedPosts.push(...res.value);
          }
        });

        if (fetchedPosts.length === 0) return;

        // Filtrar y validar rigurosamente cada noticia
        const validLivePosts = [];
        fetchedPosts.forEach((post) => {
          const rawTitulo = post.title?.rendered || '';
          const rawResumen = post.excerpt?.rendered || '';
          const rawContenido = post.content?.rendered || '';
          const link = (post.link || '').trim();

          if (!esNoticiaValidaDeBomberos(rawTitulo, rawResumen, rawContenido)) {
            return;
          }

          if (!link || urlsUnicas.has(link)) {
            return;
          }

          const featMedia = post._embedded?.['wp:featuredmedia'];
          const imgUrl = Array.isArray(featMedia) && featMedia[0]?.source_url
            ? featMedia[0].source_url
            : null;

          if (!imgUrl) return;

          urlsUnicas.add(link);

          const parser = document.createElement('div');
          parser.innerHTML = rawTitulo;
          const cleanTitulo = parser.textContent || parser.innerText || '';

          parser.innerHTML = rawResumen;
          let cleanResumen = parser.textContent || parser.innerText || '';
          if (cleanResumen.length > 140) {
            cleanResumen = cleanResumen.slice(0, 137).trim() + '...';
          }

          validLivePosts.push({
            title: cleanTitulo,
            summary: cleanResumen,
            link: link,
            img: imgUrl,
            date: post.date || '',
            formattedDate: formatearFechaEspanol(post.date),
            source: 'Infociudad'
          });
        });

        // Ordenar cronológicamente descendente (de la más nueva a la más vieja)
        validLivePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Reorganizar tarjetas manteniendo estrictamente MAX_PAGES = 4 e ITEMS_PER_PAGE = 9
        if (validLivePosts.length > 0) {
          const pages = Array.from(newsTrack.querySelectorAll('.news-page'));
          if (pages.length === MAX_PAGES) {
            validLivePosts.forEach((item) => {
              const card = document.createElement('article');
              card.className = 'news-card';
              card.innerHTML = `
                <div class="news-img-frame">
                  <a href="${item.link}" target="_blank" rel="noopener noreferrer">
                    <img src="${item.img}" alt="${item.title.replace(/"/g, '&quot;')}" class="news-img" loading="lazy" referrerpolicy="no-referrer">
                  </a>
                </div>
                <div class="news-card-body">
                  <div class="news-meta">
                    <span class="news-source">${item.source}</span>
                    <span class="news-dot">&bull;</span>
                    <span class="news-date">${item.formattedDate}</span>
                  </div>
                  <h3 class="news-title">
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-title-link">
                      ${item.title}
                    </a>
                  </h3>
                  <p class="news-summary">${item.summary}</p>
                  <div class="news-action">
                    <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-btn">Leer más</a>
                  </div>
                </div>
              `;

              // Insertar al inicio de la página 1
              pages[0].insertBefore(card, pages[0].firstChild);

              // Desplazar el exceso de cada página a la siguiente para mantener 9 exactas por página
              for (let p = 0; p < MAX_PAGES; p++) {
                const pageCards = pages[p].querySelectorAll('.news-card');
                if (pageCards.length > ITEMS_PER_PAGE) {
                  const overflowCard = pageCards[pageCards.length - 1];
                  if (p + 1 < MAX_PAGES) {
                    pages[p + 1].insertBefore(overflowCard, pages[p + 1].firstChild);
                  } else {
                    // Si cae más allá de la página 4, se remueve para nunca generar una página 5
                    overflowCard.remove();
                  }
                }
              }
            });
          }
        }
      })
      .catch((err) => {
        console.info('Noticias: 36 notas precargadas y ordenadas cronológicamente activas.', err.message);
      });
  }

  // =========================================================================
  // 8. PAGINACIÓN DINÁMICA DEL ARCHIVO FOTOGRÁFICO HISTÓRICO (9 FOTOS POR PÁGINA)
  // =========================================================================
  const historyContainer = document.getElementById('historicalGalleryContainer');
  const historyPagination = document.getElementById('historyPagination');
  const historyArchiveSection = document.getElementById('archivo-historico');
  const historyTitle = document.getElementById('archivoHistoricoTitle');

  if (historyContainer && historyPagination) {
    const FOTOS_POR_PAGINA = 9;
    const allCards = historyContainer.querySelectorAll('.photo-card');
    const totalFotos = allCards.length;
    const totalPages = Math.ceil(totalFotos / FOTOS_POR_PAGINA);
    let currentPage = 1;

    const historyPages = historyContainer.querySelectorAll('.history-page');

    // Cambiar a la página indicada
    const goToHistoryPage = (pageNumber, shouldScroll = true) => {
      if (pageNumber < 1 || pageNumber > totalPages) return;
      currentPage = pageNumber;

      // 1. Mostrar únicamente la página activa con animación suave fade-in
      historyPages.forEach((pageEl) => {
        const pNum = parseInt(pageEl.getAttribute('data-page'), 10);
        if (pNum === currentPage) {
          pageEl.classList.add('active');
        } else {
          pageEl.classList.remove('active');
        }
      });

      // 2. Actualizar estado activo de la botonera
      const pageButtons = historyPagination.querySelectorAll('.page-btn[data-page]');
      pageButtons.forEach((btn) => {
        const pNum = parseInt(btn.getAttribute('data-page'), 10);
        if (pNum === currentPage) {
          btn.classList.add('active');
          btn.setAttribute('aria-current', 'page');
        } else {
          btn.classList.remove('active');
          btn.removeAttribute('aria-current');
        }
      });

      // Actualizar estados deshabilitados de Anterior / Siguiente
      const prevBtn = historyPagination.querySelector('#historyPrevBtn');
      const nextBtn = historyPagination.querySelector('#historyNextBtn');
      if (prevBtn) {
        if (currentPage === 1) {
          prevBtn.classList.add('disabled');
          prevBtn.setAttribute('disabled', 'true');
        } else {
          prevBtn.classList.remove('disabled');
          prevBtn.removeAttribute('disabled');
        }
      }
      if (nextBtn) {
        if (currentPage === totalPages) {
          nextBtn.classList.add('disabled');
          nextBtn.setAttribute('disabled', 'true');
        } else {
          nextBtn.classList.remove('disabled');
          nextBtn.removeAttribute('disabled');
        }
      }

      // 3. Desplazamiento suave hacia el título de la sección
      if (shouldScroll) {
        const scrollTarget = historyTitle || historyArchiveSection;
        if (scrollTarget) {
          scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    // Construcción dinámica de la barra de paginación
    const renderPagination = () => {
      historyPagination.innerHTML = '';

      // Botón ‹ Anterior
      const prevBtn = document.createElement('button');
      prevBtn.type = 'button';
      prevBtn.id = 'historyPrevBtn';
      prevBtn.className = 'page-btn page-btn--prev';
      prevBtn.innerHTML = '‹ Anterior';
      prevBtn.setAttribute('aria-label', 'Página anterior de fotos históricas');
      prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
          goToHistoryPage(currentPage - 1, true);
        }
      });
      historyPagination.appendChild(prevBtn);

      // Botones numerados 1, 2, 3... totalPages
      for (let i = 1; i <= totalPages; i++) {
        const numBtn = document.createElement('button');
        numBtn.type = 'button';
        numBtn.className = `page-btn${i === currentPage ? ' active' : ''}`;
        numBtn.setAttribute('data-page', i);
        numBtn.textContent = i;
        numBtn.setAttribute('aria-label', `Ir a la página ${i} de fotos históricas`);
        if (i === currentPage) {
          numBtn.setAttribute('aria-current', 'page');
        }

        numBtn.addEventListener('click', () => {
          goToHistoryPage(i, true);
        });

        historyPagination.appendChild(numBtn);
      }

      // Botón Siguiente ›
      const nextBtn = document.createElement('button');
      nextBtn.type = 'button';
      nextBtn.id = 'historyNextBtn';
      nextBtn.className = 'page-btn page-btn--next';
      nextBtn.innerHTML = 'Siguiente ›';
      nextBtn.setAttribute('aria-label', 'Página siguiente de fotos históricas');
      nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
          goToHistoryPage(currentPage + 1, true);
        }
      });
      historyPagination.appendChild(nextBtn);

      // Iniciar en página 1 sin scroll inicial
      goToHistoryPage(1, false);
    };

    renderPagination();
  }

  // =========================================================================
  // 9. MODAL VISUALIZADOR DEL ARCHIVO FOTOGRÁFICO HISTÓRICO
  // =========================================================================
  const photoModal = document.getElementById('photo-modal');
  const photoModalImg = document.getElementById('photoModalImg');
  const photoModalTitle = document.getElementById('photoModalTitle');
  const photoModalFooter = document.getElementById('photoModalFooter');
  const photoModalCloseBtn = document.getElementById('photoModalCloseBtn');

  const openPhotoModal = (imgSrc, imgAlt, labelText, descText) => {
    if (!photoModal || !photoModalImg) return;
    photoModalImg.src = imgSrc;
    photoModalImg.alt = imgAlt || 'Fotografía histórica ampliada';

    if (photoModalTitle) {
      photoModalTitle.innerHTML = labelText
        ? `<i class="fa-solid fa-box-archive" aria-hidden="true"></i> ${labelText}`
        : '<i class="fa-solid fa-box-archive" aria-hidden="true"></i> Archivo Histórico';
    }

    if (photoModalFooter) {
      photoModalFooter.innerHTML = `<p class="modal-caption-text">${descText || imgAlt || 'Fotografía del archivo del cuartel de Bomberos Voluntarios de San Andrés de Giles.'}</p>`;
    }

    photoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closePhotoModal = () => {
    if (!photoModal) return;
    photoModal.classList.remove('open');
    if (photoModalImg) {
      photoModalImg.src = '';
    }
    document.body.style.overflow = '';
  };

  // Delegación de clic sobre cualquier tarjeta de cualquier página del Archivo Histórico
  const historicalArchive = document.getElementById('archivo-historico');
  if (historicalArchive) {
    historicalArchive.addEventListener('click', (e) => {
      const card = e.target.closest('.photo-card');
      if (!card) return;

      const img = card.querySelector('img');
      if (!img) return;

      const labelEl = card.querySelector('.photo-label');
      const descEl = card.querySelector('.photo-desc');

      const labelText = labelEl ? labelEl.textContent.trim() : '';
      const descText = descEl ? descEl.textContent.trim() : '';

      openPhotoModal(img.src, img.alt, labelText, descText);
    });
  }

  // Soporte adicional para cualquier imagen histórica de la página (.history-page img o figuras históricas)
  document.addEventListener('click', (e) => {
    const historyImg = e.target.closest('.history-page img');
    if (historyImg && !e.target.closest('.photo-card')) {
      openPhotoModal(
        historyImg.src,
        historyImg.alt,
        'Archivo Histórico',
        historyImg.alt || 'Fotografía histórica del cuartel.'
      );
    }
  });

  // Soporte para abrir retrato de Socio Fundador (1968) en el modal
  document.addEventListener('click', (e) => {
    const founderPhoto = e.target.closest('.founder-photo');
    if (founderPhoto) {
      const img = founderPhoto.querySelector('img');
      if (img) {
        const profile = founderPhoto.closest('.founder-profile');
        const name = profile && profile.querySelector('.founder-name')
          ? profile.querySelector('.founder-name').textContent.trim()
          : 'Socio Fundador';
        const role = profile && profile.querySelector('.founder-role')
          ? profile.querySelector('.founder-role').textContent.trim()
          : 'Pionero de 1968';
        const desc = profile && profile.querySelector('.founder-desc')
          ? profile.querySelector('.founder-desc').textContent.trim()
          : img.alt;
        openPhotoModal(img.src, img.alt, `${name} — ${role}`, desc);
      }
    }
  });

  // Soporte para abrir fotografía del bloque editorial de Donaciones (Estilo LAFD) en el modal
  document.addEventListener('click', (e) => {
    const lafdImg = e.target.closest('.lafd-focus-image-wrap img');
    if (lafdImg) {
      openPhotoModal(
        lafdImg.src,
        lafdImg.alt,
        'Destino de Fondos Operativos',
        lafdImg.alt || 'Bombero voluntario de San Andrés de Giles equipado con traje de intervención en servicio operativo.'
      );
    }
  });

  // Cerrar al hacer clic en el botón de cierre (×)
  if (photoModalCloseBtn) {
    photoModalCloseBtn.addEventListener('click', closePhotoModal);
  }

  // Cerrar al hacer clic fuera de la caja blanca (.modal-overlay)
  if (photoModal) {
    photoModal.addEventListener('click', (e) => {
      if (e.target === photoModal) {
        closePhotoModal();
      }
    });
  }

  // Cerrar al presionar la tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && photoModal && photoModal.classList.contains('open')) {
      closePhotoModal();
    }
  });

  // =========================================================================
  // 9. MODAL DE DONACIÓN DIRECTA Y CARRUSEL DE IMPACTO
  // =========================================================================
  const donationModal = document.getElementById('donate-modal') || document.getElementById('donation-modal');
  const donationModalCloseBtn = document.getElementById('donationModalCloseBtn');

  const openDonationModal = () => {
    if (!donationModal) return;
    donationModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeDonationModal = () => {
    if (!donationModal) return;
    donationModal.classList.remove('open');
    document.body.style.overflow = '';
  };

  // Abrir modal de donación desde cualquier botón .open-donation-modal o enlace a #donate-modal
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.open-donation-modal, [href="#donate-modal"], [href="#donation-modal"]');
    if (trigger) {
      e.preventDefault();
      openDonationModal();
    }
  });

  if (donationModalCloseBtn) {
    donationModalCloseBtn.addEventListener('click', closeDonationModal);
  }

  if (donationModal) {
    donationModal.addEventListener('click', (e) => {
      if (e.target === donationModal) {
        closeDonationModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && donationModal && donationModal.classList.contains('open')) {
      closeDonationModal();
    }
  });

  // Copiado dinámico de CBU o Alias desde el modal con feedback visual de 2 segundos
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.btn-copy-code');
    if (!copyBtn) return;
    const textToCopy = copyBtn.getAttribute('data-copy');
    if (!textToCopy) return;

    const onCopySuccess = () => {
      const originalText = copyBtn.innerText;
      copyBtn.innerText = '¡Copiado! ✓';
      copyBtn.classList.add('copied');
      showToast(`¡Dato "${textToCopy}" copiado al portapapeles!`);
      setTimeout(() => {
        copyBtn.innerText = originalText || 'Copiar';
        copyBtn.classList.remove('copied');
      }, 2000);
    };

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(textToCopy)
        .then(onCopySuccess)
        .catch(() => {
          fallbackCopy(textToCopy);
          onCopySuccess();
        });
    } else {
      fallbackCopy(textToCopy);
      onCopySuccess();
    }
  });

  // Carrusel Interactivo de Portada de Revista / Reporte ("Tu impacto")
  const impactSlides = document.querySelectorAll('.impact-slide');
  const impactDots = document.querySelectorAll('.magazine-dot');
  const btnImpactNext = document.getElementById('btnImpactNext');
  let currentImpactIndex = 0;

  const showImpactSlide = (index) => {
    if (!impactSlides.length) return;
    currentImpactIndex = (index + impactSlides.length) % impactSlides.length;

    impactSlides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentImpactIndex);
    });

    impactDots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentImpactIndex);
    });
  };

  if (btnImpactNext) {
    btnImpactNext.addEventListener('click', () => {
      showImpactSlide(currentImpactIndex + 1);
    });
  }

  impactDots.forEach((dot, idx) => {
    dot.addEventListener('click', () => {
      showImpactSlide(idx);
    });
  });

  // Botón Descargar Balance de Impacto (PDF)
  const btnDownloadImpactPdf = document.getElementById('btnDownloadImpactPdf');
  if (btnDownloadImpactPdf) {
    btnDownloadImpactPdf.addEventListener('click', () => {
      showToast('📄 Preparando informe de balance de gestión comunitaria...');
      setTimeout(() => {
        window.open('https://wa.me/5492325442020?text=Hola%20Bomberos%20de%20Giles,%20quisiera%20solicitar%20el%20Balance%20de%20Impacto%20y%20Gesti%C3%B3n%20Institucional%20en%20PDF.', '_blank', 'noopener,noreferrer');
      }, 700);
    });
  }

  // =========================================================================
  // 10. GESTIÓN DEL FORMULARIO DEL PORTAL DIGITAL DE SOCIOS
  // =========================================================================
  const formSocios = document.getElementById('form-socios') || document.getElementById('socioForm');
  const btnSocioCancel = document.getElementById('btn-socio-cancel') || document.getElementById('btnSocioCancel');

  if (btnSocioCancel) {
    btnSocioCancel.addEventListener('click', (e) => {
      e.preventDefault();
      if (formSocios) formSocios.reset();
      mostrarVista('inicio');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  if (formSocios) {
    formSocios.addEventListener('submit', function(e) {
      e.preventDefault(); // Evita que la página se recargue

      // Captura de datos del formulario (IDs asignados a los inputs)
      const nombre = (document.getElementById('socio-nombre') || document.getElementById('socioNombre'))?.value.trim() || '';
      const dni = (document.getElementById('socio-dni') || document.getElementById('socioDni'))?.value.trim() || '';
      const celular = (document.getElementById('socio-celular') || document.getElementById('socioCelular'))?.value.trim() || '';
      const domicilio = (document.getElementById('socio-domicilio') || document.getElementById('socioDomicilio'))?.value.trim() || '';
      const ciudad = (document.getElementById('socio-ciudad') || document.getElementById('socioCiudad'))?.value || 'San Andrés de Giles (Buenos Aires)';
      const cuota = (document.getElementById('socio-cuota') || document.getElementById('socioCuota'))?.value || '$3.000 / mes (Cuota Protectora)';
      const modoPagoInput = document.querySelector('input[name="modo_pago"]:checked');
      const modoPago = modoPagoInput ? modoPagoInput.value : 'Visita del Cobrador';
      const nota = (document.getElementById('socio-nota') || document.getElementById('socioNota'))?.value.trim() || '';

      if (!nombre || !dni || !celular || !domicilio) {
        showToast('⚠️ Por favor completá los campos obligatorios marcados con *');
        return;
      }

      showToast('✅ ¡Solicitud registrada! Abriendo WhatsApp oficial...');

      // Construcción del mensaje formateado
      const mensaje = `*NUEVO SOCIO - BOMBEROS GILES*%0A%0A` +
                      `*Nombre:* ${encodeURIComponent(nombre)}%0A` +
                      `*DNI:* ${encodeURIComponent(dni)}%0A` +
                      `*Celular:* ${encodeURIComponent(celular)}%0A` +
                      `*Domicilio:* ${encodeURIComponent(domicilio)}, ${encodeURIComponent(ciudad)}%0A` +
                      `*Cuota elegida:* ${encodeURIComponent(cuota)}%0A` +
                      `*Modo de pago:* ${encodeURIComponent(modoPago)}%0A` +
                      `*Nota:* ${encodeURIComponent(nota ? nota : 'Sin aclaraciones')}`;

      // Número de administración oficial de Bomberos San Andrés de Giles
      const numeroAdmin = "5492325442020";

      // Redirigir a WhatsApp
      window.open(`https://wa.me/${numeroAdmin}?text=${mensaje}`, '_blank');
    });
  }

  // =========================================================================
  // 11. LIGHTBOX INTERACTIVO PARA EL PARQUE AUTOMOTOR (12 UNIDADES)
  // =========================================================================
  const imageModal = document.getElementById('image-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeLightboxBtn = document.querySelector('.close-lightbox');

  const openImageModal = (src, title, desc) => {
    if (!imageModal || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = title || 'Ampliación Parque Automotor';

    if (lightboxCaption) {
      if (title && desc) {
        lightboxCaption.innerHTML = `${title}<span>${desc}</span>`;
      } else if (title) {
        lightboxCaption.textContent = title;
      } else {
        lightboxCaption.textContent = '';
      }
    }

    imageModal.style.display = 'flex';
    requestAnimationFrame(() => {
      imageModal.classList.add('active');
    });
    document.body.style.overflow = 'hidden';
  };

  const closeImageModal = () => {
    if (!imageModal) return;
    imageModal.classList.remove('active');
    setTimeout(() => {
      if (!imageModal.classList.contains('active')) {
        imageModal.style.display = 'none';
        if (lightboxImg) lightboxImg.src = '';
      }
    }, 250);
    document.body.style.overflow = '';
  };

  if (closeLightboxBtn) {
    closeLightboxBtn.addEventListener('click', closeImageModal);
  }

  if (imageModal) {
    imageModal.addEventListener('click', (e) => {
      if (e.target === imageModal || e.target.classList.contains('close-lightbox')) {
        closeImageModal();
      }
    });
  }

  // Delegación de clic sobre cualquier tarjeta del Parque Automotor
  const fleetSection = document.getElementById('cuartel') || document.querySelector('.fleet-grid');
  if (fleetSection) {
    fleetSection.addEventListener('click', (e) => {
      const card = e.target.closest('.fleet-card, .cuartel-card');
      const imgWrap = e.target.closest('.fleet-card__image-wrap, .cuartel-card__image-wrap');

      if (card && (imgWrap || e.target.tagName.toLowerCase() === 'img')) {
        const img = card.querySelector('img');
        if (!img) return;

        const titleEl = card.querySelector('h4');
        const descEl = card.querySelector('p');

        const title = titleEl ? titleEl.textContent.trim() : img.alt;
        const desc = descEl ? descEl.textContent.trim() : '';

        openImageModal(img.src, title, desc);
      }
    });
  }

  // Cerrar lightbox con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
      closeImageModal();
    }
  });

  // =========================================================================
  // 12. LOG CONSOLA INSTITUCIONAL DE VERIFICACIÓN
  // =========================================================================
  console.log(
    '%c🚒 BOMBEROS VOLUNTARIOS DE SAN ANDRÉS DE GILES (1968 - 2026)',
    'background: #B71C1C; color: #FFF; font-size: 14px; font-weight: bold; padding: 6px 12px; border-radius: 4px;'
  );
  console.log('✅ Sitio web oficial cargado correctamente. +58 años de valor y abnegación comunitaria.');
});

