import React, { useEffect } from 'react';
import { getListings, fetchListings } from '../../store/listings';
import { useDispatch, useSelector } from 'react-redux';
import './Listings.css';

function Listings() {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  console.log(listings);

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <div className="listings-container">
      {listings.map(listing => (
        <div key={listing.id} className="listing">
          <h2>{listing.address}</h2>
          <p>Price: {listing.price}</p>
          <p>Bed: {listing.bed}</p>
          <p>Bath: {listing.baths}</p>
          <p>Sqft: {listing.sqft}</p>
        </div>
      ))}
    </div>
  );
}

export default Listings;
