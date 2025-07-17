// HomePage.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  const storeName = location.state?.storeName || 'Your Store';

  const [stepsCompleted, setStepsCompleted] = useState({
    store: false,
    products: false,
    payment: false,
  });

  useEffect(() => {
    setStepsCompleted({
      store: !!storeName?.trim(),
      products: localStorage.getItem("productsStep") === "completed",
      payment: localStorage.getItem("paymentStep") === "completed",
    });
  }, [storeName]);

  return (
    <div id="dashboard">
      
      <aside id="side">
        <div id="logo">Local<span>Scope</span></div>
        <nav id="menu">
          <span className="active">Home</span>
          <span>Catalog</span>
          <span>Orders</span>
          <span>Analytics</span>
          <span>Reviews</span>
          <hr />
          <span>Store Configuration</span>
          <span>Growth</span>
          <span>Trust Markers</span>
          <span>Settings</span>
        </nav>
      </aside>

     
      <div id="main">
    
        <header id="topbar">
          <div></div>
          <div id="help">
            <button>Help </button>
            <div className="avatar">{storeName.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <section className="content">
          <h1 style={{ paddingBottom: "5%" }}>Welcome, {storeName}</h1>

          <div className="main-grid">
           
            <div className="status-card">
              <h3>Your store is still offline</h3>
              <p>
                {
                  stepsCompleted.payment
                    ? "You're ready to go live!"
                    : stepsCompleted.products
                      ? "Just 1 more step to go!"
                      : "Complete just 2 more steps to start selling!"
                }
              </p>

              <div className="progress-tracker">
               
                <div className={`step completed`}>
                  <div className="circle">✔</div>
                </div>

                <div className="dots" />

      
                <div className={`step ${stepsCompleted.products ? 'completed' : stepsCompleted.store ? 'current' : ''}`}>
                  <div className="circle">
                    {stepsCompleted.products ? '✔' : ''}
                  </div>
                </div>

                <div className="dots" />

             
                <div className={`step ${stepsCompleted.payment ? 'completed' : (stepsCompleted.products ? 'current' : '')}`}>
                  <div className="circle">
                    {stepsCompleted.payment ? '✔' : ''}
                  </div>
                </div>
              </div>

             <div className="steps">
      
      {!stepsCompleted.products && (
        <div className="step-row" onClick={() => navigate('/add-product')}>
          <span>🛒 Add your first product</span>
          <span className="arrow-icon">➔</span>
        </div>
      )}

     
      {!stepsCompleted.payments && (
        <div className="step-row" onClick={() => navigate('/payments')}>
          <span>💳 Setup Payments</span>
          <span className="arrow-icon">➔</span>
        </div>
      )}

     
      {stepsCompleted.storeDetails && (
        <div className="step-row completed">
          <span>🏬 Enter store details</span>
          <span className="check-icon">✔</span>
        </div>
      )}
    </div>
            </div>

            {/* Right side - (optional announcement card) */}
            {/* <div className="announcement-card">
              <h4>Announcement</h4>
              <p className="sub">Check here for new features, updates, and key announcements</p>
              <div className="announcement-img"></div>
              <b>Google Merchant Center Sync</b>
              <p>Sync your LocalScope catalog with Google Merchant Center to easily run shopping ads and improve product visibility across Google.</p>
              <button className="link-btn">Click here for details</button>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
