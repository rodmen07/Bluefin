import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { fetchListing, getListing } from '../../store/listings';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';



function ListingShow () {
    const dispatch = useDispatch();
    const { id } = useParams();
    const listing = useSelector(getListing(id));

    useEffect(() => {
        dispatch(fetchListing(id));
    }, [dispatch, id])

    return (
        <div>{listing.address}</div>
    )
}

export default ListingShow;
