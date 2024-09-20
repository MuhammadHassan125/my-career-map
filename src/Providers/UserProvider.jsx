import React, { useEffect } from 'react'
import useFire, { baseURL } from '../Fire/useFire';
import UserContext from '../context/userContext';

const UserProvider = ({children}) => {

    const { get, processing} = useFire();

    const authToken = localStorage.getItem('user-visited-dashboard')
    const gettingProfileInfo = () => {
        if (!authToken) return;  
    
        get({
          url: `${baseURL}/show-profile`,
          headers: { Authorization: `Bearer ${authToken}` },
          onSuccess: (res) => {
            setUser(res.data);
          },
          onError: (err) => {
            Snackbar(err.message, { variant: 'error' });
          },
        });
      };

    useEffect(() => {
        gettingProfileInfo();
    },[authToken])
    
  return (
    <UserContext.Provider>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider