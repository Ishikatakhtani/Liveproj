import React from 'react';
import { Container } from 'react-bootstrap';
import SideNav from './sidenav';
import "./Product.css";
import ProductForm from './ProductForm';
const AddProduct = () => (
   <div style={{display:"flex"}}>
   <SideNav/>
  <Container id='div1'  >

 <ProductForm/>
  </Container>
  </div>
);

export default AddProduct;
