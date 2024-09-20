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
            skills: step.skills,
            x: step.x,
            y: step.y,
            color: color,
        });
        if (parent && index === 0) {
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
                nodes.push(...subNodes);
                links.push(...subLinks);
                branches.push(...subBranches);
            });
        }
    });

    return { nodes, links, branches };
};


const DrawBranch = (svg, branch, width, height, setGetTitle, setGetDescription, setGettingSkillsData) => {
    if (!svg) throw new Error('svg required as HTMLElement');
    if (typeof branch !== 'object') throw new Error('branch requires an object');

    const tooltip = d3.select('body').append('div')
    .attr('class', 'tooltip')
    .style('position', 'absolute')
    .style('padding', '8px')
    .style('background', '#3749A6')
    .style('color', 'white')
    .style('border-radius', '4px')
    .style('font-size', '12px')
    .style('visibility', 'hidden')
    .style('pointer-events', 'none');

const tooltipWidth = 120; 
const tooltipHeight = 40; 

 const { nodes, links, branches } = processSteps(branch.steps, width, height, branch.color);
    const wrapText = (svg, text, x, y, fontSize, Color, Bold, splitText, lineValue, RightShift) => {
        const lineHeight = 12;
        const words = text.split(' ');
    
        const maxWordsPerLine = 2;
        const lines = [];
    
        for (let i = 0; i < words.length; i += maxWordsPerLine) {
            lines.push(words.slice(i, i + maxWordsPerLine).join(' '));
        }
    
        lines.forEach((line, i) => {
            svg.append('text')
                .attr('x', x )
                .attr('y', y + i * lineHeight + -10)
                .attr('text-anchor', 'middle')
                .attr('fill', Color)
                .style('font-weight', Bold)
                .style('font-size', fontSize)

                .text(line);
        });
    };



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
        .attr('y2', d => nodes.find(n => n.id === d.target).y);

   
// svg.selectAll('line.node-line')
// .data(nodes.slice(1))
// .enter().append('line')
// .attr('class', 'node-line')
// .attr('x1', d => d.x)
// .attr('y1', d => d.y - 8)
// .attr('x2', d => d.x)
// .attr('y2', d => d.y)
// .attr('stroke', d => d.color)
// .attr('stroke-width', 3)
// .style('cursor', 'pointer')
// .on('mouseover', function (event, d) {
//     setGetTitle(d.title);
//     setGetDescription(d.description);
//     setGettingSkillsData(d.skills);

//     tooltip.html(`Title: ${d.title}`)
//         .style('visibility', 'visible');
// })
// .on('mousemove', function (event) {
//     tooltip
//         .style('top', (event.pageY - tooltipHeight / 1.4) + 'px') 
//         .style('left', (event.pageX - tooltipWidth / 2) + 'px'); 
// })
// .on('mouseout', function () {
//     tooltip.style('visibility', 'hidden');
// });
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
    .style('cursor', 'pointer')
    .on('mouseover', function (event, d) {
        setGetTitle(d.title);
        setGetDescription(d.description);
        setGettingSkillsData(d.skills);
        tooltip.style('background', d.color);

        tooltip.html(`Title: ${d.title}`)
            .style('visibility', 'visible');
    })
    .on('mousemove', function (event) {
        tooltip
            .style('top', (event.pageY - tooltipHeight / 1.2) + 'px') 
            .style('left', (event.pageX - tooltipWidth / 2) + 'px'); 
    })
    .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
    });

    const firstNode = nodes[0];
    const lastNode = nodes[nodes.length - 1];

    [firstNode, lastNode].forEach(node => {
        svg.append('circle')
            .attr('r', 8)
            .attr('cx', node.x)
            .attr('cy', node.y)
            .attr('fill', node.color)
            .style('cursor', 'pointer')
            .on('mouseover', function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 12);
                // Show tooltip
                tooltip.html(`Title: ${node.title}`)
                    .style('visibility', 'visible');
            })
            .on('mousemove', function (event) {
                tooltip.style('top', (event.pageY - 10) + 'px')
                    .style('left', (event.pageX + 10) + 'px');
            })
            .on('mouseout', function () {
                d3.select(this)
                    .transition()
                    .duration(200)
                    .attr('r', 8);

                    tooltip.style('visibility', 'hidden');
            });
    });

    branches.forEach(branch => {
        const lastBranchNode = nodes.find(n => n.id === branch.steps[branch.steps.length - 1].id);

        svg.append('circle')
            .attr('r', 8)
            .attr('cx', lastBranchNode.x)
            .attr('cy', lastBranchNode.y)
            .attr('fill', lastBranchNode.color)
            .style('cursor', 'pointer')
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
                setGetTitle(lastBranchNode.title);
                setGetDescription(lastBranchNode.description);
                setGettingSkillsData(lastBranchNode.skills);
            })
            .append('title')
            .text(lastBranchNode.title);
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
        .enter().append('g')
        .each(function (d) {
            const g = d3.select(this);

            const isFirstNode = d.id === nodes[0].id;
            const isLastNode = d.id === nodes[nodes.length - 1].id;
            const isBranchEndNode = branches.some(branch => branch.steps[branch.steps.length - 1].id === d.id);

            const fontSize = isFirstNode || isLastNode ||isBranchEndNode ? '12px' : '10px'; 
            const Color = isFirstNode || isLastNode || isBranchEndNode ? '#354E70' : '#5B708B';
            const Bold = isFirstNode || isLastNode  || isBranchEndNode ? 'bold' : 'medium';
            const lineValue = isFirstNode || isLastNode ? 0 : -10;
            const RightShift = isLastNode ? 30 : 0;

            const splitText = !(isFirstNode || isLastNode || isBranchEndNode);

            wrapText(g, d.title, d.x, d.y - 12, fontSize, Color, Bold, splitText, lineValue, RightShift);
        });
};

export default DrawBranch;
