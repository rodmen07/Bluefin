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
    const photo_urls = [photo_urls_array[Math.floor(Math.random() * photo_urls_array.length)]];
    onSubmit();
    return dispatch(listingActions.createListing({ address, price, bed, baths, sqft, lister_id, photo_urls: photo_urls}))
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

const photo_urls_array =
["https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-ali-m%C3%BCft%C3%BCo%C4%9Fullar%C4%B1-2282445.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-asad-photo-maldives-1268871.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-bianca-1560065.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-carlos-machado-1013427.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-dejan-nouval-2566860.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-dominika-roseclay-977739.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-eberhard-grossgasteiger-449461.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-eneida-nieves-803975.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-fomstock-com-1115804.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-frans-van-heerden-1438834.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-gerritt-tisdale-903028.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-gord-maclean-750697.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-gord-maclean-750697.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-jens-mahnke-1105754.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-jonathan-borba-2888492.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-kelly-2510067.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-valeriia-miller-2587054.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-tobias-bj%C3%B8rkli-1559825.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-matheus-bertelli-2351649.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-matheus-bertelli-2980955.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-niki-nagy-1694360.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-oleksandr-pidvalnyi-1170686.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-quang-nguyen-vinh-2155202.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-scott-webb-1022936.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-scott-webb-1029599.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-sebastian-palomino-1862402.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-sindre-fs-950058.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-luca-istrate-15469360.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-thgusstavo-santana-2102587.jpg",
  "https://fsp-bluefin-seeds.s3.us-west-1.amazonaws.com/assets/pexels-binyamin-mellish-1396122.jpg"]

export default ListingCreateForm;
