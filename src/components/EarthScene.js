import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { feature } from 'topojson-client';

import { assetPath } from '@/lib/asset-path';
import globalParticles from '@/lib/globe-particles.json';

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

// Custom Shader for Circular Particles
const createParticleMaterial = (color, pointScale) =>
  new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color(color) },
      pointScale: { value: pointScale },
    },
    vertexShader: `
    uniform float pointScale;
    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = 15.0 * pointScale * (1.0 / -mvPosition.z);
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

const EarthScene = ({ paused = false }) => {
  const mountRef = useRef(null);
  const pauseRef = useRef(paused);
  const updateAnimationRef = useRef(null);

  useEffect(() => {
    pauseRef.current = paused;
    updateAnimationRef.current?.();
  }, [paused]);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) return;
    const controller = new AbortController();
    const globe = new THREE.Group();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame;
    let disposed = false;
    let inView = true;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountNode.clientWidth / Math.max(1, mountNode.clientHeight),
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

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
    mountNode.appendChild(renderer.domElement);
    camera.position.z = 2.85;

    scene.add(globe);
    globe.scale.set(1.45, 1.45, 1.45);
    globe.rotation.z = -0.18;

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
          opacity: 0.2,
        });

        const particles = new THREE.BufferGeometry();
        const positions = [];
        const borderPositions = [];

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
              for (let i = 1; i < points.length; i++) {
                borderPositions.push(
                  ...points[i - 1].toArray(),
                  ...points[i].toArray()
                );
              }
            });
          });
        });

        // One draw call for all borders instead of one per country ring.
        const borders = new THREE.BufferGeometry();
        borders.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(borderPositions, 3)
        );
        globe.add(new THREE.LineSegments(borders, lineMaterial));

        // Generate globally distributed land particles
        globalParticles.forEach(([lon, lat]) => {
          const pos = latLonToXYZ(lat, lon, 1.02);
          positions.push(pos.x, pos.y, pos.z);
        });

        particles.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(positions, 3)
        );

        // White glowing land particles (Circular)
        const pointScale = Math.min(1, mountNode.clientWidth / 600);
        const landParticleMaterial = createParticleMaterial(
          0xc7d5ed,
          pointScale
        );
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
        const cityParticleMaterial = createParticleMaterial(
          0x899cff,
          pointScale
        );
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
    let lastFrame = 0;
    const animate = (now = 0) => {
      if (
        disposed ||
        document.hidden ||
        !inView ||
        reducedMotion.matches ||
        pauseRef.current
      )
        return;
      animationFrame = requestAnimationFrame(animate);
      if (now - lastFrame < 1000 / 30) return;
      globe.rotation.y += Math.min(now - lastFrame, 100) * 0.00003;
      lastFrame = now;
      renderer.render(scene, camera);
    };

    animate();
    const updateAnimation = () => {
      cancelAnimationFrame(animationFrame);
      lastFrame = performance.now();
      animate();
      renderer.render(scene, camera);
    };
    updateAnimationRef.current = updateAnimation;
    document.addEventListener('visibilitychange', updateAnimation);
    reducedMotion.addEventListener('change', updateAnimation);

    const visibility = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      updateAnimation();
    });
    visibility.observe(mountNode);

    // Handle resize
    const handleResize = () => {
      camera.aspect =
        mountNode.clientWidth / Math.max(1, mountNode.clientHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(mountNode.clientWidth, mountNode.clientHeight);
      globe.traverse((object) => {
        if (object.material?.uniforms?.pointScale)
          object.material.uniforms.pointScale.value = Math.min(
            1,
            mountNode.clientWidth / 600
          );
      });
      renderer.render(scene, camera);
    };

    const resize = new ResizeObserver(handleResize);
    resize.observe(mountNode);

    return () => {
      disposed = true;
      updateAnimationRef.current = null;
      controller.abort();
      cancelAnimationFrame(animationFrame);
      resize.disconnect();
      visibility.disconnect();
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

  return <div ref={mountRef} aria-hidden="true" className="earth-scene" />;
};

export default EarthScene;
