'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

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
    const width = 928;
    const height = 928;

    // === 2) Create an SVG inside the container ===
    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .style('width', '100%')
      .style('height', '100%')
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // A color scale for groups
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    // === 3) Create a Force Simulation ===
    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3
          .forceLink(data.links)
          .id((d: d3.SimulationNodeDatum) => (d as Node).id)
          .distance(120)
      )
      .force('charge', d3.forceManyBody().strength(-300)) // repulsion
      .force('center', d3.forceCenter(width / 2, height / 2)) // center
      .force('x', d3.forceX(width / 2).strength(0.05)) // pull toward center x
      .force('y', d3.forceY(height / 2).strength(0.05)) // pull toward center y
      .force('collision', d3.forceCollide(30)); // prevents overlap

    // === 4) Define the Drag Behavior (your snippet) ===
    function drag(simulation: d3.Simulation<Node, Link>) {
      function dragstarted(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag<SVGCircleElement, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }

    // === 5) Draw the Links (as lines) ===
    const link = svg
      .selectAll<SVGLineElement, Link>('.link')
      .data(data.links)
      .enter()
      .append('line')
      .attr('class', 'link')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5);

    // === 6) Draw the Nodes (as circles) ===
    const node = svg
      .selectAll<SVGCircleElement, Node>('.node')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', 8)
      .attr('fill', (d) => color(d.group.toString()))
      .style('touch-action', 'none')
      .call(drag(simulation)); // attach the drag behavior

    // === 7) (Optional) Add Text Labels ===
    const label = svg
      .selectAll<SVGTextElement, Node>('text')
      .data(data.nodes)
      .enter()
      .append('text')
      .text((d) => d.id)
      .attr('dx', 12)
      .attr('dy', '0.35em')
      .style('font-family', 'sans-serif')
      .style('font-size', '12px')
      .style('fill', '#fff');

    // === 8) On each tick, update positions of nodes & links ===
    simulation.on('tick', () => {
      link
        .attr('x1', (d: Link) => (d.source as Node).x ?? 0)
        .attr('y1', (d: Link) => (d.source as Node).y ?? 0)
        .attr('x2', (d: Link) => (d.target as Node).x ?? 0)
        .attr('y2', (d: Link) => (d.target as Node).y ?? 0);

      node.attr('cx', (d) => d.x ?? 0).attr('cy', (d) => d.y ?? 0);

      label.attr('x', (d) => d.x ?? 0).attr('y', (d) => d.y ?? 0);
    });

    // === 9) Cleanup on unmount ===
    return () => {
      // Remove the SVG so it doesn't duplicate if this component re-mounts
      svg.remove();
      simulation.stop();
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default TechSkillsTree;
