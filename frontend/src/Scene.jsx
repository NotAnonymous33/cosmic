import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import sunTexture from "./textures/Sun2.png";
import EarthTexture from "./textures/Earth.png";
import MarsTexture from "./textures/Mars.png";
import MercutyTexture from "./textures/Mercury.png";
import VenusTexture from "./textures/Venus2.webp";
import SaturnTexture from "./textures/saturn.jpeg";
import UranusTexture from "./textures/uranus.webp";
import NeptuneTexture from "./textures/neptune.jpeg";
import JupiterTexture from "./textures/jupiter.jpeg";

import { texture } from "three/examples/jsm/nodes/Nodes.js";

function Scene() {
  const planetRef = useRef([]);

  useEffect(() => {
    console.log("Setup started"); // Check if this logs once or multiple times

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    const canvas = renderer.domElement;
    document.getElementById("root").appendChild(canvas);

    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);
    const load = new THREE.TextureLoader();
    const sunTextureData = load.load(sunTexture);

    const sun = createSphere(
      10,
      32,
      new THREE.MeshBasicMaterial({ map: sunTextureData })
    );
    scene.add(sun);

    const planetData = [
      {
        name: "Mercury",
        distance: 20,
        size: 0.5,
        color: 0x918e8e,
        speed: 0.45,
        texture: MercutyTexture,
      },
      {
        name: "Venus",
        distance: 30,
        size: 0.9,
        color: 0xe1d95f,
        speed: 0.35,
        texture: VenusTexture,
      },
      {
        name: "Earth",
        distance: 40,
        size: 1.0,
        color: 0x1f75fe,
        speed: 0.3,
        texture: EarthTexture,
      },
      {
        name: "Mars",
        distance: 50,
        size: 0.6,
        color: 0xff2f02,
        speed: 0.27,
        texture: MarsTexture,
      },
      {
        name: "Jupiter",
        distance: 70,
        size: 5.5,
        color: 0xffc300,
        speed: 0.15,
        texture: JupiterTexture,
      },
      {
        name: "Saturn",
        distance: 85,
        size: 4.5,
        color: 0xf4c542,
        speed: 0.12,
        texture: SaturnTexture,
      },
      {
        name: "Uranus",
        distance: 100,
        size: 2.0,
        color: 0x73c2fb,
        speed: 0.09,
        texture: UranusTexture,
      },
      {
        name: "Neptune",
        distance: 110,
        size: 1.9,
        color: 0x4d4dff,
        speed: 0.08,
        texture: NeptuneTexture,
      },
    ];

    const loader = new THREE.TextureLoader(); // Texture loader

    planetData.forEach((data) => {
      let material;
      if (data.texture) {
        const texture = loader.load(data.texture);
        material = new THREE.MeshBasicMaterial({ map: texture });
      } else {
        material = new THREE.MeshLambertMaterial({ color: data.color });
      }

      const planet = createSphere(data.size, 16, material);

      planet.orbitRadius = data.distance;
      planet.rotationSpeed = data.speed;
      planet.spinSpeed = 0.1;

      // Start with a random angle
      planet.angle = Math.random() * Math.PI * 2;

      // Set the initial position of the planet
      planet.position.x = planet.orbitRadius * Math.cos(planet.angle);
      planet.position.z = planet.orbitRadius * Math.sin(planet.angle);

      scene.add(planet);
      planetRef.current.push(planet);
    });

    addAsteroidBelt(scene);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    let lastTime = performance.now();

    function animate(time) {
      const deltaTime = (time - lastTime) * 0.0001; // convert to seconds
      lastTime = time;

      planetRef.current.forEach((planet) => {
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
      canvas.remove();
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
  const startRadius = 55; // Decreased this number
  const endRadius = 60; // Increased this number
  const totalAsteroids = 1500; // Number of asteroids to generate

  for (let i = 0; i < totalAsteroids; i++) {
    const asteroid = createSphere(0.1, 6, asteroidMaterial);

    // Random radius between startRadius and endRadius
    const r = startRadius + Math.random() * (endRadius - startRadius);
    const angle = Math.random() * Math.PI * 2; // Random angle for full circle

    // Inside the loop
    const verticalPosition = Math.random() * 10 - 5; // Random position between -5 and 5
    asteroid.position.set(
      Math.cos(angle) * r,
      verticalPosition,
      Math.sin(angle) * r
    );
    scene.add(asteroid);
  }
}

export default Scene;
