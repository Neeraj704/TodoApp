import React from 'react'

const LogOut = () => {
  function clearToken () {
    sessionStorage.removeItem('jwtToken');
  }

  return (
    <div>
      <button onClick={clearToken}>LOG OUT</button>
    </div>
  );
}

export default LogOut;