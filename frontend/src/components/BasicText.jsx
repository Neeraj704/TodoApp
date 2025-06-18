import React, { useState , useEffect } from 'react'
import { jwtDecode } from 'jwt-decode';


const BasicText = () => {
  const [username, setUsername] = useState();
  useEffect(() => {
    const token = sessionStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  return (
    <div>
      <div>Hello, {username}! 👋🏻</div>
      <div>All your todos are here, in one place!</div>
    </div>
  )
}

export default BasicText