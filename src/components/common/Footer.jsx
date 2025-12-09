import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-auto">
      <Container>
        <Row>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Mi eCommerce</h5>
            <p>Tu tienda online de confianza</p>
          </Col>
          <Col md={4} className="mb-4 mb-md-0">
            <h5>Enlaces</h5>
            <ul className="list-unstyled">
              <li><a href="/" className="text-white">Inicio</a></li>
              <li><a href="/products" className="text-white">Productos</a></li>
              <li><a href="/contact" className="text-white">Contacto</a></li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contacto</h5>
            <p>info@miecommerce.com</p>
            <p>Teléfono: (123) 456-7890</p>
          </Col>
        </Row>
        <hr className="bg-white" />
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} Mi eCommerce. Todos los derechos reservados.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;