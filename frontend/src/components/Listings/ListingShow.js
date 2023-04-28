import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchListing, getListing } from '../../store/listings';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import "./Listings.css"


function ListingShow () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const listing = useSelector(getListing(id));
    const sessionUser = useSelector(state => state.session.user);
    useEffect(() => {
        dispatch(fetchListing(id));
    }, [dispatch, id])

    return (
        <div className="listingContainer">
            <img src="https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""/>
            <h2>Price: ${listing?.price}</h2>
            <div>{listing?.address}</div>
            <p>Bed: {listing?.bed}</p>
            <p>Bath: {listing?.baths}</p>
            <p>Sqft: {listing?.sqft}</p>
            <p>Description: Welcome to this stunning home located in the heart of the charming Willow Glen neighborhood! This home is perfect for those who love to entertain. The spacious living room features a cozy fireplace, built-in shelving, and large windows that fill the room with natural light. The chef's kitchen boasts granite countertops, stainless steel appliances, and ample cabinet space. The primary bedroom is a peaceful retreat with a private en-suite bathroom and a walk-in closet. Two additional bedrooms offer plenty of space for family or guests. You'll love spending time outdoors in the beautifully landscaped backyard, which features a large patio area and lush greenery. Conveniently located near top-rated schools, shopping, dining, and entertainment options, this home has everything you need for comfortable living. Don't miss out on this wonderful opportunity to make this house your forever home!</p>
            {!sessionUser ? null : <button className="button">Favorite</button> }
            
        </div>
        
    )
}

export default ListingShow;
