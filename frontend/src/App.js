import React from "react";
import {Route, Switch} from 'react-router-dom'
import Navigation from "./components/Navigation";
import Listings from "./components/Listings/ListingsIndex";
import ListingShow from "./components/Listings/ListingShow";
import UsersListings from "./components/Listings/UserListingsIndex";
import "./index.css";

function App() {
  return (
    <>
      <div className="App">
        <div className ='background-image'>
          <form class="search-bar">
          <label for="search-input">Search with Bluefin. </label>
            <button type="submit">Search by Filters</button>
          </form>
        </div>
        <h1>Bluefin</h1>
        <Navigation />
        <Switch>
          <Route exact path= '/'>
            <p>Available Listings</p>
            <Listings />
          </Route>
          <Route exact path='/listings/:id'>
            <ListingShow />
          </Route>
          <Route exact path='/listings/user/:userid'>
            <UsersListings />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default App;
