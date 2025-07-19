// Home.jsx
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
        <div id="logo1">Local<span id='biz-color'>Scope</span></div>
        <nav id="menu">
          <span className="active">Home</span>
          <span>Catalog</span>
          <span>Orders</span>
          <span>Analytics</span>
          <span>Reviews</span>
          <hr />
          {/* <span>Store Configuration</span>
          <span>Growth</span>
          <span>Trust Markers</span>
          <span>Settings</span> */}
        </nav>
      </aside>

      <div id="main" style={{backgroundImage:`url('https://images.pexels.com/photos/7130560/pexels-photo-7130560.jpeg')`}}>
        <header id="topbar">
          <div></div>
          <div id="help1">
            <button>Help</button>
            <div className="avatar1">{storeName.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <section className="content" >
          <h1 style={{ marginBottom: "5%" }}>Welcome, {storeName}</h1>

          <div className="main-grid"style={{ marginBottom: "5%" }}>
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
                {/* PENDING Steps First */}
                {!stepsCompleted.store && (
                  <div className="step-row" onClick={() => navigate('/store-details')}>
                    <span>🏬 Enter store details</span>
                    <span className="arrow-icon">➔</span>
                  </div>
                )}

                {!stepsCompleted.products && (
                  <div className="step-row" onClick={() => navigate('/add-product')}>
                    <span>🛒 Add your first product</span>
                    <span className="arrow-icon">➔</span>
                  </div>
                )}

                {!stepsCompleted.payment && (
                  <div className="step-row" onClick={() => navigate('/payments')}>
                    <span>💳 Setup Payments</span>
                    <span className="arrow-icon">➔</span>
                  </div>
                )}

                {/* COMPLETED Steps After */}
                {stepsCompleted.store && (
                  <div className="step-row completed">
                    <span>🏬 Enter store details</span>
                    <span className="check-icon">✔</span>
                  </div>
                )}

                {stepsCompleted.products && (
                  <div className="step-row completed">
                    <span>🛒 Add your first product</span>
                    <span className="check-icon">✔</span>
                  </div>
                )}

                {stepsCompleted.payment && (
                  <div className="step-row completed">
                    <span>💳 Setup Payments</span>
                    <span className="check-icon">✔</span>
                  </div>
                )}

                {/* Final Success Message */}
                {stepsCompleted.store && stepsCompleted.products && stepsCompleted.payment && (
                  <div className="completion-message">
                    <h4 style={{ marginTop: "20px", color: "var(--primary)" }}>
                      🎉 Congratulations! Your store is now live and ready to sell.
                    </h4>
                    <div
                      className="step-row"
                      style={{ cursor: "pointer", marginTop: "12px" }}
                      onClick={() => navigate('/catalog')}
                    >
                      <span>🛍️ View Your Products</span>
                      <span className="arrow-icon">➔</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
