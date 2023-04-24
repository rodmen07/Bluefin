import React from "react";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import "./index.css";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/signup">
          <SignupFormPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
