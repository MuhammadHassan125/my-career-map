import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { useUser } from "../../context/context";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import Fire from "../../Fire/Fire";
import { baseURL } from "../../Fire/useFire";

const SinglePathMap = () => {
    const svgRef = useRef(null);
    const [singlePathData, setSinglePathData] = React.useState(null);
    const { setGettingSkillsData, setGetTitle, setGetDescription, setNextRole } = useUser();
    const params = useParams();
    const singlePathId = params.id;

    const getIndividualPathData = () => {
        Fire.get({
            url: `${baseURL}/get-single-branch/${singlePathId}`,
            onSuccess: (res) => {
                console.log(res?.data?.data, 'singlePath');
                setSinglePathData(res?.data?.data[0]); // Get the first item from the array
            },
            onError: (err) => {
                console.log(err);
            }
        });
    };

    useEffect(() => {
        getIndividualPathData();
    }, []);

    useEffect(() => {
        if (singlePathData && singlePathData.steps && singlePathData.steps.length > 0) {
            const width = 1000;
            const height = 400;

            const branch = singlePathData.steps;

            d3.select(svgRef.current).selectAll("*").remove();

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

            const svg = d3.select(svgRef.current)
                .attr("width", width)
                .attr("height", height);

            const margin = { top: 20, right: 20, bottom: 30, left: 40 };
            const xScale = d3.scalePoint()
                .domain(branch.map(d => d.title))
                .range([margin.left, width - margin.right])
                .padding(0.5);

            // Draw lines connecting nodes
            svg.selectAll('line')
                .data(branch.slice(0, -1))
                .enter().append('line')
                .attr('x1', d => xScale(d.title))
                .attr('y1', height / 2)
                .attr('x2', (d, i) => xScale(branch[i + 1].title))
                .attr('y2', height / 2)
                .attr('stroke', singlePathData.color)
                .attr('stroke-width', 4);

            // Draw circles for each node
            svg.selectAll('circle')
                .data(branch)
                .enter().append('circle')
                .attr('cx', d => xScale(d.title))
                .attr('cy', height / 2)
                .attr('r', 8)
                .attr('fill', singlePathData.color)
                .style('cursor', 'pointer')
                .on('click', function(event, d) {
                    localStorage.setItem('singlePathId', d.id);
                    setGetTitle(d.title);
                    setGetDescription(d.description);
                    setGettingSkillsData(d.skills);
                })
                .on('mouseover', function(event, d) {
                    const x = event.clientX;
                    const y = event.clientY;
                    tooltip.style('background', singlePathData.color)
                        .style('font-size', '9px')
                        .style('padding', '5px 8px')
                        .style('top', (y - tooltipHeight / 2) + 'px')
                        .style('left', (x - tooltipWidth / 2) + 'px')
                        .html(`${d.title}`)
                        .style('visibility', 'visible');
                })
                .on('mousemove', function(event) {
                    const x = event.clientX;
                    const y = event.clientY;
                    tooltip.style('top', (y - tooltipHeight / 2) + 'px')
                        .style('left', (x - tooltipWidth / 3) + 'px');
                })
                .on('mouseout', function() {
                    tooltip.style('visibility', 'hidden');
                });

            // Add text labels
            svg.selectAll('text')
                .data(branch)
                .enter().append('text')
                .attr('x', d => xScale(d.title))
                .attr('y', height / 2 + 20)
                .attr('text-anchor', 'middle')
                .attr('fill', 'black')
                .style('font-size', '10px')
                .text(d => d.title);

            for (let i = 0; i < branch.length; i++) {
                if (/* branch[i].status === 'pending' */ i === 0) {
                    localStorage.setItem('singlePathId', branch[i].id);
                    setGetTitle(branch[i].title);
                    setGetDescription(branch[i].description);
                    setGettingSkillsData(branch[i].skills);
                    setNextRole(branch[i].title);
                    break;
                }
            }

            // Cleanup function
            return () => {
                tooltip.remove();
            };
        }
    }, [singlePathData]);

    return (
        <React.Fragment>
            <Loading />
            <div className="map-section____map-div-career-path"
                style={{ height: '100%', overflowY: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
            >
                <div
                    style={{
                        backgroundColor: "white",
                        borderRadius: "10px",
                        marginBottom: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        boxShadow: "rgba(149, 157, 165, 0.2) 0px 8px 24px",
                    }}
                >
                    <svg ref={svgRef}></svg>
                </div>
            </div>
        </React.Fragment>
    );
};

export default SinglePathMap;