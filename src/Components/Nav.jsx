import React, { useEffect, useState } from 'react';
import { FaUserCircle } from "react-icons/fa";


function Nav({ Registerhandler, Loginhandler, Logouthandler, ShowLogout }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const user = localStorage.getItem('Username');
    if (user) {
      setUsername(user);
    }
  }, []);

  return (
    <div className="navbar">
      <div className="logo">
        <h1>Imgen</h1>
      </div>

      <div className="nav-auth">
        {ShowLogout ? (
          <>
            <span className="user-info">
              <FaUserCircle style={{ marginRight: '5px' }} />
              {username}
            </span>
            <span className="nav-btn logout" onClick={Logouthandler}>Logout</span>
          </>
        ) : (
          <>
            <span className="nav-btn" onClick={Loginhandler}>Login</span>
            {/* <span className="nav-btn" onClick={Registerhandler}>Signup</span> */}
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
