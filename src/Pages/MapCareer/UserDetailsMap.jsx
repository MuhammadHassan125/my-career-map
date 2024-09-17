import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Snackbar } from "../../Utils/SnackbarUtils";
import { useUser } from "../../context/context";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading";
import content from '../../Utils/content';
import DrawBranch from "../../Utils/DrawBranch";
import Fire from "../../Fire/Fire";
import { baseURL } from "../../Fire/useFire";
import { Typography } from "@mui/material";

const UserDetailsMap = () => {
  const [pathDetailsArray, setPathDetailsArray] = React.useState([]);
  const { setLoading } = useUser();
  const navigate = useNavigate();
  const svgRefs = useRef([]);

  // const content = {};


useEffect(() => {
  Fire.get({
    url:`${baseURL}/get-details-with-path`,

    onSuccess: (res) => {
      console.log(res.data, 'pathDetailsArray')
      setPathDetailsArray(res.data.data);
      // content.push(res.data)
    },

    onError: (err) => {
      console.log(err);
      if(err.status == 404 || err.status === false){
        Snackbar("No paths found for this user", { variant: 'error' });
      }return;

    }
  });
}, [])

  useEffect(() => {    

    if(pathDetailsArray.length > 0){
      const width = 1000;
      const height = 400;
      const centerY = height / 2;
      for (let index = 0; index < pathDetailsArray.length; index++) {
        const branch = pathDetailsArray[index].branch;
        const svg = d3.select(svgRefs.current[index])
          .attr("width", width)
          .attr("height", height);
  
        DrawBranch(svg, branch, width, height);
      }
    }else return;
  }, [pathDetailsArray]);



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
        { pathDetailsArray.length > 0 ? pathDetailsArray.map((_, i) => (
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
              onClick={() => navigate(`/map-career/${_.branch.path_id}`,)}
              // onClick={() => console.log(_.branch.path_id, "fffffffffffffff")}
            ></div>
          </div>
        )) : <Typography sx= {{display: 'flex', justifyContent: 'center', alignItems: 'center', padding:'20px 0'}}>No Graph found for this user please generate path first...</Typography>}
      </div>
    </>
  );
};

export default UserDetailsMap;