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

  // const gettingProfileInfo = () => {
  //   if (!authToken) return;  

  //   Fire.get({
  //     url: `${baseURL}/show-profile`,
  //     headers: { Authorization: `Bearer ${authToken}` },
  //     onSuccess: (res) => {
  //       setUser(res.data);
  //     },
  //     onError: (err) => {
  //       Snackbar(err.message, { variant: 'error' });
  //     },
  //   });
  // };

 
  const authToken = localStorage.getItem('user-visited-dashboard')
  // useEffect(() => {
  //   if (authToken) {
  //     gettingProfileInfo();
  //     getUploadDataList();
  //   }
  // }, [authToken]);

  return (
    // <LoadingContext.Provider value={{ loading, setLoading }}>
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
    // </LoadingContext.Provider>

  );
};

export default UserProvider;

export const useUser = () => useContext(Context);
// export const useLoading = () => useContext(LoadingContext);