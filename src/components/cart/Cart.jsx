import React from 'react';
import { Container } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';
import CartSidebar from './CartSidebar';

const Cart = () => {
  const { isAuthenticated } = useAuth();

  // El ProtectedRoute ya se encarga de la autenticación, 
  // pero esta es una doble verificación por si acaso.
  if (!isAuthenticated) {
    return <div>Redirigiendo al login...</div>;
  }

  return (
    <>
      <Container className="py-4">
        <h1>Tu Carrito de Compras</h1>
        <p>El carrito se mostrará en el panel lateral.</p>
      </Container>
      <CartSidebar />
    </>
  );
};

export default Cart;