'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

interface Node extends d3.SimulationNodeDatum {
  id: string;
  group: number;
  x?: number;
  y?: number;
  z?: number;
  fx?: number | null;
  fy?: number | null;
  fz?: number | null;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: Node | string;
  target: Node | string;
}

interface GraphData {
  nodes: Node[];
  links: Link[];
}

const TechSkillsTree = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Skill Tree Data
    const data: GraphData = {
      nodes: [
        { id: 'yma2022', group: 0 },
        { id: 'Web', group: 1 },
        { id: 'CSS', group: 2 },
        { id: 'Bootstrap', group: 3 },
        { id: 'TailwindCSS', group: 3 },
        { id: 'HTML', group: 2 },
        { id: 'JavaScript', group: 2 },
        { id: 'TypeScript', group: 3 },
        { id: 'Node.js', group: 3 },
        { id: 'Next.js', group: 3 },
        { id: 'D3.js', group: 3 },
        { id: 'Three.js', group: 3 },
        { id: 'TopoJSON', group: 3 },
        { id: 'React', group: 3 },
        { id: 'React Native', group: 3 },
        { id: 'NPM', group: 3 },
        { id: 'Yarn', group: 3 },

        // Databases
        { id: 'Databases', group: 1 },
        { id: 'SQL', group: 2 },
        { id: 'PostgreSQL', group: 3 },
        { id: 'MySQL', group: 3 },
        { id: 'NoSQL', group: 2 },
        { id: 'MongoDB', group: 3 },
        { id: 'Firebase', group: 3 },

        // DevOps & Tools
        { id: 'Tools', group: 1 },
        { id: 'Docker', group: 2 },
        { id: 'Kubernetes', group: 2 },
        { id: 'AWS', group: 2 },
        { id: 'CI/CD', group: 2 },
        { id: 'Unix/Linux', group: 2 },
        { id: 'Git', group: 2 },

        // DevOps
        { id: 'DevOps', group: 1 },
        { id: 'Prometheus', group: 2 },
        { id: 'Metricbeat', group: 2 },
        { id: 'Elasticsearch', group: 2 },
        { id: 'Fluentd', group: 2 },
        { id: 'Kibana', group: 2 },

        // Data Analysis
        { id: 'Data Analysis', group: 1 },
        { id: 'NumPy', group: 2 },
        { id: 'Pandas', group: 2 },
        { id: 'SciPy', group: 2 },
        { id: 'Scikit-learn', group: 2 },

        // AI
        { id: 'AI', group: 1 },
        { id: 'PyTorch', group: 2 },
        { id: 'Tiktoken', group: 2 },
        { id: 'OpenAI', group: 2 },
        { id: 'LangChain', group: 2 },
        { id: 'LangGraph', group: 2 },
        { id: 'LangChain4j', group: 2 },
      ],

      links: [
        // Web Technologies
        { source: 'yma2022', target: 'Web' },
        { source: 'Web', target: 'CSS' },
        { source: 'CSS', target: 'Bootstrap' },
        { source: 'CSS', target: 'TailwindCSS' },
        { source: 'Web', target: 'HTML' },
        { source: 'Web', target: 'JavaScript' },
        { source: 'JavaScript', target: 'TypeScript' },
        { source: 'JavaScript', target: 'Node.js' },
        { source: 'JavaScript', target: 'Next.js' },
        { source: 'JavaScript', target: 'D3.js' },
        { source: 'JavaScript', target: 'Three.js' },
        { source: 'JavaScript', target: 'TopoJSON' },
        { source: 'JavaScript', target: 'React' },
        { source: 'JavaScript', target: 'React Native' },
        { source: 'JavaScript', target: 'NPM' },
        { source: 'JavaScript', target: 'Yarn' },

        // Databases
        { source: 'yma2022', target: 'Databases' },
        { source: 'Databases', target: 'SQL' },
        { source: 'SQL', target: 'PostgreSQL' },
        { source: 'SQL', target: 'MySQL' },
        { source: 'Databases', target: 'NoSQL' },
        { source: 'NoSQL', target: 'MongoDB' },
        { source: 'NoSQL', target: 'Firebase' },

        // DevOps & Tools
        { source: 'yma2022', target: 'Tools' },
        { source: 'Tools', target: 'Docker' },
        { source: 'Tools', target: 'Kubernetes' },
        { source: 'Tools', target: 'AWS' },
        { source: 'Tools', target: 'CI/CD' },
        { source: 'Tools', target: 'Unix/Linux' },
        { source: 'Tools', target: 'Git' },

        // Monitoring & Observability
        { source: 'yma2022', target: 'DevOps' },
        { source: 'DevOps', target: 'Prometheus' },
        { source: 'DevOps', target: 'Metricbeat' },
        { source: 'DevOps', target: 'Elasticsearch' },
        { source: 'DevOps', target: 'Fluentd' },
        { source: 'DevOps', target: 'Kibana' },

        // Data Analysis
        { source: 'yma2022', target: 'Data Analysis' },
        { source: 'Data Analysis', target: 'PyTorch' },
        { source: 'Data Analysis', target: 'NumPy' },
        { source: 'Data Analysis', target: 'Pandas' },
        { source: 'Data Analysis', target: 'SciPy' },
        { source: 'Data Analysis', target: 'Scikit-learn' },

        // AI
        { source: 'yma2022', target: 'AI' },
        { source: 'AI', target: 'PyTorch' },
        { source: 'AI', target: 'Tiktoken' },
        { source: 'AI', target: 'OpenAI' },
        { source: 'AI', target: 'LangChain' },
        { source: 'AI', target: 'LangGraph' },
        { source: 'AI', target: 'LangChain4j' },
      ],
    };
    data.links = data.links.map((link) => {
      const sourceNode = data.nodes.find((n) => n.id === link.source);
      const targetNode = data.nodes.find((n) => n.id === link.target);
      if (!sourceNode || !targetNode) {
        throw new Error(`Invalid link: ${link.source} -> ${link.target}`);
      }
      return {
        source: sourceNode,
        target: targetNode,
      } as Link;
    });
    // Three.js setup
    const width = containerRef.current.clientWidth;
    const height = 800;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 2000);
    camera.position.z = 1000;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableRotate = true;
    controls.enableZoom = true;
    controls.enablePan = true;

    // D3 Force Simulation
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3
          .forceLink(data.links)
          .id((d: d3.SimulationNodeDatum) => (d as Node).id)
          .distance(150)
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('center', d3.forceCenter(0, 0))
      .alphaDecay(0.05)
      .velocityDecay(0.6);

    // Three.js objects
    const nodeMeshes: THREE.Mesh[] = [];
    const labelSprites: THREE.Sprite[] = [];
    const linkLines: THREE.Line[] = [];
    const groupColors = [0xff5733, 0x3498db, 0x2ecc71, 0x9b59b6];

    // Function to create text labels
    const createTextSprite = (text: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d')!;
      context.font = 'bold 40px Arial';
      context.fillStyle = 'white';
      context.fillText(text, 0, 40);

      const texture = new THREE.CanvasTexture(canvas);
      const material = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(material);
      sprite.scale.set(150, 75, 1);
      return sprite;
    };

    // Create nodes and labels
    data.nodes.forEach((node) => {
      const geometry = new THREE.SphereGeometry(10, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: groupColors[node.group],
      });
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      nodeMeshes.push(mesh);

      // Create label
      const label = createTextSprite(node.id);
      scene.add(label);
      labelSprites.push(label);
    });

    // Create links
    const linkMaterial = new THREE.LineBasicMaterial({ color: 0xcccccc });
    data.links.forEach(() => {
      const geometry = new THREE.BufferGeometry();
      const line = new THREE.Line(geometry, linkMaterial);
      scene.add(line);
      linkLines.push(line);
    });

    // Drag functionality
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let selectedNode: Node | null = null;
    const initialMousePos = new THREE.Vector2();
    const initialNodePos = new THREE.Vector3();

    const onMouseDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // Raycast to find nodes
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const index = nodeMeshes.indexOf(intersects[0].object as THREE.Mesh);
        selectedNode = data.nodes[index];
        initialMousePos.set(event.clientX, event.clientY);
        initialNodePos.set(
          selectedNode.x ?? 0,
          selectedNode.y ?? 0,
          selectedNode.z ?? 0
        );

        selectedNode.fx = selectedNode.x;
        selectedNode.fy = selectedNode.y;
        selectedNode.fz = selectedNode.z;

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      }
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!selectedNode) return;

      const deltaX = event.clientX - initialMousePos.x;
      const deltaY = event.clientY - initialMousePos.y;

      const delta = new THREE.Vector3(
        deltaX * 0.5,
        -deltaY * 0.5,
        0
      ).applyQuaternion(camera.quaternion);

      selectedNode.fx = initialNodePos.x + delta.x;
      selectedNode.fy = initialNodePos.y + delta.y;
      selectedNode.fz = initialNodePos.z + delta.z;
      simulation.alpha(1).restart();
    };

    const onMouseUp = () => {
      if (selectedNode) {
        selectedNode.fx = null;
        selectedNode.fy = null;
        selectedNode.fz = null;
        selectedNode = null;
      }
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    renderer.domElement.addEventListener('mousedown', onMouseDown);

    // Animation loop
    simulation.on('tick', () => {
      nodeMeshes.forEach((mesh, i) => {
        const node = data.nodes[i];
        mesh.position.set(node.x || 0, node.y || 0, node.z || 0);
        labelSprites[i].position.set(
          node.x || 0,
          (node.y || 0) + 15,
          node.z || 0
        );
      });

      linkLines.forEach((line, i) => {
        const link = data.links[i];
        const source = link.source as Node;
        const target = link.target as Node;
        const points = [
          new THREE.Vector3(source.x || 0, source.y || 0, source.z || 0),
          new THREE.Vector3(target.x || 0, target.y || 0, target.z || 0),
        ];
        line.geometry.setFromPoints(points);
      });
    });

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.domElement.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      simulation.stop();
      controls.dispose();
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '800px' }} />;
};

export default TechSkillsTree;
