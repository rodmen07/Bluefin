import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import * as listingActions from "../../../store/listings"

function ListingCreateForm({onSubmit}) {
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
      .catch(async (res) => {
      let data;
      try {
        // .clone() essentially allows you to read the response body twice
        data = await res.clone().json();
      } catch {
        data = await res.text(); // Will hit this case if the server is down
      }
      if (data?.errors) setErrors(data.errors);
      else if (data) setErrors([data]);
      else setErrors([res.statusText]);
    });
  };

  return (
    <form onSubmit={handleSubmit} className="create-listing-form">
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

export default ListingCreateForm;