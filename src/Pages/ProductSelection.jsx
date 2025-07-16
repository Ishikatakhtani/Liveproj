import React, { useState } from 'react';
import './ProductSelection.css';

const ProductSelection = () => {
  const [businessOwned, setBusinessOwned] = useState('');
  const [businessSize, setBusinessSize] = useState('');
  const [platforms, setPlatforms] = useState([]);

  const handlePlatformChange = (e) => {
    const { value, checked } = e.target;
    setPlatforms((prev) =>
      checked ? [...prev, value] : prev.filter((p) => p !== value)
    );
  };

  return (
    
   <>
   </>
  );
};

export default ProductSelection;
