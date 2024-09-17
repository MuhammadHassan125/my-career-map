
import * as d3 from 'd3';

const calculatePositions = (steps, centerY, depth = 0, branchIndex = 0, parentIndex = 0, parentX = 0) => {
    const nodeDistance = 138; 
    const branchDistance = 50; 

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
            description: step.description,
            skills:step.skills,
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

const DrawBranch = (svg, branch, width, height, setGetTitle, setGetDescription, setGettingSkillsData) => {
    if (!svg) throw new Error('svg required as HTMLElement');
    if (typeof branch !== 'object') throw new Error('branch requires an object');

    const { nodes, links, branches } = processSteps(branch.steps, width, height, branch.color);

    svg.selectAll('line')
        .data(links)
        .enter().append('line')
        .attr('x1', d => nodes.find(n => n.id === d.source).x)
        .attr('y1', d => nodes.find(n => n.id === d.source).y)
        .attr('x2', d => nodes.find(n => n.id === d.source).x)
        .attr('y2', d => nodes.find(n => n.id === d.source).y)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 6.5)
        .transition()
        .duration(1000)
        .attr('x2', d => nodes.find(n => n.id === d.target).x)
        .attr('y2', d => nodes.find(n => n.id === d.target).y)
    const firstNode = nodes[0]; 

    nodes.forEach((node, index) => {
        if (index === nodes.length - 1 || index === 0) {
            svg.append('circle')
                .attr('r', 8)
                .attr('cx', node.x)
                .attr('cy', node.y)
                .attr('fill', node.color)
                .on('mouseover', function () {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('r', 12);
                })
                .on('mouseout', function () {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('r', 8);
                })
                .on('click', (e,d) => {
                    console.log(firstNode.title);
                })
                .append('title')
                .text(firstNode.title);
        }
    });

    svg.selectAll('line.node-line')
        .data(nodes.slice(1)) 
        .enter().append('line')
        .attr('class', 'node-line')
        .attr('x1', d => d.x)
        .attr('y1', d => d.y - 8) 
        .attr('x2', d => d.x)
        .attr('y2', d => d.y)
        .attr('stroke', d => d.color)
        .attr('stroke-width', 3)
        .on('click', (e, d) => {
            console.log(d);
        });

    branches.forEach(branch => {
        const lastNode = nodes.find(n => n.id === branch.steps[branch.steps.length - 1].id);

        svg.append('circle')
            .attr('r', 8)
            .attr('cx', lastNode.x)
            .attr('cy', lastNode.y)
            .attr('fill', lastNode.color)
            .on('mouseover', function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 12);
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 8);
            })
            .on('click', (e, d) => {
                setGetTitle(lastNode.title)
                setGetDescription(lastNode.description)
                setGettingSkillsData(lastNode.skills)
                })
            .append('title')
            .text(lastNode.title);
    });

    svg.selectAll('path.branch')
        .data(branches)
        .enter().append('path')
        .attr('class', 'branch')
        .attr('d', branch => {
            const path = d3.path();
            branch.steps.forEach((step, i) => {
                const node = nodes.find(n => n.id === step.id);
                if (i === 0) {
                    path.moveTo(node.x, node.y);
                } else {
                    path.lineTo(node.x, node.y);
                }
            });
            return path.toString();
        })
        .attr('stroke', d => d.color)
        .attr('stroke-width', 6.5)
        .attr('fill', 'none')
        .attr('stroke-dasharray', function () {
            return this.getTotalLength();
        })
        .attr('stroke-dashoffset', function () {
            return this.getTotalLength();
        })
        .transition()
        .duration(1000)
        .attr('stroke-dashoffset', 0);

    svg.selectAll('text')
        .data(nodes)
        .enter().append('text')
        .attr('x', d => d.x)
        .attr('y', d => d.y - 12)
        .attr('text-anchor', 'middle')
        .attr('fill', 'black')
        .style('font-size', '9px')
        .text(d => d.title);
};

export default DrawBranch;
