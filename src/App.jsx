// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StoreForm from './Pages/StoreForm';
import ProductSelection from './Pages/ProductSelection';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from './Layout';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* All these pages will show Footer */}
          <Route index element={<StoreForm />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="product-selection" element={<ProductSelection />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
