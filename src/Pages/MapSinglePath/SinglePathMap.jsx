import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useUser } from "../../context/context";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
const SinglePathMap = () => {
    const svgRef = useRef(null);
    const d3SVGRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    

    const {setLoading, setGettingSkillsData, setGetTitle, setGetDescription} = useUser();
    console.log(location.state.nodes, "location")
    // console.log(location.state.nodes, "location")

    const createMap = (nodes, links) => {
    const width = 1000;
    const height = 300;
    const nodeSpacing = 150;

    d3SVGRef.current = d3.select(svgRef.current)
        .attr("width", width)
        .attr("height", height);

    const tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Position nodes
    nodes.forEach((node, i) => {
        node.x = i * nodeSpacing + 50;
        node.y = height / 2;
    });

    // Draw links
    const link = d3SVGRef.current.append("g")
        .selectAll("line")
        .data(links)
        .enter()
        .append("line")
        .attr("stroke-width", 4.8)
        .attr("stroke", d => d.color)
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    // Remove old node lines
    d3SVGRef.current.selectAll("line.node-line").remove();

    // Add node lines
    const nodeLine = d3SVGRef.current.append("g")
        .selectAll("line.node-line")
        .data(nodes)
        .enter()
        .append("line")
        .attr("class", "node-line")
        .attr("stroke-width", 3)
        .attr("stroke", d => d.color)
        .attr("x1", d => d.x)
        .attr("y1", d => d.y - 8) 
        .attr("x2", d => d.x)
        .attr("y2", d => d.y - 0)
        .style("cursor", "pointer")
        .on('click', (e, d) => {
            setGettingSkillsData(d.skills);
            setGetTitle(d.title);
            setGetDescription(d.description);
        });

    // Add nodes
    const node = d3SVGRef.current.append("g")
        .selectAll("circle")
        .data(nodes)
        .enter()
        .append("circle")
        .attr("r", 7)
        .attr("fill", d => d.color)
        .attr("stroke", d => d.color)
        .attr("stroke-width", 0.5)
        .style("cursor", "pointer")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .on('click', (e, d) => {
            setGettingSkillsData(d.skills);
            setGetTitle(d.title);
            setGetDescription(d.description);
        });

    node.filter((d, i) => i === 0 || i === nodes.length - 1)
        .style("display", "inline");

    node.filter((d, i) => i !== 0 && i !== nodes.length - 1)
        .style("display", "none");

    // Add node text (titles)
    const nodeText = d3SVGRef.current.append("g")
        .selectAll("text")
        .data(nodes)
        .enter()
        .append("text")
        .text(d => d.title)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("fill", "#000")
        .style("font-size", "8.8px")
        .attr("x", d => d.x)
        .attr("y", d => d.y - 20)
        .style("cursor", "pointer")
        .on('click', (e, d) => {
            setGettingSkillsData(d.skills);
            setGetTitle(d.title);
            setGetDescription(d.description);
        });

    // Add skills to the map as text below the node titles
    const skillsText = d3SVGRef.current.append("g")
        .selectAll("text.skills")
        .data(nodes)
        .enter()
        .append("text")
        .attr("class", "skills")
        // .text(d => d.skills.join(", ")) // Displaying skills as comma-separated string
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .style("fill", "#555")
        .style("font-size", "6.8px")
        .attr("x", d => d.x)
        .attr("y", d => d.y + 20) 
        .style("cursor", "pointer")
        .on('click', (e, d) => {
            setGettingSkillsData(d.skills);
            setGetTitle(d.title);
            setGetDescription(d.description);
        });

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);

        nodeLine
            .attr("x1", d => d.x)
            .attr("y1", d => d.y - 7)
            .attr("x2", d => d.x)
            .attr("y2", d => d.y - 0);

        nodeText
            .attr("x", d => d.x)
            .attr("y", d => d.y - 20);

        skillsText
            .attr("x", d => d.x)
            .attr("y", d => d.y + 20); // Reposition the skills text on tick
    }

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);
}

useEffect(() => {
    const path = location.state.nodes;

    const nodes = [];
    const links = [];

    path.map((node, index) => {
        nodes.push({
            id: node.id,
            title: node.title,
            description: node.description,
            skills: node.skills.map(skill => skill.title), 
            x: index * 200 + 50,
            y: 200,
            color: node.color,
        });

        if (index > 0) {
            links.push({
                source: path[index - 1].id,
                target: node.id,
                color: node.color,
            });
        }
    });

    createMap(nodes, links);
    setLoading(true);
    setLoading(false);

}, [location.state.nodes]);

return (
    <React.Fragment>
        <Loading />
        <div className="map-section____map-div-career-path" style={{ display: 'flex', justifyContent: 'center' }}>
            <svg ref={svgRef}></svg>
        </div>
    </React.Fragment>
);

};

export default SinglePathMap;
