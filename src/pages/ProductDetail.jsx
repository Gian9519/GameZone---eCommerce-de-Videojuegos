import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext'; // Importamos el contexto de productos

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Usaremos useNavigate para redirigir si no se encuentra el producto
  const { addToCart } = useCart();
  
  // Obtenemos la lista de productos, el estado de carga y error desde el contexto
  const { products, loading, error } = useProducts();
  
  // Buscamos el producto específico en la lista de productos del contexto
  const product = products.find(p => p.id === parseInt(id));

  // Efecto para redirigir si el producto no se encuentra después de que la carga haya terminado
  useEffect(() => {
    if (!loading && !product && !error) {
      // Si no está cargando, no hay error general, pero tampoco hay producto, redirigimos
      navigate('/products'); 
    }
  }, [loading, product, error, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  // 1. Estado de Carga: Mientras el contexto carga la lista inicial de productos
  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      </Container>
    );
  }

  // 2. Estado de Error: Si hubo un error al cargar la lista de productos desde el contexto
  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
        <Link to="/products" className="btn btn-secondary">
          <FaArrowLeft /> Volver a productos
        </Link>
      </Container>
    );
  }
  
  // 3. Producto no encontrado: Si la carga terminó, no hay errores, pero el producto específico no existe
  if (!product) {
    // Este caso es menos probable ahora debido al useEffect, pero es una buena práctica mantenerlo.
    return (
      <Container className="my-5">
        <Alert variant="warning">Producto no encontrado.</Alert>
        <Link to="/products" className="btn btn-secondary">
          <FaArrowLeft /> Volver a productos
        </Link>
      </Container>
    );
  }

  // 4. Producto encontrado: Renderizamos los detalles del producto
  return (
    <Container className="my-5">
      <Link to="/products" className="btn btn-outline-secondary mb-4">
        <FaArrowLeft /> Volver a productos
      </Link>
      
      <Row>
        <Col md={6}>
          <Card.Img 
            variant="top" 
            src={product.image} 
            alt={product.name}
            style={{ height: '400px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h1">{product.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Categoría: {product.category}</Card.Subtitle>
              <Card.Text className="my-3">
                {product.description}
              </Card.Text>
              <h3 className="text-primary my-4">${product.price.toFixed(2)}</h3>
              <Card.Text>
                <strong>Plataformas:</strong> {product.platform}
              </Card.Text>
              <Card.Text>
                <strong>Lanzamiento:</strong> {product.released}
              </Card.Text>
              <Button 
                variant="primary" 
                size="lg" 
                onClick={handleAddToCart}
                className="w-100"
              >
                <FaShoppingCart /> Agregar al Carrito
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;