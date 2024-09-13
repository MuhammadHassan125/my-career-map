import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Snackbar } from "../../Utils/SnackbarUtils";
import { useUser } from "../../context/context";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import content from '../../Utils/content';
import DrawBranch from "../../Utils/DrawBranch";

const UserDetailsMap = () => {
  const [pathDetailsArray, setPathDetailsArray] = React.useState([]);
  const { setLoading } = useUser();
  const navigate = useNavigate();
  const svgRefs = useRef([]);

  // useEffect(() => {

  //   const formattedPathDetails = content.data.map((pathDetails) => {
  //     if (pathDetails.status !== "pending") {
  //       const nodes = [];
  //       const links = [];

  //       pathDetails.branches.forEach((branch) => {
  //         branch.forEach((position, index) => {
  //           position.subBranch?.forEach((subPosition) => {
  //             nodes.push({
  //               id: subPosition.id,
  //               title: subPosition.title,
  //               description: subPosition.description,
  //               skills: subPosition.skills,
  //               x: index * 50 + 80,
  //               y: 150,
  //               color: pathDetails.color,
  //             });

  //             links.push({
  //               source: position.id,
  //               target: subPosition.id,
  //               color: pathDetails.color,
  //             });
  //           });

  //           nodes.push({
  //             id: position.id,
  //             title: position.title + (position.subBranch && position.subBranch[0].id === position.id ? ` - ${position.subBranch[0].description}` : ''),
  //             description: position.description,
  //             skills: position.skills,
  //             x: index * 50,
  //             y: 100,
  //             color: pathDetails.color,
  //           });

  //           if (index > 0) {
  //             links.push({
  //               source: nodes[index - 1].id,
  //               target: position.id,
  //               color: pathDetails.color,
  //             });
  //           }
  //         });
  //       });

  //       return { id: pathDetails.id, nodes, links, };
  //     }
  //   }).filter((pathDetails) => pathDetails !== undefined);

  //   console.log(formattedPathDetails, 'ttttttttttttt')
  //   setPathDetailsArray(formattedPathDetails);
  // }, []);

  useEffect(() => {
    // if (pathDetailsArray.length === 0) return;

    const width = 1000;
    const height = 400;
    const centerY = height / 2;
    for (let index = 0; index < content.data.length; index++) {
      const branch = content.data[index].branch;
      const svg = d3.select(svgRefs.current[index])
        .attr("width", width)
        .attr("height", height);

      DrawBranch(svg, branch, width, height)
    }


    // pathDetailsArray.forEach((pathDetails, i) => {
    //   const svg = d3.select(svgRefs.current[i])
    //     .attr("width", width)
    //     .attr("height", height);

    //   const tooltip = d3.select("body").append("div")
    //     .attr("class", "tooltip")
    //     .style("opacity", 0);

    //   // Adjust positioning of nodes and links
    //   pathDetails.nodes.forEach((node, index) => {
    //     node.x = index * 100;
    //     node.y = height / 2;
    //   });

    //   // Create links for the main branches
    //   const link = svg.append("g")
    //     .selectAll("line")
    //     .data(pathDetails.links)
    //     .enter()
    //     .append("line")
    //     .style("stroke-width", 4.8)
    //     .style("stroke", d => d.color)
    //     .attr("x1", d => pathDetails.nodes.find(node => node.id === d.source).x)
    //     .attr("y1", d => pathDetails.nodes.find(node => node.id === d.source).y)
    //     .attr("x2", d => pathDetails.nodes.find(node => node.id === d.target).x)
    //     .attr("y2", d => pathDetails.nodes.find(node => node.id === d.target).y);

    //   // Add nodes for the main branches
    //   const node = svg.append("g")
    //     .selectAll("circle")
    //     .data(pathDetails.nodes)
    //     .enter()
    //     .append("circle")
    //     .attr("r", 7)
    //     .attr("fill", d => d.color)
    //     .attr("stroke", d => d.color)
    //     .attr("stroke-width", 0.5)
    //     .style("cursor", "pointer")
    //     .attr("cx", d => d.x)
    //     .attr("cy", d => d.y);

    //   // Add text labels for the main nodes
    //   const nodeText = svg.append("g")
    //     .selectAll("text")
    //     .data(pathDetails.nodes)
    //     .enter()
    //     .append("text")
    //     .text(d => d.title)
    //     .attr("text-anchor", "middle")
    //     .attr("dominant-baseline", "central")
    //     .style("fill", "#000")
    //     .style("font-size", "8.8px")
    //     .attr("x", d => d.x)
    //     .attr("y", d => d.y - 20);

    //   // Handling sub-branches
    //   pathDetails.nodes.forEach((node) => {
    //     if (node.subBranch) {
    //       node.subBranch.forEach((subNode, index) => {
    //         const subNodeX = node.x + (index * 50);  // Slight shift for sub-nodes
    //         const subNodeY = node.y + 50;  // Position below the main node

    //         // Draw sub-node circles
    //         svg.append("circle")
    //           .attr("r", 5)
    //           .attr("fill", node.color)
    //           .attr("stroke", node.color)
    //           .attr("cx", subNodeX)
    //           .attr("cy", subNodeY);

    //         // Draw links for sub-branches
    //         svg.append("line")
    //           .style("stroke-width", 3)
    //           .style("stroke", node.color)
    //           .attr("x1", node.x)
    //           .attr("y1", node.y)
    //           .attr("x2", subNodeX)
    //           .attr("y2", subNodeY);

    //         // Add text labels for sub-nodes
    //         svg.append("text")
    //           .text(subNode.title)
    //           .attr("text-anchor", "middle")
    //           .attr("dominant-baseline", "central")
    //           .style("fill", "#000")
    //           .style("font-size", "7.5px")
    //           .attr("x", subNodeX)
    //           .attr("y", subNodeY - 10);
    //       });
    //     }
    //   });

    //   return () => {
    //     svg.selectAll("*").remove();
    //     tooltip.remove();
    //   };
    // });
  }, []);


  return (
    <>
      <Loading />
      <div
        className="map-section____map-div-career-path"
        style={{
          marginBottom: "40px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {content.data.map((_, i) => (
          <div
            key={i}
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
            <svg ref={(el) => (svgRefs.current[i] = el)}></svg>
            <div
              style={{
                position: "absolute",
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/map-career/${pathDetailsArray[i].id}`, { state: pathDetailsArray[i] })}
            ></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default UserDetailsMap;