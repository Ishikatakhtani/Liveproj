// StoreForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this

import './StoreForm.css';

function StoreForm() {
  const [storeName, setStoreName] = useState('');
  const [isAvailable, setIsAvailable] = useState(null);
const navigate = useNavigate(); // Add this line

  // Add this near the top inside StoreForm component
const [address, setAddress] = useState('');
const [area, setArea] = useState('');
const [landmark, setLandmark] = useState('');
const [pincode, setPincode] = useState('');


  useEffect(() => {
    const checkAvailability = () => {
      const takenStores = ['localscope', 'amazshop', 'myshop']; // Example
      if (storeName.trim() === '') {
        setIsAvailable(null);
      } else {
        setIsAvailable(!takenStores.includes(storeName.trim().toLowerCase()));
      }
    };

    const delay = setTimeout(() => {
      checkAvailability();
    }, 400); // debounce

    return () => clearTimeout(delay);
  }, [storeName]);

  return (
    <div id="main-container">
      <div id="left-panel">
        <div id="navbar">
          <span id="smartbiz-logo">Local<span id="biz-color">Scope</span> </span>
          <div id="nav-links">
            <span id="help-link">Help</span>
            <span id="logout-link" onClick={() => navigate('/login')}>Logout</span>
          </div>
        </div>

        <div id="store-form">
          <h1 id="form-title">What do you call your shop?</h1>
          <p id="form-subtitle">You won’t be able to change the store name later!</p>

          <label id="store-name-label">Store Name*</label>
          <input
            type="text"
            id="store-name-input"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Enter your store name"
          />
          {isAvailable === true && (
            <p id="store-available-msg">🎉 Congratulations! Store Name available</p>
          )}
          {isAvailable === false && (
            <p style={{ color: 'red', marginTop: '8px' }}>❌ Store name is already taken</p>
          )}

          <label id="store-link-label">Store Link</label>
          <input
            type="text"
            id="store-link-input"
            value={storeName ? `www.smartbiz.in/${storeName.toLowerCase()}` : ''}
            readOnly
          />
          <p id="store-link-note">
            This is your store link that customers will use to visit your store. You can always opt
            for a custom domain in future.
          </p>

          <button id="next-button">Next</button>
        </div>
      </div>

      <div id="right-panel">
        <div id="store-form">
          <h1 id="form-title">Where is your store located?</h1>
          <p id="form-subtitle">Feel free to change your shop location at any time from your profile.</p>

          <button id="location-button">📍 Use my current location</button>
          <div id="or-separator">OR</div>

          <label id="shop-address-label">Shop No, Building, Company, Apartment*</label>
      < input type="text" id="shop-address-input" value={address}
  onChange={(e) => setAddress(e.target.value)}
  placeholder="Enter shop address"
/>

          <label id="area-label">Area, Street, Sector, Village*</label>
          <input type="text" id="area-input" value={area}
  onChange={(e) => setArea(e.target.value)}
  placeholder="Enter area or street"
/>

          <label id="landmark-label">Landmark (optional)</label>
         <input type="text" id="landmark-input" value={landmark}
  onChange={(e) => setLandmark(e.target.value)}
  placeholder="Enter landmark"
/>

          <label id="pincode-label">Pincode*</label>
        <input type="text" id="pincode-input" value={pincode} onChange={(e) => setPincode(e.target.value)}
  placeholder="Enter pincode"
/>

          <button id="next-button" onClick={() => navigate('/product-selection')}>
  Next
</button>

        </div>

        <div id="chatbox">
          <span id="chat-message">Hi. Need any help?</span>
        </div>
      </div>
    </div>
  );
}

export default StoreForm;
