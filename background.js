
(function () {
    function randomPos(max) {
        return Math.floor(Math.random() * max);
    }

    
    function multipleBoxShadow(n) {
        var shadows = [];
        for (var i = 0; i < n; i++) {
            shadows.push(randomPos(2000) + 'px ' + randomPos(2000) + 'px #FFF');
        }
        return shadows.join(', ');
    }

    function crearFondoEstrellas() {
        // Evita duplicar el fondo si el script se ejecuta más de una vez
        if (document.getElementById('stars-background')) return;

        var container = document.createElement('div');
        container.id = 'stars-background';

        var stars = document.createElement('div');
        stars.id = 'stars';

        var stars2 = document.createElement('div');
        stars2.id = 'stars2';

        var stars3 = document.createElement('div');
        stars3.id = 'stars3';

        container.appendChild(stars);
        container.appendChild(stars2);
        container.appendChild(stars3);

         
        document.body.insertBefore(container, document.body.firstChild);

        // Cantidades: pequeñas (700), medianas (200), grandes (100)
        stars.style.setProperty('--shadows-small', multipleBoxShadow(700));
        stars2.style.setProperty('--shadows-medium', multipleBoxShadow(200));
        stars3.style.setProperty('--shadows-big', multipleBoxShadow(100));
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', crearFondoEstrellas);
    } else {
        crearFondoEstrellas();
    }
})();