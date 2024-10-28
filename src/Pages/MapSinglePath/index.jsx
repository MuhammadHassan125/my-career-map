import React, { useState } from 'react'
import { BiExport } from "react-icons/bi";
import SinglePathMap from './SinglePathMap';
import AddPathComponent from '../../Components/AddPathComponent';
import GPTComponent from '../../Components/DashboardComponents/DataGrid/GptComponent';
import './index.scss'
import { useUser } from '../../context/context';
import { useNavigate } from 'react-router-dom';

const MapSinglePath = () => {

    const [selectedPathId, setSelectedPathId] = useState(null);
    const { getTitle } = useUser();

    const handleIdFromChild = (id) => {
      setSelectedPathId(id);
    };

    const handleNavigate =()=> {
      window.open('/get-pdf', '_blank');
    }

  return (
    <React.Fragment>
      <main className='map-section'>
        {/* heading div  */}
        <div className='main__heading'>
          <div>
            <h2>Individual Path</h2>
          </div>
          <div className='map-section__btn-div'>
            <p><strong>{getTitle} </strong>/ 19 Paths</p>
            <button className='map-section__btn' onClick={handleNavigate}>
              <BiExport style={{ fontSize: "18px" }} />
              Export your Training PDF
            </button>
            <AddPathComponent/>
          </div>
        </div>

        <div className='map-section__map-div'>
          <SinglePathMap onSelectId={handleIdFromChild}/>
        </div>

        <GPTComponent selectedPathId={selectedPathId}/>

      </main>
    </React.Fragment>
  )
}


export default MapSinglePath