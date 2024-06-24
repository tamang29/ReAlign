// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log('decodedToken: ');
        console.log(decodedToken);
        const userId = decodedToken.id; // Ensure userId is extracted correctly
        if (userId) {
          fetchUserDetails(userId, token);
        } else {
          console.error('Decoded token does not contain userId:', decodedToken);
        }
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  const fetchUserDetails = async (userId, token) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/user/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        console.error('Failed to fetch user details:', response.status, response.statusText);
        return;
      }

      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // const logout = () => {
  //   localStorage.removeItem('userToken');
  //   localStorage.removeItem('userData');
  //   setUser(null);
  // };

  return (
    <UserContext.Provider value={[user, setUser]}> 
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
