import React, { useEffect, useState } from 'react';
import { getListings, fetchListings } from '../../store/listings';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './ListingsIndex.css';

function Listings() {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  const sessionUser = useSelector(state => state.session.user);
  const [favorited, setFavorited] = useState(false);

  const handleFavoriteClick = () => {
    setFavorited(!favorited);
  };

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  return (
    <div className="listings-container">
      {listings.map(listing => (
        <div key={listing.id} className="listing">
          <Link to={`/listings/${listing.id}`}>
            <img src={listing.photoUrls} alt="listing" className="listingPhoto" />
          </Link>
          <div className="listing-info">
            <h2>${listing.price.toLocaleString()}</h2>
            <p>{listing.bed} Beds {listing.baths} Baths {listing.sqft.toLocaleString()} Sq. Ft.</p>
            <p></p>
            <p>{listing.address}</p>
          </div>
            {!sessionUser ? null : (
              <button className="button" onClick={handleFavoriteClick}>
              {favorited ? 'Favorited' : 'Favorite'}
              </button>
            )}
        </div>
      ))}
    </div>
  );
}

export default Listings;
