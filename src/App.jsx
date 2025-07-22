// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import StoreForm from './Pages/StoreForm';

import Login from './Pages/Login';
import Register from './Pages/Register';
import Layout from './Layout';
import Home from './Pages/Home';
import AddProduct from './Pages/AddProduct';
import Payments from './Pages/Paymensts';
import Catlog from './Pages/Catlog';
import SideNav from './Pages/sidenav';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* All these pages will show Footer */}
          <Route index element={<StoreForm />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          
           <Route path="Home" element={<Home />} />
            <Route path="/add-product" element={<AddProduct />} />
  <Route path="/payments" element={<Payments />} />
    <Route path="/catlog" element={<Catlog />} />
      <Route path="/sidenav" element={<SideNav />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
