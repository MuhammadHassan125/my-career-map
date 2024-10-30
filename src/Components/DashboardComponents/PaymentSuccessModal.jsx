import React, { useState,useEffect } from "react";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { useParams } from "react-router-dom";
import Fire from '../../Fire/Fire';
import { baseURL } from "../../Fire/useFire";

const PaymentSuccessModal = () => {
  const [branchId, setBranchId] = useState(null);
  const [checkDownloadBtn, setCheckDownloadBtn] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false)

  const params = useParams();

  useEffect(() => {
    setBranchId(params.id);
  }, [params.id]);

  const checkDownloadButton = () => {
    Fire.post({
      url: `${baseURL}/check-download-status`,
      data: {
        branchId,
      },
      onSuccess: (res) => {
        console.log(res);
        setCheckDownloadBtn(res?.data?.data);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  const token = localStorage.getItem('user-visited-dashboard')
  console.log(token)

  const generatePDF = async () => {
    if (!branchId) return
    setIsGenerating(true)
    try {
      const response = await fetch(`${baseURL}/generate/${branchId}`, {
        method: "GET",
        headers: {
          Authorization:  `Bearer ${token}` 
        },
      })
      if (!response.ok) throw new Error('Failed to generate PDF')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.style.display = "none"
      a.href = url
      a.download = `CareerDevelopmentPlan_${branchId}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGenerating(false)
    }
  }
  
  

  useEffect(() => {
    if (branchId) {
    checkDownloadButton()
    }
  }, [branchId]);

  return (
    <React.Fragment>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "90vh",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
            backgroundColor: "#fff",
            padding: "30px 50px",
            borderRadius: "10px",
          }}
        >
          <IoIosCheckmarkCircleOutline
            style={{ fontSize: "6rem", color: "var(--primary-btn-color)" }}
          />

          <h2 style={{ fontSize: "30px", marginBottom: "10px" }}>
            Thank You for Your Purchase!
          </h2>
          {checkDownloadBtn?.downloadStatus == true ? (
              <button 
              type="download"
              onClick={()=>generatePDF()}
              className="map-section__btn"
              >
                Download PDF
                </button>
          ) : (
            <p style={{color:'red'}}>No training plan found for this branch ID</p>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default PaymentSuccessModal;



