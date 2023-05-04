import React, { useEffect } from 'react';
import { getListings, fetchListings } from '../../store/listings';
import { restoreSession } from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import ListingsIndexCard from './ListingIndexCard';
import './ListingsIndex.css';

function Listings() {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  const sessionUser = useSelector(state => state.session.user);
 
  useEffect(() => {
    dispatch(fetchListings());
    dispatch(restoreSession());
  }, [dispatch]);

  return (
    <div className="listings-container">
      {listings.map(listing => (
      <ListingsIndexCard key={listing.id} listing={listing} sessionUser={sessionUser}/>
      ))}
    </div>
  );
}

export default Listings;


