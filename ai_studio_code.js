// --- 3D GLOBE (Three.js) ---
const canvas = document.querySelector('#hero-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Create a wireframe sphere (Globe)
const geometry = new THREE.IcosahedronGeometry(2, 2);
const material = new THREE.MeshBasicMaterial({ 
    color: 0x3b82f6, 
    wireframe: true,
    transparent: true,
    opacity: 0.2
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add some floating points (Stars)
const pointsGeometry = new THREE.BufferGeometry();
const pointsCount = 500;
const posArray = new Float32Array(pointsCount * 3);

for(let i = 0; i < pointsCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10;
}
pointsGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
const pointsMaterial = new THREE.PointsMaterial({ size: 0.005, color: 0xffffff });
const particlesMesh = new THREE.Points(pointsGeometry, pointsMaterial);
scene.add(particlesMesh);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.002;
    sphere.rotation.x += 0.001;
    particlesMesh.rotation.y -= 0.001;
    renderer.render(scene, camera);
}

// Handle Resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// --- GSAP ANIMATIONS ---

// Hero Entrance
window.onload = () => {
    gsap.to("#hero-title", { opacity: 1, y: 0, duration: 1.5, ease: "power4.out" });
    gsap.to("#hero-subtitle", { opacity: 1, y: 0, duration: 1.5, delay: 0.3, ease: "power4.out" });
};

// Scroll Reveal Logic
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            gsap.to(entry.target, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        }
    });
}, observerOptions);

document.querySelectorAll('.section-reveal').forEach(section => {
    observer.observe(section);
});

// Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}