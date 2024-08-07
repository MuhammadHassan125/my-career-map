import React, { useState } from 'react'
import PrimaryBtn from '../../Components/PrimaryBtn'
import { BiExport } from "react-icons/bi";
import { MdOutlineClose } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import './index.scss'
import { useNavigate } from 'react-router-dom';


const MapSinglePath = () => {
  return (
    <React.Fragment>
      <main className='map-section'>
        {/* heading div  */}
        <div className='main__heading'>
          <div>
            <h2>Individual Path</h2>
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
          <img src={"/images/single-path.png"} alt="map" />
        </div>

        <GPTComponent />

      </main>
    </React.Fragment>
  )
}

const GPTComponent = () => {
  const navigate = useNavigate()
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
        <div className='gpt-section__bottom-div'>
          <button onClick={() => navigate('/list-career-path')}>
            Get Started
          </button>
          <p><strong>Next Role:</strong>Sales Team Lead</p>
        </div>
      </div>



      {/* right  section  */}
      <div className={`gpt-section__right ${isMinimized ? 'minimized' : ''}`}>
        <div className='gpt-section__heading'>
          <div>
            {
              isMinimized
                ? <h4>See Description Details Blue Line</h4>
                : <h3>Blue Line</h3>
            }


          </div>

          <div className='gpt-section__close' onClick={handleToggle}>
            {isMinimized ? <IoIosArrowDown style={{ fontSize: "20px" }} /> : <MdOutlineClose style={{ fontSize: "20px" }} />}
          </div>
        </div>

        {!isMinimized && (
          <div className='description-details'>
            <h4>Description Details</h4>
            <p>
              Lorem ipsum dolor sit amet consectetur. Ligula venenatis in ipsum ut. Senectus imperdiet elementum libero aliquet. Egestas sit a lobortis tellus diam. Consectetur etiam pellentesque elit pulvinar sed proin faucibus. Adipiscing amet orci urna amet sem massa. Mauris vel nibh massa tincidunt lectus quam rhoncus. Magna ac mi risus dui sem ut non eu pharetra. Leo viverra morbi commodo sed. Purus at elit diam adipiscing. Nunc vel libero odio eleifend non at commodo. Consectetur etiam pellentesque elit pulvinar sed proin faucibus.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

export default MapSinglePath