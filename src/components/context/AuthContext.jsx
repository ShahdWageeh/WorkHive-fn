import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [token, setToken] = useState(null);
  const [decoded, setDecoded] = useState(null);

  useEffect(() => {
    try {
      // Get token from localStorage
      const storedToken = localStorage.getItem("token");

      // Validate token format
      if (storedToken && 
          typeof storedToken === "string" && 
          storedToken.trim() !== "" &&
          storedToken.split('.').length === 3) {  // JWT should have 3 parts
        
        try {
          // Attempt to decode the token
          const decodedToken = jwtDecode(storedToken);
          
          // Check if token is expired
          if (decodedToken.exp && decodedToken.exp * 1000 > Date.now()) {
            setToken(storedToken);
            setDecoded(decodedToken);
          } else {
            // Token is expired
            console.log("Token expired");
            localStorage.removeItem("token");
            setToken(null);
            setDecoded(null);
          }
        } catch (error) {
          console.error("Token decode error:", error);
          localStorage.removeItem("token");
          setToken(null);
          setDecoded(null);
        }
      } else {
        // Invalid token format
        console.log("Invalid token format");
        localStorage.removeItem("token");
        setToken(null);
        setDecoded(null);
      }
    } catch (error) {
      console.error("Auth context error:", error);
      localStorage.removeItem("token");
      setToken(null);
      setDecoded(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, decoded }}>
      {children}
    </AuthContext.Provider>
  );
}
