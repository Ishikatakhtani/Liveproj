import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const Payments = () => {
  const navigate = useNavigate();
  const location = useLocation();
 const storeName = location.state?.storeName || localStorage.getItem("storeName") || 'Your Store';

  //const storeName = location.state?.storeName || 'Your Store';
useEffect(() => {
  if (storeName && storeName !== 'Your Store') {
    localStorage.setItem("storeName", storeName);
  }
}, [storeName]);


  console.log("Payments page received storeName:", storeName); // ✅ Debug
  return (
    <>
      <h1>Payments</h1>
      <span
        onClick={() => {
          console.log("Navigating to catalog with storeName:", storeName);
          navigate('/catlog', { state: { storeName } }); // ✅ Fixed typo from /catlog
        }}
        
        style={{ cursor: 'pointer', color: '#0066ff' }}
      >
        Catalog
      </span>
    </>
  );
};

export default Payments;
