import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Fire from "../../Fire/Fire";
import { baseURL } from "../../Fire/useFire";
import { Snackbar } from "../../Utils/SnackbarUtils";
import { useUser } from "../../context/context";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";

const UserDetailsMap = () => {
    const [pathDetailsArray, setPathDetailsArray] = React.useState([]);
    const { setLoading } = useUser();
    const navigate = useNavigate();
    const svgRefs = useRef([]);

    const gettingPathDetails = () => {
        setLoading(true);
        Fire.get({
            url: `${baseURL}/get-details-with-path`,
            onSuccess: (res) => {
                const pathDetailsArray = res?.data?.data;

                const formattedPathDetails = pathDetailsArray.map((pathDetails) => {
                    if (pathDetails.status !== 'pending') {
                        const nodes = [];
                        const links = [];

                        pathDetails.steps.forEach((step, index) => {
                            nodes.push({
                                id: step.id,
                                title: step.title,
                                description: step.description,
                                skills: step.skills,
                                steps: step,
                                x: index * 50,
                                y: 100,
                                color: pathDetails.color,
                            });

                            if (index > 0) {
                                links.push({
                                    source: pathDetails.steps[index - 1].id,
                                    target: step.id,
                                    color: pathDetails.color,
                                });
                            }
                        });

                        return { id: pathDetails.id, nodes, links };
                    }
                }).filter(pathDetails => pathDetails !== undefined);

                setPathDetailsArray(formattedPathDetails);
                setLoading(false);
            },
            onError: (err) => {
                console.log(err);
                Snackbar(err?.error);
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        gettingPathDetails();
    }, []);

    useEffect(() => {
        if (pathDetailsArray.length === 0) return;

        const width = 1000;
        const height = 200;

        pathDetailsArray.forEach((pathDetails, i) => {
            const svg = d3.select(svgRefs.current[i])
                .attr("width", width)
                .attr("height", height);

            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            const link = svg.append("g")
                .selectAll("line")
                .data(pathDetails.links)
                .enter()
                .append("line")
                .style("stroke-width", 4.8)
                .style("stroke", d => d.color)
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            const nodeLine = svg.append("g")
                .selectAll("line.node-line")
                .data(pathDetails.nodes)
                .enter()
                .append("line")
                .attr("class", "node-line")
                .style("stroke-width", 3)
                .style("stroke",  d => d.color)
                .attr("x1", d => d.x)
                .attr("y1", d => d.y - 8)
                .attr("x2", d => d.x)
                .attr("y2", d => d.y);

            // Update nodes
            const node = svg.append("g")
                .selectAll("circle")
                .data(pathDetails.nodes)
                .enter()
                .append("circle")
                .attr("r", 7)
                .attr("fill", d => d.color)
                .attr("stroke",  d => d.color)
                .attr("stroke-width", 0.5)
                .style("cursor", "pointer")
                .attr("cx", d => d.x)
                .attr("cy", d => d.y);

            // Only show circles at the starting and ending nodes
            node.filter((d, i) => i === 0 || i === pathDetails.nodes.length - 1)
                .style("display", "inline");

            // Remove circles for other nodes
            node.filter((d, i) => i !== 0 && i !== pathDetails.nodes.length - 1)
                .style("display", "none");

            // Update node text
            const nodeText = svg.append("g")
                .selectAll("text")
                .data(pathDetails.nodes)
                .enter()
                .append("text")
                .text(d => d.title)
                .attr("text-anchor", "middle")
                .attr("dominant-baseline", "central")
                .style("fill", "#000")
                .style("font-size", "8.8px")
                .attr("x", d => d.x)
                .attr("y", d => d.y - 20);

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
                    .attr("y2", d => d.y);

                nodeText
                    .attr("x", d => d.x)
                    .attr("y", d => d.y - 20);
            }

            const simulation = d3.forceSimulation(pathDetails.nodes)
                .force("link", d3.forceLink(pathDetails.links).id(d => d.id).distance(80))
                .force("charge", d3.forceManyBody().strength(-300))
                .force("center", d3.forceCenter(width / 2, height / 2))
                .on("tick", ticked);

            return () => {
                svg.selectAll("*").remove();
                tooltip.remove();
            };

        });

    }, [pathDetailsArray]);

    return (
        <>
            <Loading />
            <div className="map-section____map-div-career-path" style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                {pathDetailsArray.map((_, i) => (
                    <div key={i} style={{
                        backgroundColor: "white", borderRadius: "10px", marginBottom: "10px", display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                    }}>
                        <svg ref={el => svgRefs.current[i] = el}></svg>
                        <div style={{ position: "absolute", top: '0', bottom: '0', left: '0', right: '0', cursor: 'pointer' }} onClick={() => navigate(`/map-career/${_.id}`)}></div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default UserDetailsMap;
