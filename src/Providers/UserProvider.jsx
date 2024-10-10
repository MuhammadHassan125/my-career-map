import React, { useEffect, useState } from 'react'
import UserContext from '../context/userContext';
import MapProvider from './MapProvider';
import useFetch from 'point-fetch-react';

const UserProvider = ({ children }) => {

  const { get } = useFetch({
    state:{}
  });
  const [user, setUser] = useState();

  const authToken = localStorage.getItem('user-visited-dashboard')
  const gettingProfileInfo = () => {
    if (!authToken) return;

    get({
      endPoint: `/show-profile`,
      headers: { Authorization: `Bearer ${authToken}` },
      onSuccess: (res) => {
        setUser(res.data);
      },
      onError: (err) => {
        console.log(err.message, { variant: 'error' });
      },
    });
  };

  useEffect(() => {
    gettingProfileInfo();
  }, [authToken])

  return (

    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      <MapProvider>
        {children}
      </MapProvider>
    </UserContext.Provider>
  )
}

export default UserProvider