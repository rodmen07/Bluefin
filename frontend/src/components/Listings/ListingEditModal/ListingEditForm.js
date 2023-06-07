import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as listingActions from "../../../store/listings"

function ListingEditForm({listingId, onSubmit}) {
  const dispatch = useDispatch();
  const listing = useSelector(listingActions.getListing(listingId))
  const {userid} = useParams();
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [bed, setBed] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sqft, setSqft] = useState(0);
  const [lister_id, setLister_Id] = useState(0);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (listing) {
        setAddress(listing.address);
        setPrice(listing.price);
        setBed(listing.bed);
        setBaths(listing.baths);
        setSqft(listing.sqft);
        setLister_Id(listing.lister_id);
    }
  }, [listing] )

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = listingId;
    setLister_Id(userid);
    onSubmit();
    setErrors([]);
    dispatch(listingActions.updateListing({ id, address, price, bed, baths, sqft, lister_id}))
  };



  return (
    <form onSubmit={handleSubmit} className="edit-listing-form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label> Address
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} maxLength={50} required />
      </label>
      <label> Price
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} min={1} max ={1000000000} required />
      </label>
      <label> Bed
        <input type="number" value={bed} onChange={(e) => setBed(e.target.value)} min={1} max={20}required />
      </label>
      <label> Baths
        <input type="number" value={baths} onChange={(e) => setBaths(e.target.value)} min={1} max={20} required />
      </label>
      <label> Sqft
        <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} min={1} max={100000} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ListingEditForm;
