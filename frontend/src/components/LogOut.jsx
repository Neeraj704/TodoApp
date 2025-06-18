import React from 'react'

const LogOut = () => {
  function clearToken () {
    localStorage.removeItem('jwtToken');
  }

  return (
    <div>
      <button onClick={clearToken}>LOG OUT</button>
    </div>
  )
}

export default LogOut;