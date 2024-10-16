import React, { useState } from 'react'
import { BiExport } from "react-icons/bi";
import SinglePathMap from './SinglePathMap';
import AddPathComponent from '../../Components/AddPathComponent';
import GPTComponent from '../../Components/DashboardComponents/DataGrid/GptComponent';
import './index.scss'

const MapSinglePath = () => {

    const [selectedPathId, setSelectedPathId] = useState(null);

    const handleIdFromChild = (id) => {
      setSelectedPathId(id);
    };

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