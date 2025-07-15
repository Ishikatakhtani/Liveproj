// ProductSelection.js
import React, { useState } from 'react';
import './ProductSelection.css';
import { useNavigate } from 'react-router-dom';
const categories = [
  "Appliances", "Baby", "Beauty and Personal Care", "Books and Stationery", "Clothing",
  "Electronics", "Food and Grocery", "Footwear", "Furniture", "General",
  "Health Supplements", "Home and Kitchen", "Home Care", "Jewelry",
  "Lawn and Garden", "Luggage and Bags", "Multipurpose", "Pet Products",
  "Sports and Fitness", "Toys and games", "Watches", "Other"
];

const ProductSelection = () => {
  const [selected, setSelected] = useState([]);
  const [otherInput, setOtherInput] = useState('');
const navigate = useNavigate(); // Add this line

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
    <div id="product-selection-container">
      <div id="navbar">
        <span id="smartbiz-logo">Local<span id="biz-color">Scope</span></span>
        <div id="nav-links">
          <span id="help-link">Help</span>
          <span id="logout-link" onClick={() => navigate('/login')}>Logout</span>
        </div>
      </div>

      <div id="product-left-panel">
        <img
          src="https://static-cse.canva.com/blob/2096565/1600w-2TUnV0NhHqk.jpg"
          alt="Preview Product"
          className="left-preview-image"
        />
      </div>

      <div id="product-right-panel">
        <div id="product-form">
          <h1 id="form-title">What products do you offer?</h1>
          <p id="form-subtitle">Select as many as you wish. Don’t worry you can always edit this later</p>

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
              type="text"
              placeholder="Please specify other product"
              value={otherInput}
              onChange={(e) => setOtherInput(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                fontSize: '14px',
                marginBottom: '20px',
                borderRadius: '8px',
                border: '1px solid #ccc'
              }}
            />
          )}

          <button id="next-button" disabled={selected.length === 0}>Next</button>

          {/* <div id="chatbox">
            <span id="chat-message">Hi. Need any help?</span>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ProductSelection;
