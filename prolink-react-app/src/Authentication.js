import { useState, useEffect } from 'react';

const Authentication = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
      // Function to check authentication status
      const checkAuthentication = async () => {
        try {
          // Call validateTokens function to check if the user is authenticated
          const response = await fetch('/api/user-auth', {
            method: 'GET',
            credentials: 'include'
          });
          if (response.success === true) {
            setIsLoggedIn(true);
          } else {
            setIsLoggedIn(false);
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          setIsLoggedIn(false);
        }
      };
  
      // Call the function to check authentication status when the component mounts
      checkAuthentication();
    }, []);
  
    return isLoggedIn;
  };
  

export default Authentication;