import React, { useState } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import './SignupForm.css';

export default function SignupForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const res = await dispatch(sessionActions.signup({ email, username, password }));
      if (res.errors) {
        setErrors(res.errors);
      } else {
        // Successful signup, now log in the user
        const loginRes = await dispatch(sessionActions.login({ credential: email, password }));
        if (loginRes.errors) {
          setErrors(loginRes.errors);
        } else {
          // Redirect the user to the home page after successful login
          history.push('/');
        }
      }
    } else {
      setErrors(['Confirm Password field must be the same as the Password field']);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="signup-form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          minLength={3}
          maxLength={30}
        />
      </label>
      <label>
        Username
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength={3}
          maxLength={255}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          maxLength={255}
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          minLength={6}
          maxLength={255}
        />
      </label>
      <button type="submit">Sign Up</button>
      <p>By signing up you agree to Bluefin's Terms of Use and Privacy Policy</p>
    </form>
  );
}
