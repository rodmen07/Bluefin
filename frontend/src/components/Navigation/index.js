import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation(){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <NavLink to="/signup">Sign Up</NavLink>
        <LoginFormModal />
      </>
    );
  }

  return (
    <ul className="Navigation">
      <h1>Bluefin</h1>
      <li>
        <NavLink exact to="/">Home</NavLink>
        {sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
