import React, { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import SinglePathMap from "./SinglePathMap";
import AddPathComponent from "../../Components/AddPathComponent";
import GPTComponent from "../../Components/DashboardComponents/DataGrid/GptComponent";
import "./index.scss";
import { useUser } from "../../context/context";
import { useParams } from "react-router-dom";
import { baseURL } from "../../Fire/useFire";
import Fire from "../../Fire/Fire";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const MapSinglePath = () => {
  const [selectedPathId, setSelectedPathId] = useState(null);
  const [branchId, setBranchId] = useState(null);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [open, setOpen] = useState(false);

  const { getTitle } = useUser();
  const params = useParams();

  useEffect(() => {
    setBranchId(params.id);
  }, [params.id]);

  const handleIdFromChild = (id) => {
    setSelectedPathId(id);
  };

  const handleNavigate = () => {
    window.open(`/get-pdf/${params.id}`, "_blank");
  };

  const redirectToStripe = () => {
    Fire.post({
      url: `${baseURL}/redirect-subscription`,
      data: { branchId },
      onSuccess: (res) => {
        setCheckoutUrl(res?.data?.data?.url);
        setOpen(true);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <React.Fragment>
      <main className="map-section">
        {/* heading div  */}
        <div className="main__heading">
          <div>
            <h2>Individual Path</h2>
          </div>
          <div className="map-section__btn-div">
            <p>
              <strong>{getTitle} </strong>/ 19 Paths
            </p>
            <button className="map-section__btn" onClick={redirectToStripe}>
              <BiExport style={{ fontSize: "18px" }} />
              Export your Training PDF
            </button>
            <AddPathComponent />
          </div>
        </div>

        <div className="map-section__map-div">
          <SinglePathMap onSelectId={handleIdFromChild} />
        </div>

        <GPTComponent selectedPathId={selectedPathId} />
      </main>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ color: "var(--primary-btn-color)" }}>
          Proceed to Checkout
        </DialogTitle>
        <DialogContent>
          <p>
            You will be redirected to Stripe to complete your payment. Do you
            want to continue?
          </p>
        </DialogContent>
        <DialogActions sx={{ display: "flex", gap: "15px" }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              color: "var(--primary-btn-color)",
              fontSize: "13px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              window.open(checkoutUrl, "_blank");
              setOpen(false);
            }}
            style={{
              backgroundColor: "var(--primary-btn-color)",
              color: "white",
              border: "none",
              cursor: "pointer",
              borderRadius: "8px",
              outline: "none",
              padding: "10px 20px",
            }}
          >
            Yes, Proceed
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MapSinglePath;
