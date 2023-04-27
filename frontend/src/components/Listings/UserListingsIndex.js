import React, { useEffect } from 'react';
import { getListings, fetchListings } from '../../store/listings';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ListingCreateFormModal from './ListingCreateModal';
import ListingEditFormModal from './ListingEditModal';
import './Listings.css';
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
                        <img
                        src="https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="listing"
                        className="listingPhoto"
                        />
                        <h2>Price: ${listing.price}</h2>
                    </Link>
                    <p>Bed: {listing.bed}</p>
                    <p>Bath: {listing.baths}</p>
                    <p>Sqft: {listing.sqft}</p>
                    <p>{listing.address}</p>
                    <ListingEditFormModal listingId={listing.id}/>
                    <ListingDeleteFormModal listingId={listing.id}/>
                    </div>
                );
            })}
        </div>
    </>
  )
}

export default UsersListings;
