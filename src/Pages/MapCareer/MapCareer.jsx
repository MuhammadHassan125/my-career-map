import React from 'react'
import './index.scss'
import { useNavigate } from 'react-router-dom';
import UserDetailsMap from './UserDetailsMap';
import AddPathComponent from '../../Components/AddPathComponent';

const MapCareer = () => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate('/get-pdf')
    }

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
                        <AddPathComponent />
                    </div>
                </div>

                <UserDetailsMap />

                {/* <GPTComponent /> */}

            </main>

        </React.Fragment>
    )
}

// const GPTComponent = () => {
//     const navigate = useNavigate();
//     const [isMinimized, setIsMinimized] = useState(false);

//     const { gettingSkillsData, getTitle, getDescription } = useUser();
//     console.log(getTitle, "my-title");


//     const handleToggle = () => {
//         setIsMinimized(!isMinimized);
//     };
//     return (
//         <main className='gpt-section'>
//             {/* left sales executive  */}
//             <div className='gpt-section__left'>
//                 <h5>Details</h5>
//                 <h2>{getTitle}</h2>

//                 <div className='gpt-section__skills-div'>
//                     {Array.isArray(gettingSkillsData) && gettingSkillsData.length > 0 ? (
//                         gettingSkillsData.map((skills, i) => <button key={i}>{skills.title}</button>)
//                     ) : (
//                         <p>No details available</p>
//                     )}

//                 </div>
//                 <p>{getDescription}</p>

//                 <div className='gpt-section__btn-div'>
//                     <div>
//                         <button className='gpt-section__btn' onClick={() => navigate('/list-career-path')}>Get Started</button>
//                     </div>
//                     <div>
//                         <p><strong>Next Role:</strong>Sales Team Lead</p>
//                     </div>
//                 </div>
//             </div>

//             {/* right cpt section  */}


//             <div className={`gpt-section__right ${isMinimized ? 'minimized' : ''}`}>
//                 <div className='gpt-section__heading'>
//                     <div>
//                         <img src="/images/gpt.png" alt='gpt' />
//                         <h2>Chat GPT</h2>
//                     </div>

//                     <div className='gpt-section__close' onClick={handleToggle}>
//                         {isMinimized ? <IoIosArrowDown style={{ fontSize: "20px" }} /> : <MdOutlineClose style={{ fontSize: "20px" }} />}
//                     </div>
//                 </div>

//                 {!isMinimized && (
//                     <div className='gpt-section__content'>
//                         <div className='content__inner'>
//                             <div className='innder-right__txt'>
//                                 <img src='/images/clear.png' alt='clear' />
//                                 New dialog
//                             </div>

//                             <div className='search__box'>
//                                 <div>
//                                     <GrAttachment style={{ fontSize: "20px" }} />
//                                     <input type='text' placeholder='Search' />
//                                     <MdOutlineKeyboardVoice style={{ fontSize: "25px" }} />
//                                     <button>
//                                         <img src='/images/sent.png' alt='sent' />
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </main>
//     )
// }

export default MapCareer