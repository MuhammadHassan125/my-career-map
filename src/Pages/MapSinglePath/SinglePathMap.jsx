import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useUser } from "../../context/context";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Components/Loading";
import DrawBranch from "../../Utils/DrawBranch";
import Fire from "../../Fire/Fire";
import { baseURL } from "../../Fire/useFire";
import { Snackbar } from "../../Utils/SnackbarUtils";

const SinglePathMap = ({contentHandler}) => {
    const navigate = useNavigate();
    const params = useParams();
    const svgRefs = useRef([]);

    const { setLoading, setGettingSkillsData, setGetTitle, setGetDescription } = useUser();
    const [singleData, setSingleData] = React.useState({});

    useEffect(() => {
        Fire.get({
            url: `${baseURL}/get-single-path/${params.id}`,
            onSuccess: (res) => {
                console.log(res.data, 'API response');
                setSingleData(res.data);
            },

            onError: (err) => {
                console.log(err);
                if (err.status == 404 || err.status === false) {
                    Snackbar("No paths found for this user", { variant: 'error' });
                }
                return;
            }
        });
    }, [params.id]);

    console.log(singleData, 'singleData');


    const handleTitleClick = (title) => {
        console.log(title, 'tiotle')
    }

    useEffect(() => {
        if (Object.keys(singleData).length > 0) {
            const width = 1000;
            const height = 400;

            const branch = singleData.branch;
            console.log(branch, 'branch')
            const svg = d3.select(svgRefs.current)
                .attr("width", width)
                .attr("height", height);

            DrawBranch(svg, branch, width, height, setGetTitle, setGetDescription, setGettingSkillsData);
        }
    }, [singleData]);

    console.log(singleData.branch, 'singleData');

    return (
        <React.Fragment>
            <Loading />
            <div className="map-section____map-div-career-path" style={{ height: '100%', overflowY: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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
                    <svg ref={svgRefs}></svg>
                    {/* <div
                        style={{
                            position: "absolute",
                            top: "0",
                            bottom: "0",
                            left: "0",
                            right: "0",
                            cursor: "pointer",
                        }}>
                    </div> */}
                </div>
            </div>
        </React.Fragment>
    );

};

export default SinglePathMap;
