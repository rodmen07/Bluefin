import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';


function ProfileButton({ user }) {

  const sessionUser = useSelector(state => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <>
      <button onClick={openMenu}>
      <i class="fa-solid fa-fish-fins"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">

          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>

          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
