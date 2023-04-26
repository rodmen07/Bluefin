import React, { useEffect } from 'react';
import { getListings, fetchListings } from '../../store/listings';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
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
          <Link to={`/listings/${listing.id}`}>
            <img src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="listing" className="listingPhoto"/>
            <h2>Price: ${listing.price}</h2>
            <p>Bed: {listing.bed}</p>
            <p>Bath: {listing.baths}</p>
            <p>Sqft: {listing.sqft}</p>
            <p>{listing.address}</p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Listings;
