import { useState } from 'react';
import MapContext from '../context/mapContext';

const MapProvider = ({children}) => {

    const [gettingSkillsData, setGettingSkillsData] = useState(null);
    const [getTitle, setGetTitle] = useState(null);
    const [getDescription, setGetDescription] = useState(null);
    const [nextRole, setNextRole] = useState(null);

  return (

    <MapContext.Provider
      value={{
        setGettingSkillsData,
        gettingSkillsData,
        getTitle,
        setGetTitle,
        getDescription,
        setGetDescription,
        setNextRole,
        nextRole
      }}
    >
        {children}
    </MapContext.Provider>
  )
}

export default MapProvider