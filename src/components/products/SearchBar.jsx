import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useProducts } from '../../context/ProductContext';

const SearchBar = () => {
  const { setSearchTerm } = useProducts();
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchTerm(searchInput);
  };

  return (
    <Form onSubmit={handleSearch} className="mb-4">
      <Form.Group className="d-flex">
        <Form.Control
          type="text"
          placeholder="Buscar juegos por nombre, plataforma o categoría..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="me-2"
        />
        <Button type="submit" variant="primary">Buscar</Button>
      </Form.Group>
    </Form>
  );
};

export default SearchBar;