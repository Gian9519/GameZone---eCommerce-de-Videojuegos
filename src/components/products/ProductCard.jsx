import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  // Formatear la fecha de lanzamiento
  const formatDate = (dateString) => {
    if (!dateString || dateString === 'Desconocido') return 'Desconocido';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="h-100 product-card">
      <div className="position-relative">
        <Card.Img variant="top" src={product.image} alt={product.name} />
        {product.rating > 4 && (
          <Badge 
            bg="warning" 
            className="position-absolute top-0 end-0 m-2"
          >
            <i className="fas fa-star"></i> {product.rating}
          </Badge>
        )}
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title as="h5">{product.name}</Card.Title>
        <Card.Text className="text-muted small mb-2">
          {product.platform}
        </Card.Text>
        <Card.Text className="flex-grow-1">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fw-bold text-primary fs-5">
            ${product.price.toFixed(2)}
          </span>
          <Badge bg="secondary">{product.category}</Badge>
        </div>
        <div className="text-muted small mb-3">
          Lanzamiento: {formatDate(product.released)}
        </div>
        <Button 
          variant="primary" 
          className="w-100 mt-auto"
          onClick={handleAddToCart}
        >
          Añadir al carrito
        </Button>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;