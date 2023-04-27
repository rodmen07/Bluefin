import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import LoginForm from './LoginForm';
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const demoLogin = (e) => {
    e.preventDefault();
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" }))
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      <button onClick={(e) => demoLogin(e)}>Log In as Demo User</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default LoginFormModal;
