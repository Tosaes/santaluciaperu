const carouselContainer = document.querySelector('.carousel-container');
const carouselItems = document.querySelectorAll('.carousel-item');
const statusElement = document.getElementById('status');
let isPaused = false;

// Configuración del carrusel
const totalItems = carouselItems.length;
const radius = 400; // Radio del círculo
const angleStep = 360 / totalItems;

// Posicionar elementos en círculo 3D
function positionItems() {
    carouselItems.forEach((item, index) => {
        const angle = angleStep * index;
        const radian = (angle * Math.PI) / 180;
        
        // Calcular posición en 3D
        const x = radius * Math.sin(radian);
        const z = radius * Math.cos(radian);
        
        item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
    });
}

// Inicializar posiciones
positionItems();

// Control de pausa/reanudación
document.addEventListener('click', function(e) {
    // Evitar que el clic en enlaces active la pausa
    if (e.target.closest('a')) {
        return;
    }
    
    isPaused = !isPaused;
    
    if (isPaused) {
        carouselContainer.classList.add('paused');
        statusElement.textContent = 'Pausado - Haz clic para reanudar';
        statusElement.style.background = 'rgba(255, 100, 100, 0.3)';
    } else {
        carouselContainer.classList.remove('paused');
        statusElement.textContent = 'Girando - Haz clic para pausar';
        statusElement.style.background = 'rgba(255, 255, 255, 0.2)';
    }
});

// Prevenir que el clic en los elementos del carrusel active la pausa
carouselItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});

// Efecto de profundidad con el mouse
document.addEventListener('mousemove', function(e) {
    if (isPaused) {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        
        carouselContainer.style.transform = `rotateY(${mouseX * 10}deg) rotateX(${-mouseY * 10}deg)`;
    } else {
        carouselContainer.style.transform = '';
    }
});

// Ajustar radio en ventanas más pequeñas
window.addEventListener('resize', function() {
    if (window.innerWidth < 480) {
        // Ajustar para móviles
        carouselItems.forEach((item, index) => {
            const angle = angleStep * index;
            item.style.transform = `rotateY(${angle}deg) translateZ(${200}px)`;
        });
    } else if (window.innerWidth < 768) {
        // Ajustar para tablets
        carouselItems.forEach((item, index) => {
            const angle = angleStep * index;
            item.style.transform = `rotateY(${angle}deg) translateZ(${300}px)`;
        });
    } else {
        // Restaurar para desktop
        carouselItems.forEach((item, index) => {
            const angle = angleStep * index;
            item.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
        });
    }
});

console.log('Carrusel 3D inicializado correctamente');
console.log('Total de elementos:', totalItems);
console.log('Haz clic en la pantalla para pausar/reanudar');