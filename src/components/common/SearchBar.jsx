import React, { useState, useEffect } from 'react';
import { Form, FormControl, ListGroup } from 'react-bootstrap';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  
  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #6c757d;
  }
  
  .search-input {
    padding-left: 35px;
  }
  
  .search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: white;
    border: 1px solid #ddd;
    border-top: none;
    max-height: 300px;
    overflow-y: auto;
    z-index: 100;
    border-radius: 0 0 0.375rem 0.375rem;
  }
  
  .search-result-item {
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    cursor: pointer;
    
    &:hover {
      background-color: #f8f9fa;
    }
    
    &:last-child {
      border-bottom: none;
    }
    
    .result-name {
      font-weight: 500;
    }
    
    .result-category {
      font-size: 0.8rem;
      color: #6c757d;
    }
  }
`;

const SearchBar = () => {
  const { products, setSearchTerm } = useProducts();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      setShowResults(false);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.category.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Limitar a 5 resultados

    setResults(filtered);
    setShowResults(true);
  }, [query, products]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchTerm(query);
    setShowResults(false);
  };

  const handleResultClick = (productName) => {
    setSearchTerm(productName);
    setQuery(productName);
    setShowResults(false);
  };

  return (
    <SearchContainer>
      <Form onSubmit={handleSubmit}>
        <div className="position-relative">
          <FaSearch className="search-icon" />
          <FormControl
            type="text"
            placeholder="Buscar productos..."
            className="search-input"
            value={query}
            onChange={handleChange}
            onFocus={() => setShowResults(true)}
          />
        </div>
      </Form>
      
      {showResults && results.length > 0 && (
        <ListGroup className="search-results">
          {results.map(product => (
            <Link 
              to={`/products/${product.id}`} 
              key={product.id}
              onClick={() => handleResultClick(product.name)}
            >
              <ListGroup.Item className="search-result-item">
                <div className="result-name">{product.name}</div>
                <div className="result-category">{product.category}</div>
              </ListGroup.Item>
            </Link>
          ))}
        </ListGroup>
      )}
    </SearchContainer>
  );
};

export default SearchBar;