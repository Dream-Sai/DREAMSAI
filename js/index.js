// ========== UNIFICACIÓN DE SCRIPTS Y ROBUSTEZ ==========
document.addEventListener("DOMContentLoaded", () => {
    // --- Variables desde HTML ---
    const wellcome = document.querySelector(".wellcome");
    const xp = document.querySelectorAll(".article__experiencia");
    const imgPerfil = document.querySelector(".img__perfil");
    const spinner = document.querySelectorAll(".spinner");
    const spinnerDB1 = document.querySelectorAll(".double-bounce1");
    const spinnerDB2 = document.querySelectorAll(".double-bounce2");
    const iconNav = document.getElementById("iconNav") || document.querySelector(".iconNav");
    const nav = document.getElementById("nav") || document.querySelector(".nav");

    // --- Variables de JS ---
    let sppinerStatus = true;

    // --- Animaciones de bienvenida y perfil ---
    if (wellcome) wellcome.classList.add("wellcome--opacity");
    if (imgPerfil) {
        opacityTransitionElement(imgPerfil);
        opacityElement(imgPerfil);
    }
    if (xp && xp.length) {
        xp.forEach((element) => {
            opacityTransitionElement(element);
            opacityElement(element);
        });
    }
    if (spinner && spinner.length) {
        spinner.forEach((element) => {
            opacityTransitionElement(element);
        });
    }

    // --- Menú de navegación ---
    if (iconNav && nav) {
        iconNav.addEventListener("click", () => {
            nav.classList.toggle("nav__enlaces__visible");
        });
    }

    // --- Funciones de animación ---
    function opacityElement(element) {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                element.style.opacity = "1";
                if (element.classList.contains("article__experiencia")) {
                    hiddenShowSpinner();
                    sppinerStatus = false;
                    return;
                }
            } else {
                element.style.opacity = "0";
            }
        });
        observer.observe(element);
    }

    function opacityTransitionElement(element) {
        element.classList.add("opacityElement");
    }

    function hiddenShowSpinner() {
        if (sppinerStatus) {
            spinnerStyle(spinner, "opacity", "1");
            spinnerStyle(spinner, "display", "block");
            spinnerStyle(spinnerDB1, "animationPlayState", "running");
            spinnerStyle(spinnerDB2, "animationPlayState", "running");
            setTimeout(() => {
                spinnerStyle(spinner, "opacity", "0");
                spinnerStyle(spinnerDB1, "animationPlayState", "paused");
                spinnerStyle(spinnerDB2, "animationPlayState", "paused");
                setTimeout(() => {
                    spinner.forEach((e) => e.remove());
                }, 2000);
            }, 2000);
        }
    }

    function spinnerStyle(element, styleCustom, valueCustom) {
        element.forEach((e) => (e.style[styleCustom] = `${valueCustom}`));
    }

    // ========== PLANTILLAS: Paginación y Redirección Hotmart ==========
    const items = Array.from(document.querySelectorAll('#plantillas .plantilla-item'));
    const mostrarMasBtn = document.getElementById('mostrar-mas');
    const mostrarMenosBtn = document.getElementById('mostrar-menos');
    const porPagina = 3;
    let pagina = 1;
    const totalPaginas = Math.ceil(items.length / porPagina);

    function mostrarPagina() {
        items.forEach((item, idx) => {
            item.style.display = (idx < pagina * porPagina) ? '' : 'none';
        });
        if (mostrarMasBtn) mostrarMasBtn.style.display = (pagina < totalPaginas) ? '' : 'none';
        if (mostrarMenosBtn) mostrarMenosBtn.style.display = (pagina > 1) ? '' : 'none';
    }

    if (mostrarMasBtn && mostrarMenosBtn) {
        mostrarMasBtn.addEventListener('click', function() {
            if (pagina < totalPaginas) {
                pagina++;
                mostrarPagina();
            }
        });

        mostrarMenosBtn.addEventListener('click', function() {
            pagina = 1;
            mostrarPagina();
            window.scrollTo({ top: document.getElementById('plantillas').offsetTop - 60, behavior: 'smooth' });
        });
    }

    // Redirección Hotmart
    document.querySelectorAll('#plantillas .buy').forEach(btn => {
        btn.addEventListener('click', function() {
            const link = btn.getAttribute('data-link');
            if (link) {
                window.open(link, '_blank');
            }
        });
    });

    // Inicializa la vista de plantillas
    mostrarPagina();
});


