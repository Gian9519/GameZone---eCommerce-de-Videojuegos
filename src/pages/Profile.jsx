import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import CartSidebar from '../components/cart/CartSidebar';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <Container className="py-4">
        <h1 className="mb-4">Mi Perfil</h1>
        
        <Row>
          <Col md={6}>
            <Card>
              <Card.Body>
                <h2>Información de Usuario</h2>
                <p><strong>Nombre:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Rol:</strong> {user?.role === 'admin' ? 'Administrador' : 'Usuario'}</p>
                
                <Button variant="danger" onClick={logout}>
                  Cerrar Sesión
                </Button>
              </Card.Body>
            </Card>
          </Col>
          
          <Col md={6}>
            <Card>
              <Card.Body>
                <h2>Historial de Pedidos</h2>
                <p>No tienes pedidos anteriores.</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      
      <CartSidebar />
    </>
  );
};

export default Profile;