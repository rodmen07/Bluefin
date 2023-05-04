import React, { useEffect } from 'react';
import { getListings, fetchListings } from '../../store/listings';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ListingCreateFormModal from './ListingCreateModal';
import ListingEditFormModal from './ListingEditModal';
import './UserListingsIndex.css';
import ListingDeleteFormModal from './ListingsDeleteModal';

function UsersListings() {

  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  const { userid } = useParams();

  useEffect(() => {
    dispatch(fetchListings());
  }, [dispatch]);

  const filteredListings = listings.filter(listing => listing.listerId == userid);

  return (
    <>
      <ListingCreateFormModal/>
      <div className="listings-container">
        {filteredListings.map(listing => {
            return (
              <div key={listing.id} className="listing">
                <Link to={`/listings/${listing.id}`}>
                  <img src={listing.photoUrls} alt="listing" className="listingPhoto"/>
                </Link>
                <div className="listing-info">
                  <h2>${listing.price.toLocaleString()}</h2>
                  <p>{listing.bed} Beds {listing.baths} Baths {listing.sqft.toLocaleString()} Sq. Ft.</p>
                  <p>{listing.address}</p>
                  <ListingEditFormModal listingId={listing.id}/>
                  <ListingDeleteFormModal listingId={listing.id}/>
                </div>
              </div>
            );
        })}
      </div>
    </>
  )
}

export default UsersListings;
