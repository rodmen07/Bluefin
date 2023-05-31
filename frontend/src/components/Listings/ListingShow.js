import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchListing, getListing } from '../../store/listings';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import "./ListingShow.css"

export default function ListingShow () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const listing = useSelector(getListing(id));

    useEffect(() => {
        dispatch(fetchListing(id));

    }, [dispatch, id]);

    useEffect(() => {
        function initMap() {
            const cities = [
                { name: 'New York', lat: 40.7128, lng: -74.0060 },
                { name: 'London', lat: 51.5074, lng: -0.1278 },
                { name: 'Tokyo', lat: 35.6895, lng: 139.6917 },
                { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
                { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 }
            ];

            const randomCity = cities[Math.floor(Math.random() * cities.length)];

            const mapElement = document.getElementById('map');
            if (mapElement) {
                const map = new window.google.maps.Map(mapElement, {
                center: { lat: randomCity.lat, lng: randomCity.lng },
                zoom: 16,
                });

                const marker = new window.google.maps.Marker({
                position: { lat: randomCity.lat, lng: randomCity.lng },
                map: map,
                title: randomCity.name,
                });
            }
        }

        initMap();
      }, [listing]);


    return (
        <div className="listing-container">
            {listing && (
                <>
                    <div className="image-map-container">
                        <img src={listing.photoUrls} alt="" className="listing-show-image"/>
                        <div id="map"></div>
                    </div>
                    <div id="address">{listing?.address} (Note: Address and Google Maps locations are randomly generated)</div>
                    <h2>${listing?.price.toLocaleString()} - For Sale &nbsp;&nbsp;&nbsp; {listing.bed} Beds {listing.baths} Baths {listing.sqft.toLocaleString()} Sq. Ft.</h2>
                    <h3>About this home</h3>
                    <p className="description"> Welcome to this stunning home located in the heart of the charming Willow Glen neighborhood! This home is perfect for those who love to entertain. The spacious living room features a cozy fireplace, built-in shelving, and large windows that fill the room with natural light. The chef's kitchen boasts granite countertops, stainless steel appliances, and ample cabinet space. The primary bedroom is a peaceful retreat with a private en-suite bathroom and a walk-in closet. Two additional bedrooms offer plenty of space for family or guests. You'll love spending time outdoors in the beautifully landscaped backyard, which features a large patio area and lush greenery. Conveniently located near top-rated schools, shopping, dining, and entertainment options, this home has everything you need for comfortable living. Don't miss out on this wonderful opportunity to make this house your forever home!</p>
                </>
            )}
        </div>

    )
}
