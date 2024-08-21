import { createContext, useContext, React, useEffect, useState } from "react";
import { baseURL } from "../Fire/useFire";
import { Snackbar } from "../Utils/SnackbarUtils";
import Fire from "../Fire/Fire";

const Context = createContext();

const UserProvider = ({ children }) => {

    const [user, setUser] = useState();

    const gettingProfileInfo = () => {

        Fire.get({
            url: `${baseURL}/show-profile`,
            
            onSuccess: (res) => {
                console.log(res);
                setUser(res.data);
            },
            onError: (err) => {
                console.log(err);
                Snackbar(err.message, {variant: 'error'})
            }

        })
    };

    useEffect(() => {
        gettingProfileInfo();
    }, []);
    return (
        <Context.Provider value={{user, setUser, gettingProfileInfo}}>
            {children}
        </Context.Provider>
    )
}

export default UserProvider

export const useUser = () => useContext(Context);
