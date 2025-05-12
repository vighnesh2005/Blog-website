import Mycontext from "./context";
import { useEffect, useState } from "react";

function Provider({ children }){
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem('isLoggedIn') === 'true';
});

const [user, setUser] = useState(() => {
  return localStorage.getItem('user') || '';
});

const [token, setToken] = useState(() => {
  return localStorage.getItem('token') || '';
});

useEffect(()=>{
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn",isLoggedIn);
    localStorage.setItem("user", user);
},[token,isLoggedIn,user])
    return (
        <Mycontext.Provider value={{ user, setUser, isLoggedIn, setIsLoggedIn, token, setToken }}>
            {children}
        </Mycontext.Provider>
    )
}

export default Provider;
