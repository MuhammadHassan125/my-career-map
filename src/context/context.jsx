import { createContext, useContext, useEffect, useState } from "react";
import { baseURL } from "../Fire/useFire";
import { Snackbar } from "../Utils/SnackbarUtils";
import Fire from "../Fire/Fire";

const Context = createContext();
const LoadingContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [data, setData] = useState([]);

  // checking the status of subscription 
  const [checkSubscription, setCheckSubscription] = useState(true);

  const [singlePathData, setSinglePathData] = useState([]);


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
      },
      onError: (err) => {
        Snackbar(err.message, { variant: 'error' });
      },
    });
  };

  const authToken = localStorage.getItem('user-visited-dashboard')
  useEffect(() => {
    if (authToken) {
      gettingProfileInfo();
      getUploadDataList();
    }
  }, [authToken]);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
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
        singlePathData,
        setSinglePathData,
        // handleLoginSuccess,
        getUploadDataList,
        setCheckSubscription,
        checkSubscription,
        loading,
        setLoading
      }}
    >
      {children}
    </Context.Provider>
    </LoadingContext.Provider>

  );
};

export default UserProvider;

export const useUser = () => useContext(Context);
export const useLoading = () => useContext(LoadingContext);