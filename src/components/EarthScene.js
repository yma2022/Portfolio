import { useEffect, useRef } from 'react';
import { geoContains } from 'd3-geo';
import * as THREE from 'three';
import { feature } from 'topojson-client';

import { assetPath } from '@/lib/asset-path';

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

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;
    const controller = new AbortController();
    const globe = new THREE.Group();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame;
    let disposed = false;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // The decorative background is optional on devices without WebGL.
      return;
    }
    renderer.setClearColor(0x000000, 0);

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountNode.appendChild(renderer.domElement);
    camera.position.z = 3;

    scene.add(globe);
    globe.scale.set(1.5, 1.5, 1.5);

    // Load world map and cities data
    Promise.all([
      ...['/world-110m.json', '/cities.json'].map(async (path) => {
        const res = await fetch(assetPath(path), { signal: controller.signal });
        if (!res.ok) throw new Error('Unable to load globe data');
        return res.json();
      }),
    ])
      .then(([worldData, citiesData]) => {
        if (disposed) return;
        const countries = feature(
          worldData,
          worldData.objects.countries
        ).features;
        const cities = citiesData.features;

        // Create country borders with a glowing effect
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.08,
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
                const geometry = new THREE.BufferGeometry().setFromPoints(
                  points
                );
                const line = new THREE.Line(geometry, lineMaterial);
                globe.add(line);
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
        globe.add(landParticleSystem);

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

        // Brand indigo glowing circular city particles
        const cityParticleMaterial = createParticleMaterial(0x6366f1);
        const cityParticleSystem = new THREE.Points(
          cityParticles,
          cityParticleMaterial
        );
        globe.add(cityParticleSystem);
        renderer.render(scene, camera);
      })
      .catch(() => {
        // Keep the page usable if the optional map assets cannot be loaded.
      });

    // Animation loop
    const animate = () => {
      if (disposed || document.hidden || reducedMotion.matches) return;
      animationFrame = requestAnimationFrame(animate);
      globe.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();
    const updateAnimation = () => {
      cancelAnimationFrame(animationFrame);
      animate();
      renderer.render(scene, camera);
    };
    document.addEventListener('visibilitychange', updateAnimation);
    reducedMotion.addEventListener('change', updateAnimation);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.render(scene, camera);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      disposed = true;
      controller.abort();
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', updateAnimation);
      reducedMotion.removeEventListener('change', updateAnimation);
      const materials = new Set();
      globe.traverse((object) => {
        object.geometry?.dispose();
        if (object.material) materials.add(object.material);
      });
      materials.forEach((material) => material.dispose());
      globe.clear();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
        pointerEvents: 'none',
        opacity: 0.45,
      }}
    />
  );
};

export default EarthScene;
