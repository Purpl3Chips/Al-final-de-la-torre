
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

    // Función para mostrar un panel específico
    function showPanel(index) {
        sidewaysPanels.forEach((panel, idx) => {
            panel.style.display = idx === index ? 'block' : 'none';
        });
    }

    // Detectar scroll lateral
    window.addEventListener('wheel', function (e) {
        // Verificar si estamos viendo el contenedor sideways (al final de la página o visible en viewport)
        const rect = sidewaysContainer.getBoundingClientRect();
        const isVisible = (rect.top < window.innerHeight && rect.bottom >= 0);

        if (isVisible && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
            if (e.deltaX > 0) {
                // Derecha -> Siguiente panel
                if (currentIndex < sidewaysPanels.length - 1) {
                    currentIndex++;
                    showPanel(currentIndex);
                } else {
                    currentIndex = 0; // Loop al inicio
                    showPanel(currentIndex);
                }
            } else if (e.deltaX < 0) {
                // Izquierda -> Panel anterior
                if (currentIndex > 0) {
                    currentIndex--;
                    showPanel(currentIndex);
                }
            }
        }
    });
});



