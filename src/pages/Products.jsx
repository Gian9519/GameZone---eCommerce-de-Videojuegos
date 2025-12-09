import React from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../components/products/SearchBar';
import ProductList from '../components/products/ProductList';

const Products = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">Nuestros Juegos</h1>
      <SearchBar />
      <ProductList />
    </Container>
  );
};

export default Products;