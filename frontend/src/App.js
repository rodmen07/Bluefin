import React from "react";
import Navigation from "./components/Navigation";
import "./index.css";

function App() {
  return (
    <>
      <div className="App">
        <div className ='background-image'></div>
        <h1>Bluefin</h1>
        <Navigation />
        <p>Listings</p>
      </div>

    </>

  );
}

export default App;
