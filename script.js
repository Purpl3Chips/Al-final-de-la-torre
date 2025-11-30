document.addEventListener('DOMContentLoaded', function () {
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




