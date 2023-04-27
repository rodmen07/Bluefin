import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as listingActions from "../../../store/listings"

function ListingEditForm({listingId}) {
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
    setErrors([]);
    return dispatch(listingActions.updateListing({ id, address, price, bed, baths, sqft, lister_id}))
      .then(async (res) => {
      let data;
        data = await res.clone().json();
      })
  };

  return (
    <form onSubmit={handleSubmit} className="edit-listing-form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label>
        Address
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </label>
      <label>
        Price
        <input
          type="float"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </label>
      <label>
        Bed
        <input
          type="integer"
          value={bed}
          onChange={(e) => setBed(e.target.value)}
          required
        />
      </label>
      <label>
        Baths
        <input
          type="integer"
          value={baths}
          onChange={(e) => setBaths(e.target.value)}
          required
        />
      </label>
      <label>
        Sqft
        <input
          type="integer"
          value={sqft}
          onChange={(e) => setSqft(e.target.value)}
          required
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ListingEditForm;