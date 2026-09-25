'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { skillGraph } from '@/lib/skill-graph';

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
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const data: GraphData = {
      nodes: skillGraph.nodes.map((node) => ({ ...node })),
      links: skillGraph.links.map((link) => ({ ...link })),
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
      .style('min-width', '640px')
      .style('height', 'auto')
      .style('display', 'block')
      .attr('role', 'img')
      .attr(
        'aria-label',
        'Technology skills grouped by Web, Databases, Tools, DevOps, Data Analysis, and AI'
      )
      .attr('viewBox', `0 0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMidYMid meet');

    // Tonal hierarchy shares the atlas palette without relying on color alone.
    const color = d3.scaleOrdinal(['#edf1ff', '#b7c8ff', '#829fca', '#6d8aa6']);

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

    // Drag keeps the original exploratory interaction.
    function drag(simulation: d3.Simulation<Node, Link>) {
      function dragstarted(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        if (!event.active && !reducedMotion)
          simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node
      ) {
        d.fx = event.x;
        d.fy = event.y;
        if (reducedMotion) {
          d.x = event.x;
          d.y = event.y;
          draw();
        }
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
      .attr('stroke', '#7387b4')
      .attr('stroke-opacity', 0.45)
      .attr('stroke-width', 1.5);

    // === 6) Draw the Nodes (as circles) ===
    const node = svg
      .selectAll<SVGCircleElement, Node>('.node')
      .data(data.nodes)
      .enter()
      .append('circle')
      .attr('class', 'node')
      .attr('r', (d) => (d.group === 0 ? 12 : d.group === 1 ? 9 : 6))
      .attr('stroke', '#c3d0f4')
      .attr('stroke-width', (d) => (d.group < 2 ? 1.5 : 0.5))
      .attr('fill', (d) => color(d.group.toString()))
      .style('touch-action', 'none')
      .style('cursor', 'grab')
      .call(drag(simulation)); // attach the drag behavior

    // === 7) (Optional) Add Text Labels ===
    const label = svg
      .selectAll<SVGTextElement, Node>('text')
      .data(data.nodes)
      .enter()
      .append('text')
      .text((d) => d.id)
      .attr('text-anchor', 'middle')
      .attr('dy', 26)
      .style('font-family', 'var(--font-sans), sans-serif')
      .style('font-size', '16px')
      .style('pointer-events', 'none')
      .style('fill', '#d5ddef');

    // === 8) On each tick, update positions of nodes & links ===
    const labelWidths = new Map<string, number>();
    label.each(function (d) {
      labelWidths.set(d.id, this.getComputedTextLength());
    });
    function draw() {
      // Keep nodes and their labels inside the diagram, including after dragging.
      keepInBounds();
      link
        .attr('x1', (d: Link) => (d.source as Node).x ?? 0)
        .attr('y1', (d: Link) => (d.source as Node).y ?? 0)
        .attr('x2', (d: Link) => (d.target as Node).x ?? 0)
        .attr('y2', (d: Link) => (d.target as Node).y ?? 0);

      node.attr('cx', (d) => d.x ?? 0).attr('cy', (d) => d.y ?? 0);

      label.attr('x', (d) => d.x ?? 0).attr('y', (d) => d.y ?? 0);
    }

    function keepInBounds() {
      data.nodes.forEach((d) => {
        const halfLabel = (labelWidths.get(d.id) ?? 100) / 2;
        d.x = Math.max(
          halfLabel + 20,
          Math.min(width - halfLabel - 20, d.x ?? width / 2)
        );
        d.y = Math.max(24, Math.min(height - 40, d.y ?? height / 2));
      });
    }
    simulation.force(
      'collision',
      d3
        .forceCollide<Node>()
        .radius((d) => Math.max(36, (labelWidths.get(d.id) ?? 100) / 2 + 12))
        .iterations(3)
    );
    simulation.force('bounds', keepInBounds);
    // Settle before painting instead of making visitors watch the force layout.
    simulation.stop().tick(250);
    draw();
    simulation.on('tick', draw);

    // === 9) Cleanup on unmount ===
    return () => {
      // Remove the SVG so it doesn't duplicate if this component re-mounts
      svg.remove();
      simulation.stop();
    };
  }, [reducedMotion]);

  return (
    <div className="mx-auto mt-8 w-full max-w-4xl">
      <p className="text-center text-sm text-muted-foreground sm:hidden">
        Swipe across the diagram to explore the skills.
      </p>
      <div
        ref={containerRef}
        tabIndex={0}
        role="region"
        aria-label="Skills diagram"
        className="skills-diagram w-full overflow-x-auto border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      />
    </div>
  );
};

export default TechSkillsTree;
