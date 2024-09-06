import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import Fire from "../../Fire/Fire";
import { baseURL } from "../../Fire/useFire";
import { Snackbar } from "../../Utils/SnackbarUtils";
import { useUser } from "../../context/context";
import { useNavigate } from "react-router-dom";

const UserDetailsMap = () => {
    const [pathDetailsArray, setPathDetailsArray] = React.useState([]);
    const { setGettingSkillsData, setGetTitle, setGetDescription, setSinglePathData } = useUser();
    const navigate = useNavigate();
    const svgRefs = useRef([]);

    const gettingPathDetails = () => {
        Fire.get({
            url: `${baseURL}/get-details-with-path`,
            onSuccess: (res) => {
                const pathDetailsArray = res?.data?.data;

                const formattedPathDetails = pathDetailsArray.map((pathDetails) => {
                    if(pathDetails.status !== 'pending') {
                        
                    const nodes = [];
                    const links = [];

                    pathDetails.steps.forEach((step, index) => {
                        nodes.push({
                            id: step.id,
                            title: step.title,
                            description: step.description,
                            skills: step.skills,
                            steps: step,
                            x: index *  50,
                            y: 100,
                            color: pathDetails.color,
                        });

                        if (index > 0) {
                            links.push({
                                source: pathDetails.steps[index - 1].id,
                                target: step.id,
                            });
                        }
                    });

                    return { id:pathDetails.id,nodes, links };
                    }
                }).filter(pathDetails => pathDetails !== undefined);

                setPathDetailsArray(formattedPathDetails);
            },
            onError: (err) => {
                console.log(err);
                Snackbar(err?.error);
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
                .style("stroke", '#5B708B')
                .attr("stroke", "5,5")
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            const node = svg.append("g")
                .selectAll("circle")
                .data(pathDetails.nodes)
                .enter()
                .append("circle")
                .attr("r", (d, index) => index === 0 ? 10 : 7) 
                .attr("fill", d => d.color)
                .attr("stroke", (d, index) => index === pathDetails.nodes.length - 1 ? "red" : "#fff") // Red stroke for end node
                .attr("stroke-width", 1.5)
                .on('click', (e, d) => {
                    setGettingSkillsData(d.skills);
                    setGetTitle(d.title);
                    setGetDescription(d.description);
                    setSinglePathData(d.steps);
                });

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
                    .attr("y", d => d.y - 18);
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
        <div className="map-section____map-div-career-path" style={{ marginBottom: '40px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            {pathDetailsArray.map((_,i) => (
                <div key={i} style={{backgroundColor:"white", borderRadius:"10px", marginBottom:"10px", display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative',
                    boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px"
                 }}>
                    <svg ref={el => svgRefs.current[i] = el}></svg>
                    <div style={{position:"absolute", top:'0', bottom:'0', left:'0', right:'0', cursor:'pointer'}} onClick={() =>navigate(`/map-career/${_.id}`)}></div>
                </div>
            ))}
        </div>
    );
};

export default UserDetailsMap;