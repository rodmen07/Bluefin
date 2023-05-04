import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProfileButton from './ProfileButton'
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from '../../store/session';
import './Navigation.css';

function Navigation(){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);


  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink exact to={`/listings/user/${sessionUser.id}`}>
          <button>My Profile</button>
        </NavLink>
        <button onClick={logout}>Log Out</button>
        <ProfileButton user={sessionUser} />
      </>

    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }
  return (
    <ul className="Navigation">
      <li>
        <NavLink exact to="/">Home</NavLink>
        {sessionLinks}
        <a href="https://www.linkedin.com/in/roderick-mendoza-9133b7b5/"><img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" width="50" height="50"/></a>
        <a href="https://github.com/rodmen07"><img src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png" width="50" height="50"/></a>
      </li>
    </ul>
  );
}

export default Navigation;
