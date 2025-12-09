import React from 'react';
import styled from 'styled-components';
import { Card, Button } from 'react-bootstrap';
import { useCart } from '../context/CartContext';
import { showSuccessToast } from '../ui/ToastNotifications';

const ProductCard = styled(Card)`
  border: none;
  border-radius: 8px;
  overflow: hidden;
  height: 100%;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  }
  
  .card-img-top {
    height: 200px;
    object-fit: cover;
    border-bottom: 3px solid #ff5e00;
  }
  
  .card-title {
    color: #2d2d2d;
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
  }
  
  .price {
    font-weight: 700;
    color: #ff5e00;
    font-size: 1.3rem;
    margin-bottom: 0.75rem;
  }
`;

const ProductItem = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    showSuccessToast(`${product.name} añadido al carrito`);
  };

  return (
    <ProductCard className="h-100">
      <ProductCard.Img variant="top" src={product.image} alt={product.name} />
      <ProductCard.Body>
        <ProductCard.Title>{product.name}</ProductCard.Title>
        <div className="text-muted mb-2">{product.category}</div>
        <div className="price">${product.price.toFixed(2)}</div>
        <Button 
          variant="primary" 
          className="w-100"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </Button>
      </ProductCard.Body>
    </ProductCard>
  );
};

export default ProductItem;