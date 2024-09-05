import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useUser } from "../../context/context";
import { useLocation, useNavigate } from "react-router-dom";

const SinglePathMap = () => {
    const { setGettingSkillsData, setGetTitle, setGetDescription } = useUser();
    const svgRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate(); // Import useNavigate

    useEffect(() => {
        if (!location.state) return;

        const width = 1000;
        const height = 300;
        const nodeSpacing = 150; // Adjust this value to space nodes horizontally

        const svg = d3.select(svgRef.current)
            .attr("width", width)
            .attr("height", height);

        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        const nodes = location.state.nodes;
        const links = location.state.links;

        // Set initial positions for nodes
        nodes.forEach((node, i) => {
            node.x = i * nodeSpacing + 100; // Horizontal positioning
            node.y = height / 2; // Center vertically
        });

        const link = svg.append("g")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .style("stroke-width", 4.8)
            .style("stroke", '#5B708B')
            .attr("stroke-line", "5,5")
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        const node = svg.append("g")
            .selectAll("circle")
            .data(nodes)
            .enter()
            .append("circle")
            .attr("r", 7)
            .attr("fill", d => d.color)
            .attr("stroke", "#fff")
            .attr("stroke-width", 0.5)
            .on('click', (e, d) => {
                setGettingSkillsData(d.skills);
                setGetTitle(d.title);
                setGetDescription(d.description);
            });

        const nodeText = svg.append("g")
            .selectAll("text")
            .data(nodes)
            .enter()
            .append("text")
            .text(d => d.title)
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "central")
            .style("fill", "#000")
            .style("font-size", "11px")
            .attr("x", d => d.x)
            .attr("y", d => d.y - 10);

        function ticked() {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            node
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            nodeText
                .attr("x", d => d.x)
                .attr("y", d => d.y - 10);
        }

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(100))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2))
            .on("tick", ticked);

        return () => {
            svg.selectAll("*").remove();
            tooltip.remove();
        };
    }, [location.state, navigate]);

    return (
        <div className="map-section____map-div-career-path" style={{ display: 'flex', justifyContent: 'center' }}>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default SinglePathMap;
