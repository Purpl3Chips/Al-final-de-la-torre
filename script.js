document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // GOTA Y SPLASH
    // ==========================================

    const waterEffect = document.getElementById('water-effect');
    const waterZones = document.querySelectorAll('.water-zone');

    function updateWaterEffect() {

        if (!waterEffect || waterZones.length === 0) return;

        const firstZone = waterZones[0];
        const lastZone = waterZones[waterZones.length - 1];

        const firstTop = firstZone.offsetTop;
        const lastBottom = lastZone.offsetTop + lastZone.offsetHeight;
        const regionHeight = lastBottom - firstTop;

        const scrollY = window.scrollY;

        if (scrollY + window.innerHeight < firstTop) {
            waterEffect.style.display = 'none';
            return;
        }

        if (scrollY > lastBottom) {
            waterEffect.style.display = 'none';
            return;
        }

        const startPoint = firstTop + regionHeight * 0.02;
        const splashPoint = firstTop + regionHeight * 0.925;

        if (scrollY < startPoint) {

            waterEffect.style.display = 'none';

        } else if (scrollY >= startPoint && scrollY < splashPoint) {

            waterEffect.src = 'Imagenes/gota.webp';
            waterEffect.style.display = 'block';
            waterEffect.style.position = 'fixed';
            waterEffect.style.top = '50%';
            waterEffect.style.left = '50%';
            waterEffect.style.transform = 'translate(-50%, -50%)';
            waterEffect.style.right = 'auto';

        } else {

            waterEffect.src = 'Imagenes/splash.webp';
            waterEffect.style.display = 'block';
            waterEffect.style.position = 'absolute';

            waterEffect.style.top =
                (splashPoint + (window.innerHeight / 2)) + 'px';

            waterEffect.style.left = '50%';
            waterEffect.style.transform = 'translate(-50%, -50%)';
            waterEffect.style.right = 'auto';
        }
    }

    window.addEventListener('scroll', updateWaterEffect);
    updateWaterEffect();


    // ==========================================
    // DIÁLOGOS
    // ==========================================

    const dialogues = document.querySelectorAll('.dialogue');

    function updateDialoguesOpacity() {


        // ==========================================
    // lo de hasta arriba es el dialogo que aparece en lugar de desaparecer
    // ==========================================
        const appearingDialogues = document.querySelectorAll('.dialogue-aparece');

        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        dialogues.forEach(dialogue => {

            if (dialogue.dataset.faded === "true") {
                dialogue.style.opacity = 0;
                return;
            }

            const rect = dialogue.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;

            const distance = elementCenter - viewportCenter;

            if (distance > 0) {

                const fadeStart = viewportHeight * 0.23;

                let opacity = Math.min(
                    distance / fadeStart,
                    1
                );

                dialogue.style.opacity = opacity;

            } else {

                dialogue.style.opacity = 0;
                dialogue.dataset.faded = "true";

            }
        });


        // ==========================================
    // dialogo que aparece en lugar de desaparecer
    // ==========================================
        appearingDialogues.forEach(dialogue => {

            const rect = dialogue.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;

            // Punto donde empieza a aparecer
            const fadeStart = window.innerHeight * 0.90;

            // Punto donde ya está completamente visible
            const fadeEnd = window.innerHeight * 0.60;

            let opacity = (fadeStart - elementCenter) / (fadeStart - fadeEnd);

            opacity = Math.max(0, Math.min(1, opacity));

            dialogue.style.opacity = opacity;

            // Desenfoque especial para la página 64
            if (dialogue.classList.contains('pag64')) {

                const blur = 10 * (1 - opacity);

                dialogue.style.filter = `blur(${blur}px)`;
            }
        });

    }

    window.addEventListener('scroll', updateDialoguesOpacity);
    window.addEventListener('resize', updateDialoguesOpacity);

    updateDialoguesOpacity();


    // ==========================================
    // PANEL HORIZONTAL
    // ==========================================

    const sidewaysContainer =
        document.getElementById('sideways-container');

    const afterSideways =
        document.getElementById('after-sideways');

    const explorarAviso =
        document.querySelector('.explorar-aviso');

    let hasUnlockedAfterSideways = false;


    // ==========================================
    // DESAPARECER AVISO AL MOVER EL PANEL
    // ==========================================

    if (sidewaysContainer && explorarAviso) {

        sidewaysContainer.addEventListener('scroll', function () {

            explorarAviso.style.opacity = '0';

            setTimeout(function () {
                explorarAviso.style.display = 'none';
            }, 300);

        }, { once: true });

    }


    // ==========================================
    // DESBLOQUEAR CONTENIDO DESPUÉS DEL PANEL
    // ==========================================

    if (sidewaysContainer && afterSideways) {

        function checkSidewaysScroll() {

            const maxScrollLeft =
                sidewaysContainer.scrollWidth -
                sidewaysContainer.clientWidth;

            const currentScrollLeft =
                sidewaysContainer.scrollLeft;

            if (
                !hasUnlockedAfterSideways &&
                currentScrollLeft >= maxScrollLeft - 10
            ) {

                hasUnlockedAfterSideways = true;

                afterSideways.classList.add('unlocked');
            }
        }

        sidewaysContainer.addEventListener(
            'scroll',
            checkSidewaysScroll
        );
    }


    // ==========================================
    // CÁMARA CON EL MOUSE
    // ==========================================

    if (sidewaysContainer) {

        let mouseX = 0;
        let animando = false;

        sidewaysContainer.addEventListener(
            'mousemove',
            function (event) {

                const rect =
                    sidewaysContainer.getBoundingClientRect();

                // Posición del mouse dentro del panel
                mouseX =
                    (event.clientX - rect.left) /
                    rect.width;

                // Mantener entre 0 y 1
                mouseX =
                    Math.max(0, Math.min(1, mouseX));

                if (!animando) {

                    animando = true;

                    moverCamara();
                }
            }
        );


        function moverCamara() {

            const zona = 0.25;

            let velocidad = 0;


            // Mouse cerca del borde izquierdo
            if (mouseX < zona) {

                velocidad =
                    -((zona - mouseX) / zona) * 12;
            }


            // Mouse cerca del borde derecho
            else if (mouseX > 1 - zona) {

                velocidad =
                    ((mouseX - (1 - zona)) / zona) * 12;
            }


            sidewaysContainer.scrollLeft += velocidad;


            if (velocidad !== 0) {

                requestAnimationFrame(moverCamara);

            } else {

                animando = false;
            }
        }
    }


    // ==========================================
    // ANIMACIÓN DE OJOS
    // ==========================================

    const eyesSections =
        document.querySelectorAll('.eyes-page');

    function updateEyesPanels() {

        const viewportHeight = window.innerHeight;

        eyesSections.forEach(section => {

            const rect =
                section.getBoundingClientRect();

            const total =
                rect.height + viewportHeight;

            const passed =
                viewportHeight - rect.top;

            let progress =
                passed / total;

            if (progress < 0) progress = 0;
            if (progress > 1) progress = 1;


            const base =
                section.querySelector('.eyes-base');

            const half =
                section.querySelector('.eyes-half');

            const closed =
                section.querySelector('.eyes-closed');


            if (!base || !half || !closed) return;


            base.style.opacity = 1;
            half.style.opacity = 0;
            closed.style.opacity = 0;


            if (progress < 0.50) {

                // Solo ojos abiertos

            } else if (progress < 0.58) {

                // Ojos entrecerrados
                half.style.opacity = 1;

            } else {

                // Ojos cerrados
                half.style.opacity = 1;
                closed.style.opacity = 1;
            }

        });
    }

    window.addEventListener(
        'scroll',
        updateEyesPanels
    );

    window.addEventListener(
        'resize',
        updateEyesPanels
    );

    updateEyesPanels();

});




