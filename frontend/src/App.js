import React from "react";
import {Route, Switch} from 'react-router-dom'
import Navigation from "./components/Navigation";
import Listings from "./components/Listings";
import ListingShow from "./components/Listings/listing.js";
import "./index.css";

function App() {
  return (
    <>
      <div className="App">
        <div className ='background-image'></div>
        <h1>Bluefin</h1>
        <Navigation />
        <Switch>
          <Route exact path= '/'>
            <p>Listings</p>
            <Listings />
          </Route>
          <Route exact path='/listings/:id'>
            <ListingShow />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
