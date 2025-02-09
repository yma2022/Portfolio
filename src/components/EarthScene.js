import { useEffect, useRef } from 'react';
import { geoContains } from 'd3-geo';
import * as THREE from 'three';
import { feature } from 'topojson-client';

// Function to convert lat/lon to 3D sphere coordinates
const latLonToXYZ = (lat, lon, radius = 1) => {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
};

// Lambert Equal-Area Projection Sampling for Uniform Distribution
const randomPointOnSphere = () => {
  const u = Math.random();
  const v = Math.random();
  const theta = 2 * Math.PI * u;
  const phi = Math.acos(2 * v - 1);
  return {
    lon: (theta * 180) / Math.PI - 180,
    lat: (phi * 180) / Math.PI - 90,
  };
};

// Generate globally spread land particles
const generateGlobalParticles = (countries, totalParticles = 500) => {
  const particles = [];
  let attempts = 0;

  while (particles.length < totalParticles && attempts < totalParticles * 10) {
    const { lon, lat } = randomPointOnSphere();
    if (countries.some((country) => geoContains(country, [lon, lat]))) {
      particles.push([lon, lat]);
    }
    attempts++;
  }

  return particles;
};

// Custom Shader for Circular Particles
const createParticleMaterial = (color) =>
  new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
    },
    vertexShader: `
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 15.0 * (1.0 / -mvPosition.z); // Adjust size dynamically
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    fragmentShader: `
    uniform vec3 color;
    void main() {
      float distanceToCenter = length(gl_PointCoord - vec2(0.5));
      if (distanceToCenter > 0.5) discard; // Make particles circular
      gl_FragColor = vec4(color, 1.0 - distanceToCenter * 2.0);
    }
  `,
    transparent: true,
    blending: THREE.AdditiveBlending,
  });

const EarthScene = () => {
  const mountRef = useRef(null);
  const globeRef = useRef(new THREE.Group());

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);
    camera.position.z = 3;

    scene.add(globeRef.current);

    // Load world map and cities data
    Promise.all([
      fetch('/world-110m.json').then((res) => res.json()),
      fetch('/cities.json').then((res) => res.json()),
    ]).then(([worldData, citiesData]) => {
      const countries = feature(
        worldData,
        worldData.objects.countries
      ).features;
      const cities = citiesData.features;

      // Create country borders with a glowing effect
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x000000, // Glowing white color
        transparent: true,
        opacity: 0.0,
      });

      const particles = new THREE.BufferGeometry();
      const positions = [];

      countries.forEach((country) => {
        if (!country.geometry) return;

        const polygons =
          country.geometry.type === 'Polygon'
            ? [country.geometry.coordinates]
            : country.geometry.coordinates;

        // Draw country borders
        polygons.forEach((polygon) => {
          polygon.forEach((ring) => {
            const points = ring.map(([lon, lat]) =>
              latLonToXYZ(lat, lon, 1.01)
            );
            if (points.length > 1) {
              const geometry = new THREE.BufferGeometry().setFromPoints(points);
              const line = new THREE.Line(geometry, lineMaterial);
              globeRef.current.add(line);
            }
          });
        });
      });

      // Generate globally distributed land particles
      const globalParticles = generateGlobalParticles(countries, 500);
      globalParticles.forEach(([lon, lat]) => {
        const pos = latLonToXYZ(lat, lon, 1.02);
        positions.push(pos.x, pos.y, pos.z);
      });

      particles.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      );

      // White glowing land particles (Circular)
      const landParticleMaterial = createParticleMaterial(0xffffff);
      const landParticleSystem = new THREE.Points(
        particles,
        landParticleMaterial
      );
      globeRef.current.add(landParticleSystem);

      // **Cities: Red Glowing Circular Particles**
      const cityParticles = new THREE.BufferGeometry();
      const cityPositions = [];

      cities.forEach((city) => {
        const lat = city.properties.lat;
        const lon = city.properties.lon;

        if (lat === undefined || lon === undefined) {
          console.warn('City missing lat/lon:', city);
          return;
        }

        const pos = latLonToXYZ(lat, lon, 1.05); // Cities slightly raised
        cityPositions.push(pos.x, pos.y, pos.z);
      });

      cityParticles.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(cityPositions, 3)
      );

      // Red glowing circular city particles
      const cityParticleMaterial = createParticleMaterial(0xff0000);
      const cityParticleSystem = new THREE.Points(
        cityParticles,
        cityParticleMaterial
      );
      globeRef.current.add(cityParticleSystem);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      globeRef.current.rotation.y += 0.002;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (mountRef.current) mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: -1 }}
    />
  );
};

export default EarthScene;
