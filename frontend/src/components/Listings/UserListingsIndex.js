import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getListings, fetchListings } from '../../store/listings';
import ListingCreateFormModal from './ListingCreateModal';
import ListingEditFormModal from './ListingEditModal';
import ListingDeleteFormModal from './ListingsDeleteModal';
import { restoreSession } from '../../store/session';
import './UserListingsIndex.css';
import ListingsIndexCard from './ListingIndexCard';

export default function UsersListings() {
  const dispatch = useDispatch();
  const listings = useSelector(getListings);
  const { userid } = useParams();
  const [listingsUpdated, setListingsUpdated] = useState(false);
  const favorites = Object.values(useSelector(state => state.favorites));
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    dispatch(fetchListings());
    dispatch(restoreSession());
    setListingsUpdated(false);
  }, [dispatch, listingsUpdated]);

  const handleListingsUpdate = () => {
    setListingsUpdated(true);
  };

  const filteredListings = listings.filter(listing => listing.listerId == userid);
  const favoritedListings = listings.filter(listing => favorites.some(favorite => favorite.listingsId === listing.id));

  console.log(favoritedListings);
  return (
    <>
      <h1 className="my-listings-header">My Listings</h1>
      <ListingCreateFormModal onListingCreate={handleListingsUpdate}/>
      <div className="listings-container">
        {filteredListings.reverse().map(listing => {
          return (
            <div key={listing.id} className="listing">
              <Link to={`/listings/${listing.id}`}>
                <img src={listing.photoUrls} alt="listing" className="listingPhoto"/>
              </Link>
              <div className="listing-info">
                <h2>${listing.price.toLocaleString()}</h2>
                <p>{listing.bed} Beds {listing.baths} Baths {listing.sqft.toLocaleString()} Sq. Ft.</p>
                <p>{listing.address}</p>
                <ListingEditFormModal listingId={listing.id} />
                <ListingDeleteFormModal listingId={listing.id} onDelete={handleListingsUpdate}/>
              </div>
            </div>
            );
          })}
      </div>
      <h1 className="my-listings-header">My Favorites</h1>
      <div className="listings-container">
        {favoritedListings.reverse().map(listing => {
          return (
            <div key={listing.id} className="listing">
              <ListingsIndexCard listing={listing} sessionUser={sessionUser}/>
            </div>
            );
          })}
      </div>
      <UserBio />
    </>
  )
}

function UserBio() {
  const [showBio, setShowBio] = useState(false);

  return (
    <>
      <h3>User Bio</h3>
      <img src="https://media.istockphoto.com/id/909675728/photo/businessman.jpg?s=612x612&w=0&k=20&c=AFoV-1P3FanXt4YKc37WsgPIiZvifm90_zDB1ZLVT4c="></img>
      <div className="user-bio">
        {showBio ? (
          <>
            <p>
              "Hi there! I'm a real estate enthusiast and a seasoned investor with a passion for finding the perfect home for my clients. With over a decade of experience in the industry, I have a keen eye for detail and a deep understanding of the local market trends. Whether you're looking to buy or sell a home, I'm committed to providing you with the best experience possible. From the initial consultation to the closing, I'll be with you every step of the way to ensure a smooth and stress-free transaction. In my free time, you can find me exploring new neighborhoods and checking out the latest listings. I look forward to working with you and helping you achieve your real estate goals!"
            </p>
            <button onClick={() => setShowBio(false)}>Hide Bio</button>
          </>
        ) : (
          <button onClick={() => setShowBio(true)}>Show Bio</button>
        )}
      </div>
    </>
  );
}
