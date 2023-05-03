import React from "react";
import {Route, Switch} from 'react-router-dom'
import Navigation from "./components/Navigation";
import Listings from "./components/Listings/ListingsIndex";
import ListingShow from "./components/Listings/ListingShow";
import UsersListings from "./components/Listings/UserListingsIndex";
import "./index.css";

function App() {
  function handleButtonClick() {
    window.open('https://rodmen07.github.io/JavaScript-Project/', '_blank');
  }
  return (
    <>
      <div className="App">
        <div className ='background-image'>
          <form class="search-bar">
          <label for="search-input">Search with Bluefin. <br/> Tour with a Bluefin Agent.</label>
            <button type="submit">Search by Filters</button>
          </form>
        </div>
        <h1>Bluefin</h1>
        <Navigation />
        <Switch>
          <Route exact path= '/'>
            <button onClick={handleButtonClick} className="mortgage-calc-link">Mortgage Affordability Calculator </button>
            <h2>Feed</h2>
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
