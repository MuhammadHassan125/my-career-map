import { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../Fire/useFire";
import { Snackbar } from "../Utils/SnackbarUtils";
import Fire from "../Fire/Fire";

const Context = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [data, setData] = useState([]);

  // checking the status of subscription 
  const [checkSubscription, setCheckSubscription] = useState(true);

  const [nextRole, setNextRole] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage?.getItem('user-visited-dashboard'));
  

  // loading state 
  const [loading, setLoading] = useState(false);

  // getting details through map 
  const [gettingSkillsData, setGettingSkillsData] = useState(null);
  const [getTitle, setGetTitle] = useState(null);
  const [getDescription, setGetDescription] = useState(null);

  const gettingProfileInfo = () => {
    if (!authToken) return;  

    Fire.get({
      url: `${baseURL}/show-profile`,
      headers: { Authorization: `Bearer ${authToken}` },
      onSuccess: (res) => {
        setUser(res.data);
      },
      onError: (err) => {
        console.log(err);
        Snackbar(err.message, { variant: 'error' });
      },
    });
  };

  const getUploadDataList = () => {
    if (!authToken) return; 

    Fire.get({
      url: `${baseURL}/get-paths-for-user`,
      headers: { Authorization: `Bearer ${authToken}` },
      onSuccess: (res) => {
        setData(res.data.data.result);
        console.log(res.data.data.result);
      },
      onError: (err) => {
        console.log(err);
        Snackbar(err.message, { variant: 'error' });
      },
    });
  };


  const handleLoginSuccess = (token) => {
    localStorage.setItem('user-visited-dashboard', token);
    setAuthToken(token);
  };

  useEffect(() => {
    if (authToken) {
      gettingProfileInfo();
      getUploadDataList();
    }
  }, [authToken]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        gettingProfileInfo,
        setGettingSkillsData,
        gettingSkillsData,
        getTitle,
        setGetTitle,
        getDescription,
        setGetDescription,
        data,
        handleLoginSuccess,
        getUploadDataList,
        setCheckSubscription,
        checkSubscription,
        setNextRole,
        nextRole,
        loading,
        setLoading
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default UserProvider;

export const useUser = () => useContext(Context);
