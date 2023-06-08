import React, { useState } from 'react';

export default function SearchForm({ onSearch }) {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1500000);
  const [minBeds, setMinBeds] = useState(0);
  const [maxBeds, setMaxBeds] = useState(10);
  const [minBaths, setMinBaths] = useState(0);
  const [maxBaths, setMaxBaths] = useState(10);
  const [favoritedOnly, setFavoritedOnly] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchParams = {
      minPrice,
      maxPrice,
      minBeds,
      maxBeds,
      minBaths,
      maxBaths,
      favoritedOnly,
    };
    // onSearch(searchParams); TODO: implement onSearch
  };

  const handleMinPriceChange = (event) => {
    const value = parseInt(event.target.value);
    setMinPrice(value);
    if (value > maxPrice) {
      setMaxPrice(value);
    }
  };

  const handleMaxPriceChange = (event) => {
    const value = parseInt(event.target.value);
    if (value >= minPrice) {
      setMaxPrice(value);
    }
  };


  const handleMinBedsChange = (event) => {
    const value = parseInt(event.target.value);
    setMinBeds(value);
    if (value > maxBeds) {
      setMaxBeds(value);
    }
  };

  const handleMinBathsChange = (event) => {
    const value = parseInt(event.target.value);
    setMinBaths(value);
    if (value > maxBaths) {
      setMaxBaths(value);
    }
  };

  const handleMaxBedsChange = (event) => {
    const value = parseInt(event.target.value);
    setMaxBeds(value);
    if (value < minBeds) {
      setMinBeds(value);
    }
  };

  const handleMaxBathsChange = (event) => {
    const value = parseInt(event.target.value);
    setMaxBaths(value);
    if (value < minBaths) {
      setMinBaths(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Price Range:
        <input
          type="range"
          min={0}
          max={1500000}
          step={10000}
          value={minPrice}
          onChange={handleMinPriceChange}
          style={{ width: '200px' }}
        />
        <input
          type="range"
          min={0}
          max={1500000}
          step={10000}
          value={maxPrice}
          onChange={handleMaxPriceChange}
          style={{ width: '200px' }}
        />
        <div>
          Min Price: ${minPrice.toLocaleString()}
        </div>
        <div>
          Max Price: ${maxPrice.toLocaleString()}
        </div>
      </label>
      <br />
      <label>
        Beds Range:
        <input
          type="range"
          min={0}
          max={10}
          value={minBeds}
          onChange={handleMinBedsChange}
          style={{ width: '200px' }}
        />
        <input
          type="range"
          min={0}
          max={10}
          value={maxBeds}
          onChange={handleMaxBedsChange}
          style={{ width: '200px' }}
        />
        <div>
          Min Beds: {minBeds}
        </div>
        <div>
          Max Beds: {maxBeds}
        </div>
      </label>
      <br />
      <label>
        Baths Range:
        <input
          type="range"
          min={0}
          max={10}
          value={minBaths}
          onChange={handleMinBathsChange}
          style={{ width: '200px' }}
        />
        <input
          type="range"
          min={0}
          max={10}
          value={maxBaths}
          onChange={handleMaxBathsChange}
          style={{ width: '200px' }}
        />
        <div>
          Min Baths: {minBaths}
        </div>
        <div>
          Max Baths: {maxBaths}
        </div>
      </label>
      <br />
      <label>
        Favorited Only:
        <input
          type="checkbox"
          checked={favoritedOnly}
          onChange={(event) => setFavoritedOnly(event.target.checked)}
        />
      </label>
      <br />
      <button type="submit">Search</button>
    </form>
  );
}
