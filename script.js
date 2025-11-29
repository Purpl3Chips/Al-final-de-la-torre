document.addEventListener('DOMContentLoaded', function () {
    const sidewaysContainer = document.getElementById('sideways-container');
    if (!sidewaysContainer) return;

    // Configuración
    const sidewaysPanelsCount = 2; // Total de paneles (1.png, 2.png, ...)
    const sidewaysPanels = [];

    // Buscar el panel inicial (1.png) que ya está en el HTML
    const initialPanel = sidewaysContainer.querySelector('img');
    if (initialPanel) {
        sidewaysPanels.push(initialPanel);
    }

    // Crear y agregar el resto de paneles
    for (let i = 2; i <= sidewaysPanelsCount; i++) {
        const img = document.createElement('img');
        img.src = `${i}.png`;
        img.alt = `Webtoon Panel ${i}`;
        img.className = 'sideways-panel';
        img.style.display = 'none'; // Ocultos por defecto
        sidewaysContainer.appendChild(img);
        sidewaysPanels.push(img);
    }

    let currentIndex = 0;
    let scrollAccumulator = 0; // Acumulador de movimiento
    const scrollThreshold = 150; // Sensibilidad: Aumenta este número para hacerlo más lento

    // Función para mostrar un panel específico
    function showPanel(index) {
        sidewaysPanels.forEach((panel, idx) => {
            panel.style.display = idx === index ? 'block' : 'none';
        });
    }

    // Detectar scroll lateral
    window.addEventListener('wheel', function (e) {
        // Verificar si estamos viendo el contenedor sideways
        const rect = sidewaysContainer.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight && rect.bottom >= 0);

        if (isVisible && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            e.preventDefault(); // Evita gestos nativos del navegador

            scrollAccumulator += e.deltaX; // Sumamos el movimiento

            // Solo cambiamos si superamos el umbral
            if (scrollAccumulator > scrollThreshold) {
                // Derecha -> Siguiente panel
                if (currentIndex < sidewaysPanels.length - 1) {
                    currentIndex++;
                    showPanel(currentIndex);
                } else {
                    currentIndex = 0; // Loop al inicio
                    showPanel(currentIndex);
                }
                scrollAccumulator = 0; // Reiniciamos la cuenta
            } else if (scrollAccumulator < -scrollThreshold) {
                // Izquierda -> Panel anterior
                if (currentIndex > 0) {
                    currentIndex--;
                    showPanel(currentIndex);
                }
                scrollAccumulator = 0; // Reiniciamos la cuenta
            }
        } else {
            // Si el usuario hace scroll vertical, reseteamos el acumulador para evitar cambios accidentales
            scrollAccumulator = 0;
        }
    }, { passive: false }); // Necesario para usar preventDefault

    // Lógica para Gota y Splash
    const waterEffect = document.getElementById('water-effect');
    
    // Ajusta estos valores según necesites
    // Usamos porcentajes de la altura total del documento para definir los puntos
    function updateWaterEffect() {
        if (!waterEffect) return;

        const totalHeight = document.documentElement.scrollHeight;
        const startPoint = totalHeight * 0.15; // Aparece al 15% del scroll
        const splashPoint = totalHeight * 0.70; // Splash al 80% del scroll
        const scrollY = window.scrollY;

        if (scrollY < startPoint) {
            // Aún no aparece
            waterEffect.style.display = 'none';
        } else if (scrollY >= startPoint && scrollY < splashPoint) {
            // Modo Gota: Sigue la pantalla (Fixed)
            waterEffect.src = 'gota.png';
            waterEffect.style.display = 'block';
            waterEffect.style.position = 'fixed';
            waterEffect.style.top = '50%';
            waterEffect.style.left = '50%';
            waterEffect.style.transform = 'translate(-50%, -50%)';
            waterEffect.style.right = 'auto'; // Reset right
        } else {
            // Modo Splash: Se queda pegado (Absolute)
            waterEffect.src = 'splash.png';
            waterEffect.style.display = 'block';
            waterEffect.style.position = 'absolute';
            // Se queda en la posición exacta donde ocurrió el cambio
            // Calculamos la posición absoluta basada en el scroll donde ocurre el splash + la mitad del viewport
            waterEffect.style.top = (splashPoint + (window.innerHeight / 2)) + 'px';
            waterEffect.style.left = '50%';
            waterEffect.style.transform = 'translate(-50%, -50%)';
            waterEffect.style.right = 'auto';
        }
    }

    window.addEventListener('scroll', updateWaterEffect);
    // Llamar una vez al inicio para establecer estado correcto
    updateWaterEffect();

    // ==== FADE: visible antes del centro, desaparece al llegar al centro, no regresa ====

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

});



