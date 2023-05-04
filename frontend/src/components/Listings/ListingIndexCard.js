import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getFavorites, removeFavorite, createFavorite } from "../../store/favorites";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as emptyHeart } from '@fortawesome/free-regular-svg-icons';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';

export default function ListingsIndexCard ({listing, sessionUser}) {
    const dispatch = useDispatch();
    const [favorited, setFavorited] = useState(false);
    const favorites = useSelector(getFavorites);
    const [currentFavorite, setCurrentFavorite] = useState({})

    const handleFavoriteClick = () => {
      if (favorited) {
        dispatch(removeFavorite(currentFavorite.id))
        setFavorited(false)
      } else {
        dispatch(createFavorite({listings_id: listing.id})) 
      }
    };

    function checkIfFavorited() {
        favorites.forEach (favorite => {
            if (favorite.listingsId === listing.id ) {
                setFavorited(true);
                setCurrentFavorite(favorite);
            }
        })
    }

    useEffect(() => {
        checkIfFavorited();
    }, [favorites])

   return  (
    <div key={listing.id} className="listing">
        <Link to={`/listings/${listing.id}`}target="_blank">
            <img src={listing.photoUrls} alt="listing" className="listingPhoto" />
        </Link>
        <div className="listing-info">
        <h2>${listing.price.toLocaleString()}</h2>
        <p>{listing.bed} Beds {listing.baths} Baths {listing.sqft.toLocaleString()} Sq. Ft.</p>
        <p>{listing.address}</p>
        </div>
        {!sessionUser ? null : (
            <button className="button favorite-button" onClick={handleFavoriteClick}>
                <FontAwesomeIcon icon={favorited ? solidHeart : emptyHeart} />
            </button>
        )}
    </div>
   )
}