
import * as d3 from 'd3';

// Helper function to calculate hierarchical positions
const calculatePositions = (steps, centerY, depth = 0, branchIndex = 0, parentIndex = 0, parentX = 0) => {
    const nodeDistance = 100; // Distance between nodes vertically
    const branchDistance = 50; // Distance between branches horizontally

    return steps.map((step, index) => {
        const x = index === 0 ? parentX + nodeDistance : parentX + (index + 1) * nodeDistance;
        const y = depth === 0
            ? centerY
            : parentIndex % 2 === 0
                ? branchIndex % 2 === 0
                    ? centerY - (parentIndex - (branchIndex + depth)) * branchDistance
                    : centerY + (parentIndex - ((branchIndex - 1) + depth)) * branchDistance
                : branchIndex % 2 === 0
                    ? centerY - (parentIndex - (branchIndex + depth)) * branchDistance
                    : centerY + (parentIndex - ((branchIndex - 1) + depth)) * branchDistance;
        return {
            ...step,
            x,
            y,
        };
    });
};

const processSteps = (steps, width, height, color, branchIndex = 0, parent = null, parentIndex = 0, depth = 0, parentX = 0) => {

    const nodes = [];
    const links = [];
    const branches = [];

    const positionedSteps = calculatePositions(steps, height / 2, depth, branchIndex, parentIndex, parentX);

    positionedSteps.forEach((step, index) => {
        nodes.push({
            id: step.id,
            title: step.title,
            x: step.x,
            y: step.y,
            color: color,
        });
        if (parent && index == 0) {
            links.push({
                source: parent.id,
                target: step.id,
                color
            });
        } else if (nodes.length > 1) {
            links.push({
                source: nodes[depth * index].id,
                target: step.id,
                color
            });
        }
        if (step.branches) {
            step.branches.forEach((branch, branchIndex) => {
                branches.push({
                    color: branch.color,
                    steps: branch.steps,
                });
                const {
                    nodes: subNodes,
                    links: subLinks,
                    branches: subBranches
                } = processSteps(branch.steps, width, height, branch.color, branchIndex, step, index, depth + 1, step.x);
                nodes.push(...subNodes)
                links.push(...subLinks)
                branches.push(...subBranches)
            });
        }
    });

    return { nodes, links, branches }
}

const DrawBranch = (svg, branch, width, height) => {
    if (!svg) throw new Error('svg require as HTMLELement');
    if (typeof branch !== 'object') throw new Error('branch require as object')
    const { nodes, links, branches } = processSteps(branch.steps, width, height, branch.color);

    // Create links
    svg.selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('x1', d => nodes.find(n => n.id === d.source).x)
        .attr('y1', d => nodes.find(n => n.id === d.source).y)
        .attr('x2', d => nodes.find(n => n.id === d.target).x)
        .attr('y2', d => nodes.find(n => n.id === d.target).y)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2);

    // Create nodes
    svg.selectAll('circle')
        .data(nodes)
        .enter().append('circle')
        .attr('r', 7)
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('fill', d => d.color)
        .append('title')
        .text(d => d.title);

    svg.selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y - 10) // Adjust position above the node
        .attr('text-anchor', 'middle') // Center the text horizontally
        .attr('fill', 'black')
        .text(d => d.title);

    // Create branch paths
    svg.selectAll('path.branch')
        .data(branches)
        .enter().append('path')
        .attr('class', 'branch')
        .attr('d', branch => {
            const path = d3.path();
            branch.steps.forEach((step, i) => {
                if (i === 0) {
                    path.moveTo(nodes.find(n => n.id === step.id).x, nodes.find(n => n.id === step.id).y);
                } else {
                    path.lineTo(nodes.find(n => n.id === step.id).x, nodes.find(n => n.id === step.id).y);
                }
            });
            return path.toString();
        })
        .attr('stroke', d => d.color)
        .attr('stroke-width', 2)
        .attr('fill', 'none');
}

export default DrawBranch