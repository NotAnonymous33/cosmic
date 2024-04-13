import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Scene() {
    const planetRef = useRef([]);

    useEffect(() => {
        console.log("Setup started"); // Check if this logs once or multiple times

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('root').appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 3, 5);
        scene.add(directionalLight);

        const sun = createSphere(10, 32, new THREE.MeshBasicMaterial({ color: 0xFFFF00 })); // Increased size from 5 to 10
        scene.add(sun);


        const planetData = [
            { name: "Mercury", distance: 20, size: 0.5, color: 0x918E8E, speed: 0.45 },
            { name: "Venus", distance: 30, size: 0.9, color: 0xE1D95F, speed: 0.35 },
            { name: "Earth", distance: 40, size: 1.0, color: 0x1F75FE, speed: 0.3 },
            { name: "Mars", distance: 50, size: 0.6, color: 0xFF2F02, speed: 0.27 },
            { name: "Jupiter", distance: 70, size: 5.5, color: 0xFFC300, speed: 0.15 },
            { name: "Saturn", distance: 85, size: 4.5, color: 0xF4C542, speed: 0.12 },
            { name: "Uranus", distance: 100, size: 2.0, color: 0x73C2FB, speed: 0.09 },
            { name: "Neptune", distance: 110, size: 1.9, color: 0x4D4DFF, speed: 0.08 }
        ];


        planetData.forEach(data => {
            const planet = createSphere(data.size, 16, new THREE.MeshLambertMaterial({ color: data.color }));
            planet.orbitRadius = data.distance;
            planet.rotationSpeed = data.speed;
            planet.spinSpeed = 0.1; // Uniform spin speed for simplicity; adjust as needed
            planet.angle = 0;
            planet.rotation.y = 0; // Initial rotation around its axis
            scene.add(planet);
            planetRef.current.push(planet);
        });


        addAsteroidBelt(scene);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.update();

        let lastTime = performance.now();

        function animate(time) {
            const deltaTime = (time - lastTime) * 0.001; // convert to seconds
            lastTime = time;

            planetRef.current.forEach(planet => {
                planet.angle += deltaTime * planet.rotationSpeed;
                planet.position.x = planet.orbitRadius * Math.cos(planet.angle);
                planet.position.z = planet.orbitRadius * Math.sin(planet.angle);
            });

            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }

        requestAnimationFrame(animate); // Initial call to animate

        return () => {
            console.log("Cleanup called"); // Check if cleanup happens unexpectedly
            renderer.dispose(); // Cleanup renderer when component unmounts
        };
    }, []);

    return null;
}

function createSphere(radius, segments, material) {
    const geometry = new THREE.SphereGeometry(radius, segments, segments);
    return new THREE.Mesh(geometry, material);
}

function addAsteroidBelt(scene) {
    const asteroidMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
    // Set the range of the asteroid belt between Mars and Jupiter
    const startRadius = 55; // Just beyond Mars
    const endRadius = 65; // Just before Jupiter
    const totalAsteroids = 1000; // Number of asteroids to generate

    for (let i = 0; i < totalAsteroids; i++) {
        const asteroid = createSphere(0.1, 6, asteroidMaterial);
        // Random radius between startRadius and endRadius
        const r = startRadius + Math.random() * (endRadius - startRadius);
        const angle = Math.random() * Math.PI * 2; // Random angle for full circle
        asteroid.position.set(Math.cos(angle) * r, 0, Math.sin(angle) * r);
        scene.add(asteroid);
    }
}

export default Scene;