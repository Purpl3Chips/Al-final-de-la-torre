Para cambiar las imagenes al llegar a la seccion de paneles horizontales (final de la pagina)

se debe cambiar el siguiente snippet que aparece en script.js de la linea 5 a la 7

 // Configuración
    const sidewaysPanelsCount = 2; // Total de paneles (1.png, 2.png, ...)
    const sidewaysPanels = [];

en dicho snippet se debera modificar la constante sidewaysPanelsCount, remplazando el numero por cuantos paneles
se tengan. Las imagenes de los paneles que se moveran lateralmente deberan ser llamados como x.png (1.png, 2.png, ...)
de lo contrario no funcionara.

Las imagenes gota y splash son placeholders para las verdaderas imagenes, para evitar modificar el codigo
simplemente se debe cargar los archivos finales con el mismo nombre y remplazar los originales

para agregar paneles del formato vertical se debe escribir el comando  <img src="panel1.jpg" alt="Webtoon Panel"> 
remplazando  <img src="panel[numero del panel en cuestion].jpg" alt="Webtoon Panel">

entre la linea 81 hasta la linea 84 de script.js podremos encontrar la configuracion de aparicion para gota y splash.

const startPoint = totalHeight * 0.15; // Aparece al 15% del scroll
const splashPoint = totalHeight * 0.70; // Splash al 70% del scroll

la aparicion de ambos assets esta definidos por porcentajes en el rango de 0 a 1, se puede jugar con este valor
para encontrar uno que convenga 