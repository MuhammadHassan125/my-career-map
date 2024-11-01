import React, { useEffect, useState } from "react";
import "./index.scss";
import { AnalyzeURL, baseURL } from "../../Fire/useFire";
import Fire from "../../Fire/Fire";
import { useParams, useLocation } from "react-router-dom";
import { Snackbar } from "../../Utils/SnackbarUtils";
import PaymentSuccessModal from '../../Components/DashboardComponents/PaymentSuccessModal'

const ExportPdf = () => {
  const [branchId, setBranchId] = useState(null);
  const [open, setOpen] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [generate, setGenerate] = useState(false);

  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    setBranchId(params.id);
  }, [params.id]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const sessionParam = queryParams.get("session_id");

    setSessionId(sessionParam);

    // Only set open to true if session_id is not present
    if (!sessionParam) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [location.search]);

  const confirmSubscription = () => {
    Fire.post({
      url: `${baseURL}/confirm-model-subscription`,
      data: {
        sessionId,
        branchId,
      },
      onSuccess: (res) => {
        // Snackbar("Subscription confirmed successfully!", {
        //   variant: "success",
        //   style: { backgroundColor:'var(--primary-btn-color)' }
        // });
        setOpen(false);
      },
      onError: (err) => {
        console.log(err);
        Snackbar(err.message, { variant: "error" });
      },
    });
  };

  const generateTrainingSteps = () => {
    Fire.post({
      url: `${AnalyzeURL}/generate_training_steps?branch_id=${branchId}`,
      onSuccess: (res) => {
        console.log(res);
        setGenerate(true);
        Snackbar("Training steps generation has started", {
          variant: "success",
          style: { backgroundColor:'var(--primary-btn-color)' }
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  // calling confirm subscription api
  useEffect(() => {
    if (sessionId && branchId) {
      setOpen(false);
      confirmSubscription();
      generateTrainingSteps();
    }
  }, [sessionId, branchId]);

  return (
    <div  style={{backgroundColor: '#f5f6fa', display:'flex', alignItems:'center', justifyContent:'center'}}>
            {generate === true ? 
        <PaymentSuccessModal/>
        : <p>Something went wrong!</p>
      }
      
    </div>
  );
};

export default ExportPdf;
