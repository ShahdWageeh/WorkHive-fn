import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();
export default function AuthContextProvider({ children }) {
  let [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (
      storedToken &&
      typeof storedToken === "string" &&
      storedToken.trim() !== ""
    ) {
      setToken(storedToken);
      try {
        const decodedToken = jwtDecode(storedToken);
        setDecoded(decodedToken);
        // console.log("Decoded token:", decodedToken);
      } catch (error) {
        console.error("Invalid token:", error);
        setDecoded(null);
      }
    }
  }, []);
  // function verifyToken(){
  //   setToken(localStorage.getItem('token'))
  //   setDecoded(jwtDecode(token))
  //   console.log(decoded);

  // }
  // useEffect(()=>{
  //   setToken(localStorage.getItem('token'))
  //   if(token && typeof token === "string" && token.trim() !== ""){
  //     verifyToken()
  //   }
  // },[token])
  return (
    <>
      <AuthContext.Provider value={{ token, setToken, decoded }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
