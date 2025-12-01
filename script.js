document.addEventListener('DOMContentLoaded', function () {
    // Lógica para Gota y Splash
const waterEffect = document.getElementById('water-effect');
const waterZones = document.querySelectorAll('.water-zone');

function updateWaterEffect() {
    if (!waterEffect || waterZones.length === 0) return;

    // Primera y última hoja donde vive la gota
    const firstZone = waterZones[0];
    const lastZone = waterZones[waterZones.length - 1];

    const firstTop = firstZone.offsetTop;                          // inicio de la zona
    const lastBottom = lastZone.offsetTop + lastZone.offsetHeight; // final de la zona
    const regionHeight = lastBottom - firstTop;

    // Scroll actual de la página
    const scrollY = window.scrollY;

    // Si aún no llegamos a la zona de agua → no mostrar nada
    if (scrollY + window.innerHeight < firstTop) {
        waterEffect.style.display = 'none';
        return;
    }

    // Si ya pasamos completamente la zona de agua → ocultar
    if (scrollY > lastBottom) {
        waterEffect.style.display = 'none';
        return;
    }

    // Calculamos puntos de inicio y splash SOLO dentro de la región de agua
    const startPoint  = firstTop + regionHeight * 0.025;  // 10% dentro de las 3 hojas
    const splashPoint = firstTop + regionHeight * 0.95;  // 90% dentro de esa región

    if (scrollY < startPoint) {
        // Aún no aparece la gota
        waterEffect.style.display = 'none';

    } else if (scrollY >= startPoint && scrollY < splashPoint) {
        // Modo Gota: sigue la pantalla (fixed)
        waterEffect.src = 'Imagenes/gota.png';
        waterEffect.style.display = 'block';
        waterEffect.style.position = 'fixed';
        waterEffect.style.top = '50%';
        waterEffect.style.left = '50%';
        waterEffect.style.transform = 'translate(-50%, -50%)';
        waterEffect.style.right = 'auto';

    } else {
        // Modo Splash: se queda pegado cerca del final de la zona
        waterEffect.src = 'Imagenes/splash.png';
        waterEffect.style.display = 'block';
        waterEffect.style.position = 'absolute';

        // Lo dejamos más o menos hacia el final de la región de agua
        waterEffect.style.top = (splashPoint + (window.innerHeight / 2)) + 'px';
        waterEffect.style.left = '50%';
        waterEffect.style.transform = 'translate(-50%, -50%)';
        waterEffect.style.right = 'auto';
    }
}

window.addEventListener('scroll', updateWaterEffect);
// Llamar una vez al inicio para establecer estado correcto
updateWaterEffect();


    const dialogues = document.querySelectorAll('.dialogue');

    function updateDialoguesOpacity() {
        const viewportHeight = window.innerHeight;
        const viewportCenter = viewportHeight / 2;

        dialogues.forEach(dialogue => {
            
            // Si ya desapareció antes, no lo volvemos a mostrar jamás
            if (dialogue.dataset.faded === "true") {
                dialogue.style.opacity = 0;
                return;
            }

            const rect = dialogue.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;

            // Distancia entre el diálogo y el centro de la pantalla
            const distance = elementCenter - viewportCenter;

            /*
                Queremos:
                - Cuando distance > 0 (está abajo del centro) → visible
                - Cuando distance se acerca a 0 → fade a 0
                - Cuando distance < 0 (pasó el centro) → desaparecer y marcar como "faded"
            */

            if (distance > 0) {
                // Aún no llega al centro → visible
                // Fade suave entre "un poco antes" y el centro
                const fadeStart = viewportHeight * 0.23; // empieza a desvanecer antes
                let opacity = Math.min(distance / fadeStart, 1);
                dialogue.style.opacity = opacity;
            } else {
                // Ya pasó el centro → desaparece y queda ahí para siempre
                dialogue.style.opacity = 0;
                dialogue.dataset.faded = "true"; // marcar como terminado
            }
        });
    }

    window.addEventListener('scroll', updateDialoguesOpacity);
    window.addEventListener('resize', updateDialoguesOpacity);
    updateDialoguesOpacity();

        // ==== DESBLOQUEAR CONTENIDO DESPUÉS DEL CONTENEDOR HORIZONTAL ====

    const sidewaysContainer = document.getElementById('sideways-container');
    const afterSideways = document.getElementById('after-sideways');
    let hasUnlockedAfterSideways = false;

    if (sidewaysContainer && afterSideways) {
        function checkSidewaysScroll() {
            const maxScrollLeft = sidewaysContainer.scrollWidth - sidewaysContainer.clientWidth;
            const currentScrollLeft = sidewaysContainer.scrollLeft;

            // pequeña tolerancia por si no llega al pixel exacto
            if (!hasUnlockedAfterSideways && currentScrollLeft >= maxScrollLeft - 10) {
                hasUnlockedAfterSideways = true;
                afterSideways.classList.add('unlocked');  // locked + unlocked => se muestra
            }
        }

        // Se ejecuta cada vez que el usuario hace scroll horizontal en el contenedor
        sidewaysContainer.addEventListener('scroll', checkSidewaysScroll);
    }

        // ==== ANIMACIÓN DE OJOS CON SCROLL ====

    const eyesSections = document.querySelectorAll('.eyes-page');

    function updateEyesPanels() {
    const viewportHeight = window.innerHeight;

    eyesSections.forEach(section => {
        const rect = section.getBoundingClientRect();

        // Progreso del scroll dentro del panel (0 a 1)
        const total = rect.height + viewportHeight;
        const passed = viewportHeight - rect.top;

        let progress = passed / total;
        if (progress < 0) progress = 0;
        if (progress > 1) progress = 1;

        const base   = section.querySelector('.eyes-base');    // ojos abiertos
        const half   = section.querySelector('.eyes-half');    // medio
        const closed = section.querySelector('.eyes-closed');  // cerrados

        // Siempre iniciamos con todos visibles en 0
        base.style.opacity = 1;     // la base nunca se apaga
        half.style.opacity = 0;     // la 2 empieza apagada
        closed.style.opacity = 0;   // la 3 empieza apagada

        // 0 → 0.33 = solo abiertos (base)
        if (progress < 0.50) {
            // no hacemos nada, la base ya está visible
        }

        // 0.33 → 0.66 = aparece la capa 2 SOBRE la capa 1
        else if (progress < 0.58) {
            half.style.opacity = 1;        // aparece la intermedia
            // La base se sigue viendo debajo
        }

        // 0.66 → 1 = aparece la capa 3 SOBRE la capa 2
        else {
            half.style.opacity = 1;        // sigue encendida
            closed.style.opacity = 1;      // aparece encima
        }
    });
}


    window.addEventListener('scroll', updateEyesPanels);
    window.addEventListener('resize', updateEyesPanels);
    updateEyesPanels();


});




