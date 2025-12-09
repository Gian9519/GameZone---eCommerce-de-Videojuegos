import React, { useState, useEffect } from 'react';
import { Row, Col, Alert, Spinner, Button } from 'react-bootstrap';
import ProductCard from './ProductCard';
import { useProducts } from '../../context/ProductContext';

const ProductList = () => {
  const { 
    filteredProducts, 
    loading, 
    error, 
    currentPage, 
    totalPages, 
    loadMoreProducts,
    paginate 
  } = useProducts();
  
  const [infiniteScroll, setInfiniteScroll] = useState(true);
  
  // Para detectar el final de la página y cargar más productos
  useEffect(() => {
    if (!infiniteScroll) return;
    
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >= 
        document.documentElement.offsetHeight - 500
      ) {
        loadMoreProducts();
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [infiniteScroll, loadMoreProducts]);
  
  if (error && filteredProducts.length === 0) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <>
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.id} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
      
      {loading && (
        <div className="text-center py-3">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </div>
      )}
      
      {error && filteredProducts.length > 0 && (
        <Alert variant="warning" className="mt-3">
          {error}
        </Alert>
      )}
      
      {/* Botones de paginación tradicional */}
      {!infiniteScroll && (
        <div className="d-flex justify-content-between mt-4">
          <Button 
            variant="primary" 
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
          >
            Anterior
          </Button>
          <span>Página {currentPage} de {totalPages}</span>
          <Button 
            variant="primary" 
            disabled={currentPage >= totalPages}
            onClick={() => paginate(currentPage + 1)}
          >
            Siguiente
          </Button>
        </div>
      )}
      
      {/* Botón para cambiar entre paginación infinita y tradicional */}
      <div className="text-center mt-3">
        <Button 
          variant="outline-secondary" 
          size="sm"
          onClick={() => setInfiniteScroll(!infiniteScroll)}
        >
          {infiniteScroll ? 'Usar paginación tradicional' : 'Usar scroll infinito'}
        </Button>
      </div>
    </>
  );
};

export default ProductList;