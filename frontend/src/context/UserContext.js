// UserContext.js
import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [organization, setOrganization] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
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

  const fetchOrganizationDetails = async (organizationId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/organization/${organizationId}`, {
        method: 'GET'
      });

      if (!response.ok) {
        console.error('Failed to fetch organization details:', response.status, response.statusText);
        return;
      }

      const organizationData = await response.json();
      setOrganization(organizationData);

      if (organizationData.subscription) {
        fetchSubscriptionDetails(organizationData.subscription);
      }

    } catch (error) {
      console.error('Error fetching organization details:', error);
    }
  };

  const fetchSubscriptionDetails = async (subscriptionId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/subscription/${subscriptionId}`, {
        method: 'GET'
      });

      if (!response.ok) {
        console.error('Failed to fetch subscription details:', response.status, response.statusText);
        return;
      }

      const subscriptionData = await response.json();
      setSubscription(subscriptionData);
      
    } catch (error) {
      console.error('Error fetching subscription details:', error);
    }
  };

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

      if (userData.role === 'Admin' && userData.organization) {
        fetchOrganizationDetails(userData.organization);
      }
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
    <UserContext.Provider value={[user, organization, subscription]}> 
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
