import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as listingActions from "../../../store/listings";

export default function ListingCreateForm({onSubmit}) {
  const dispatch = useDispatch();
  const {userid} = useParams();
  const [address, setAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [bed, setBed] = useState(0);
  const [baths, setBaths] = useState(0);
  const [sqft, setSqft] = useState(0);
  const [lister_id, setLister_Id] = useState(0);
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLister_Id(userid);
    setErrors([]);
    onSubmit();
    return dispatch(listingActions.createListing({ address, price, bed, baths, sqft, lister_id}))
    .catch((error) => {
      let data;
      if (error.response) {
        // The error has a response object
        if (error.response.data?.errors) {
          // Handle specific error format
          data = error.response.data.errors;
        } else {
          // Handle generic error message
          data = error.response.data || error.response.statusText;
        }
      } else {
        // Handle server or network errors
        data = error.message || "Something went wrong";
      }
      setErrors(Array.isArray(data) ? data : [data]);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-listing-form">
      <ul>
        {errors.map(error => <li key={error}>{error}</li>)}
      </ul>
      <label> Address
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} maxLength={50} required />
      </label>
      <label> Price
        <input type="float" value={price} onChange={(e) => setPrice(e.target.value)} min={1} required />
      </label>
      <label> Bed
        <input type="number" value={bed} onChange={(e) => setBed(e.target.value)} min={1} required />
      </label>
      <label> Baths
        <input type="number" value={baths} onChange={(e) => setBaths(e.target.value)} min={1} required />
      </label>
      <label> Sqft
        <input type="number" value={sqft} onChange={(e) => setSqft(e.target.value)} min={1} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
