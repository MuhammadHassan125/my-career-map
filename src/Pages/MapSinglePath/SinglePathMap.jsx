import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { useUser } from "../../context/context";
import { useLocation, } from "react-router-dom";
import Loading from "../../Components/Loading";

const SinglePathMap = () => {
    const svgRef = useRef(null);
    const { setGettingSkillsData, setGetTitle, setGetDescription, setNextRole } = useUser();
    const location = useLocation();
    console.log(location.state);

    const firstStepId = location.state.allSteps[0].id;
    localStorage.setItem('singlePathId', firstStepId);

    useEffect(() => {
        if (Object.keys(location.state?.allSteps).length > 0) {
            const width = 1000;
            const height = 400;

            const branch = location.state.allSteps;
            console.log(branch, 'branch')

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

            const yScale = d3.scaleLinear()
                .domain([0, 1])
                .range([height - margin.bottom, margin.top]);

            svg.selectAll('line')
                .data(branch)
                .enter().append('line')
                .attr('x1', (d, i) => xScale(d.title))
                .attr('y1', height / 2)
                .attr('x2', (d, i) => xScale(branch[i + 1]?.title) || xScale(d.title))
                .attr('y2', height / 2)
                .attr('stroke', location.state.color)
                .attr('stroke-width', 4);

            svg.selectAll('circle')
                .data(branch)
                .enter().append('circle')
                .attr('cx', (d, i) => xScale(d.title))
                .attr('cy', height / 2)
                .attr('r', 8)
                .attr('fill', location.state.color)
                .style('cursor', 'pointer')
                .on('click', function(event, d) {
                    setGetTitle(d.title);
                    setGetDescription(d.description);
                    setGettingSkillsData(d.skills);
                })
                .on('mouseover', function (event, d) {
                    const x = event.clientX;
                    const y = event.clientY;
                    tooltip.style('background', location.state.color);
                    tooltip.style('font-size', '9px');
                    tooltip.style('padding', '5px 8px');
                    tooltip.style('top', (y - tooltipHeight / 2) + 'px');
                    tooltip.style('left', (x - tooltipWidth / 2) + 'px');
                    tooltip.html(`${d.title}`)
                        .style('visibility', 'visible');
                })
                .on('mousemove', function (event) {
                    const x = event.clientX;
                    const y = event.clientY;
                    tooltip.style('top', (y - tooltipHeight / 2) + 'px');
                    tooltip.style('left', (x - tooltipWidth / 3) + 'px');
                })
                .on('mouseout', function () {
                    tooltip.style('visibility', 'hidden');
                });
            svg.selectAll('text')
                .data(branch)
                .enter().append('text')
                .attr('x', (d, i) => xScale(d.title))
                .attr('y', height / 2 + 20)
                .attr('text-anchor', 'middle')
                .attr('fill', 'black')
                .style('font-size', '10px')
                .text(d => d.title);

            for (let i = 0; i < branch.length; i++) {
                if (branch[i].status === 'pending') {
                    console.log(`Pending Step: ${branch[i].title} - ${branch[i].description} - ${branch[i].id}`);

                    setGetTitle(branch[i].title);
                    setGetDescription(branch[i].description);
                    setGettingSkillsData(branch[i].skills);
                    if (i < branch.length - 1) {
                        setNextRole(branch[i + 1].title)
                    }
                    break;
                }
            }
        }
    }, [location.state?.allSteps]);

    return (
        <React.Fragment>
            <Loading />
            <div className="map-section____map-div-career-path"
                style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
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