import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CountrySelect, StateSelect, CitySelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import './StoreForm.css';

const categories = [
  "Appliances", "Baby", "Beauty and Personal Care", "Books and Stationery", "Clothing",
  "Electronics", "Food and Grocery", "Footwear", "Furniture", "General",
  "Health Supplements", "Home and Kitchen", "Home Care", "Jewelry",
  "Lawn and Garden", "Luggage and Bags", "Multipurpose", "Pet Products",
  "Sports and Fitness", "Toys and games", "Watches", "Other"
];

function StoreForm() {
  const navigate = useNavigate();
  const [storeName, setStoreName] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
  const [address, setAddress] = useState('');
  const [area, setArea] = useState('');
  const [landmark, setLandmark] = useState('');
  const [pincode, setPincode] = useState('');
  const [countryId, setCountryId] = useState(null);
  const [stateId, setStateId] = useState(null);
  const [cityId, setCityId] = useState(null);
  const [selected, setSelected] = useState([]);
  const [otherInput, setOtherInput] = useState('');

  // Manual check on button click only
  const checkAvailability = () => {
    const taken = ['localscope', 'amazshop', 'myshop'];
    const trimmed = storeName.trim().toLowerCase();
    if (trimmed === '') {
      alert('Please enter a store name first.');
      return;
    }
    setIsAvailable(!taken.includes(trimmed));
  };

  const toggleCategory = (category) => {
    if (category === "Other") {
      if (!selected.includes("Other")) setSelected([...selected, "Other"]);
      else setSelected(selected.filter(c => c !== "Other"));
    } else {
      setSelected(prev =>
        prev.includes(category)
          ? prev.filter(c => c !== category)
          : [...prev, category]
      );
    }
  };

  return (
    <div className="m1">
      {/* Navbar */}
      <div id="navbar">
        <span id="logo">Local<span id="biz-color">Scope</span></span>
        <div id="nav-links">
          <span>Help</span>
          <span onClick={() => navigate('/login')}>Logout</span>
        </div>
      </div>

      {/* Store Name + Location */}
      <div className="s1">
        <div className="left s1left">
          <h1 id="form-title">What should we call your store?</h1>
          <p id="form-subtitle">You won’t be able to change the store name later!</p>

          <label>Store Name*</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => {
              setStoreName(e.target.value);
              setIsAvailable(null); 
            }}
            placeholder="Enter your store name"
          />
          <button  style={{backgroundColor:"blue",color:"white"}} onClick={checkAvailability}>Check</button>
<br /> <br />
          {isAvailable === true && (
            <p id="available" style={{ color: 'green', marginTop: '5px' }}>
              Store name is available
            </p>
          )}
          {isAvailable === false && (
            <p style={{ color: 'red', marginTop: '-10px' }}>
              Store name is taken
            </p>
          )}

          <label>Store Link</label>
          <input
            type="text"
            value={storeName ? `www.localScope.in/${storeName.toLowerCase()}` : ''}
            readOnly
          />
          <p id="storelink">This is your store link that customers will use.</p>
        </div>

        <div className="right s1left">
          <h1 id="form-title">Where is your store located?</h1>
          <p id="form-subtitle">You can update your location anytime.</p>

          <label>Shop Address*</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Shop No, Building, Apartment"
            maxLength={100}
            required
          />

          <label>Area / Street*</label>
          <input
            type="text"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            placeholder="Area, Street, Sector, Village"
            required
          />

          <label>Landmark (optional)</label>
          <input
            type="text"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            placeholder="Landmark"
          />

          <label>Pincode*</label>
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter pincode"
             maxLength={6}
            required
          />

          <div className="location-selects">
            <div style={{ flex: 1 }}>
              <label>Country*</label>
              <CountrySelect
                countryid={countryId}
                onChange={(country) => {
                  setCountryId(country.id);
                  setStateId(null);
                  setCityId(null);
                }}
                placeHolder="Country"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>State*</label>
              <StateSelect
                countryid={countryId}
                stateid={stateId}
                onChange={(state) => {
                  setStateId(state.id);
                  setCityId(null);
                }}
                placeHolder="State"
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>City*</label>
              <CitySelect
                countryid={countryId}
                stateid={stateId}
                cityid={cityId}
                onChange={(city) => {
                  setCityId(city.id);
                }}
                placeHolder="City"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <div className="productcontainer">
        <div className="product-image">
          <img
            src="https://static-cse.canva.com/blob/2096565/1600w-2TUnV0NhHqk.jpg"
            alt="Product Preview"
          />
        </div>

        <div className="productform">
          <h1 id="form-title">What products do you offer?</h1>
          <p id="form-subtitle">Select as many as you like. You can change them later.</p>

          <div id="categories">
            {categories.map((category, index) => (
              <button
                key={index}
                className={`category-tag ${selected.includes(category) ? 'selected' : ''}`}
                onClick={() => toggleCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {selected.includes("Other") && (
            <input
              id="other-category-input"
              type="text"
              placeholder="Specify other product"
              value={otherInput}
              onChange={(e) => setOtherInput(e.target.value)}
            />
          )}

          <button
            id="next-button"
            onClick={() => {
              if (storeName && address && area && pincode && selected.length > 0) {
                navigate('/');
              } else {
                alert('Please fill all required fields.');
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default StoreForm;
