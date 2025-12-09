import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import ProductCard from '../components/products/ProductCard';
import { useProducts } from '../context/ProductContext';

const Home = () => {
  const { filteredProducts, loading } = useProducts();
  
  // Mostrar solo los primeros 4 productos en la página principal
  const featuredProducts = filteredProducts.slice(0, 4);

  return (
    <>
      {/* Jumbotron reemplazado por un div con clases de Bootstrap */}
      <div className="bg-primary text-white py-5 mb-4">
        <Container>
          <h1 className="display-4">Bienvenido a GameZone</h1>
          <p className="lead">Los mejores videojuegos al mejor precio</p>
          <LinkContainer to="/products">
            <Button variant="light" size="lg">Ver Todos los Juegos</Button>
          </LinkContainer>
        </Container>
      </div>
      
      <Container className="py-4">
        <h2 className="text-center mb-4">Juegos Destacados</h2>
        
        {loading && featuredProducts.length === 0 ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Cargando...</span>
            </div>
            <p className="mt-2">Cargando juegos destacados...</p>
          </div>
        ) : (
          <Row>
            {featuredProducts.map(product => (
              <Col key={product.id} sm={12} md={6} lg={3} className="mb-4">
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
        
        <div className="text-center mt-4">
          <LinkContainer to="/products">
            <Button variant="primary">Ver Todos los Juegos</Button>
          </LinkContainer>
        </div>
      </Container>
    </>
  );
};

export default Home;