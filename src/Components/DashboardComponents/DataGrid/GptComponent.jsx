import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import Fire from '../../../Fire/Fire'
import { baseURL } from "../../../Fire/useFire";
import { useUser } from "../../../context/context";

const GPTComponent = ({ selectedPathId }) => {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);
  const [getGPTResponse, setGetGPTResponse] = useState([]);
  const { gettingSkillsData, getTitle, getDescription, nextRole } = useUser();

  const skillsId = localStorage.getItem("singlePathId");
  const [message, setMessage ] = useState("");
  const [step_id, setStep_id] = useState();
  console.log(selectedPathId);
  
const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    setStep_id(selectedPathId);
  }, [selectedPathId]);

  const handleSendMessage = () => {
      Fire.post({
        url: `${baseURL}/send-message`,
        data:{
            step_id,
            message
        },

        onSuccess: (res) => {
          console.log(res, "gpt response");
          setMessage('')
          handleGetMessage(selectedPathId);
        },

        onError: (err) => {
          console.log(err);
        },
      });
  };

  const handleGetMessage = (stepId) => {
    Fire.get({
      url: `${baseURL}/get-message/${stepId}`,
      onSuccess: (res) => {
        console.log(res?.data?.data);
        setGetGPTResponse(res?.data?.data);
      },

      onError: (err) => {
        console.log(err);
      },
    });
  };

  const handleToggle = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <main className="gpt-section">
      {/* left sales executive  */}
      <div className="gpt-section__left">
        <h5>Details</h5>
        <h2 style={{color:'var(--primary-btn-color)', fontSize:'10px'}}>{getTitle}</h2>

        <div className="gpt-section__skills-div">
          {Array.isArray(gettingSkillsData) && gettingSkillsData.length > 0 ? (
            gettingSkillsData.map((skills, i) => (
              <button key={i} style={{color:'var(--primary-btn-color)'}}>{skills.title}</button>
            ))
          ) : (
            <p>No details available</p>
          )}
        </div>
        <p>{getDescription}</p>

        <div className="gpt-section__btn-div">
          <div>
            <button
              className="gpt-section__btn"
              style={{ backgroundColor:'var(--primary-btn-color)', color:'white'}}
              onClick={() => navigate(`/list-career-path/${skillsId}`)}
            >
              Get Started
            </button>
          </div>
          <div>
            <p>
              <strong>Next Role:</strong>Sales Team Lead
            </p>
          </div>
        </div>
      </div>

      {/* right cpt section  */}

      <div className={`gpt-section__right ${isMinimized ? "minimized" : ""}`}>
        <div className="gpt-section__heading">
          <div>
            <img src="/images/gpt.png" alt="gpt" />
            <h2>Chat GPT</h2>
          </div>

          <div className="gpt-section__close" onClick={handleToggle}>
            {isMinimized ? (
              <IoIosArrowDown style={{ fontSize: "20px" }} />
            ) : (
              <MdOutlineClose style={{ fontSize: "20px" }} />
            )}
          </div>
        </div>

        {!isMinimized && (
         <div className="gpt-section__content">
         <div className="content__inner">
           <div
             style={{
               overflowY: "auto",
               height: "66%",
               padding: "12px 5px",
             }}
           >
             {getGPTResponse?.length > 0
               ? getGPTResponse.map((item, index) => (
                <>
                    <div style={{
                        backgroundColor:'#f5f6fa', 
                        padding:'10px', 
                        borderRadius:'10px',
                        marginBottom:'10px',
                        fontSize:'12px',
                        fontWeight:'bold',
                        color:"#5B708B",
                        width:'60%'
                    }}
                        >
                        
                        <span>{item.prompt}</span>
                    </div>
                   <p style={{ marginBottom: "20px", 
                    background:'#E8E8E8',
                    padding:'10px',
                    fontSize:'11px',
                    width:'80%',
                    }} key={index}>
                     {item.result}
                   </p>
                </>
                 ))
               : null}
             <div className="innder-right__txt">
               <img src="/images/clear.png" alt="clear" />
               New dialog
             </div>
           </div>

           <div className="search__box">
             <div>
               <GrAttachment style={{ fontSize: "20px" }} />
               <input
                 type="text"
                 placeholder="Search"
                 name="message"
                 value={message}
                 onChange={handleInputChange}
               />
               <MdOutlineKeyboardVoice style={{ fontSize: "25px" }} />
               <button
                 onClick={handleSendMessage}
                 style={{ cursor: "pointer" }}
               >
                 <img src="/images/sent.png" alt="sent" />
               </button>
             </div>
             {/* {Errors.message && <p className="error">{Errors.message}</p>} */}
           </div>
         </div>
       </div>
        )}
      </div>
    </main>
  );
};

export default GPTComponent;
