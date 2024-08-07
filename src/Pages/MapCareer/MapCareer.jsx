import React, { useState } from 'react'
import PrimaryBtn from '../../Components/PrimaryBtn'
import { BiExport } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { GrAttachment } from "react-icons/gr";
import { MdOutlineKeyboardVoice } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import './index.scss'
import { useNavigate } from 'react-router-dom';


const MapCareer = () => {
    return (
        <React.Fragment>
            <main className='map-section'>
                {/* heading div  */}
                <div className='main__heading'>
                    <div>
                        <h2>Map Career Path</h2>
                    </div>
                    <div className='map-section__btn-div'>
                        <p><strong>Sales Rep </strong>/ 19 Paths</p>
                        <button className='map-section__btn'>
                            <BiExport style={{ fontSize: "18px" }} />
                            Export your Training PDF
                        </button>
                        <PrimaryBtn text={"Add Path"} />
                    </div>
                </div>

                <div className='map-section__map-div'>
                    <img src={"/images/map.png"} alt="map" />
                </div>

                <GPTComponent />

            </main>
        </React.Fragment>
    )
}

const GPTComponent = () => {
    const navigate = useNavigate();
    const [isMinimized, setIsMinimized] = useState(false);

    const handleToggle = () => {
        setIsMinimized(!isMinimized);
    };
    return (
        <main className='gpt-section'>
            {/* left sales executive  */}
            <div className='gpt-section__left'>
                <h5>Details</h5>
                <h2>Sales Executive</h2>
                <div className='gpt-section__skills-div'>
                    <button>Skill necessary</button>
                    <button>Skill necessary</button>
                    <button>Skill necessary</button>
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur. Ligula venenatis in ipsum ut. Senectus imperdiet elementum libero aliquet. Egestas sit a lobortis tellus diam. Consectetur etiam pellentesque elit pulvinar sed proin faucibus. Adipiscing amet orci urna amet sem massa.
                </p>
                <div className='gpt-section__btn-div'>
                    <div>
                        <button className='gpt-section__btn' onClick={() => navigate('/list-career-path')}>Get Started</button>
                    </div>
                    <div>
                        <p><strong>Next Role:</strong>Sales Team Lead</p>
                    </div>
                </div>
            </div>

            {/* right cpt section  */}


            <div className={`gpt-section__right ${isMinimized ? 'minimized' : ''}`}>
                <div className='gpt-section__heading'>
                    <div>
                        <img src="/images/gpt.png" alt='gpt' />
                        <h2>Chat GPT</h2>
                    </div>

                    <div className='gpt-section__close' onClick={handleToggle}>
                        {isMinimized ? <IoIosArrowDown style={{ fontSize: "20px" }} /> : <MdOutlineClose style={{ fontSize: "20px" }} />}
                    </div>
                </div>

                {!isMinimized && (
                    <div className='gpt-section__content'>
                        <div className='content__inner'>
                            <div className='innder-right__txt'>
                                <img src='/images/clear.png' alt='clear' />
                                New dialog
                            </div>

                            <div className='search__box'>
                                <div>
                                    <GrAttachment style={{ fontSize: "20px" }} />
                                    <input type='text' placeholder='Search' />
                                    <MdOutlineKeyboardVoice style={{ fontSize: "25px" }} />
                                    <button>
                                        <img src='/images/sent.png' alt='sent' />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}

export default MapCareer