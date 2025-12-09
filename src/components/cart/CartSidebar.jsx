import React from 'react';
import styled from 'styled-components';
import { FaTimes, FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  opacity: ${props => props.isOpen ? 1 : 0};
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  transition: all 0.3s ease;
`;

const CartContainer = styled.div`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-420px'};
  width: 380px;
  height: 100%;
  background-color: white;
  box-shadow: -5px 0 25px rgba(0, 0, 0, 0.15);
  transition: right 0.4s ease;
  z-index: 1010;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #0077ff;
`;

const CartItems = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 1.5rem;
  padding: 1rem;
  min-height: 200px;
  display: flex;
  flex-direction: column;
`;

const EmptyCartMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  height: 100%;
  padding: 2rem;
  color: #6c757d;
`;

const CartSidebar = () => {
  const { cartItems, isCartOpen, toggleCart, getCartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    toggleCart(); // Cierra el carrito
    navigate('/checkout'); // Navega a la página de checkout
  };

  return (
    <>
      <CartOverlay isOpen={isCartOpen} onClick={toggleCart} />
      <CartContainer isOpen={isCartOpen}>
        <CartHeader>
          <h3><FaShoppingCart className="me-2" />Tu Carrito</h3>
          <button className="btn btn-close" onClick={toggleCart} aria-label="Cerrar carrito">
            <FaTimes />
          </button>
        </CartHeader>
        
        <CartItems>
          {cartItems.length === 0 ? (
            <EmptyCartMessage>
              <FaShoppingCart size={60} className="mb-3" />
              <h4>Tu carrito está vacío</h4>
              <p>¡Explora nuestros productos y empieza a agregar!</p>
              <button className="btn btn-primary btn-lg mt-3" onClick={toggleCart}>
                Ir a Tienda
              </button>
            </EmptyCartMessage>
          ) : (
            cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))
          )}
        </CartItems>
        
        {cartItems.length > 0 && (
          <div className="cart-totals">
            <div className="d-flex justify-content-between mb-2">
              <span>Subtotal:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span>Envío:</span>
              <span>$0.00</span>
            </div>
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total:</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            {/* <-- CAMBIO 4: Asignar la función al onClick del botón */}
            <button className="btn btn-primary w-100 mt-3" onClick={handleCheckout}>
              Finalizar Compra
            </button>
          </div>
        )}
      </CartContainer>
    </>
  );
};

// ... (el componente CartItem se mantiene igual)
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="d-flex mb-3 border-bottom pb-3">
      <img src={item.image} alt={item.name} className="me-3" width="80" height="80" />
      <div className="flex-grow-1">
        <h5>{item.name}</h5>
        <p className="mb-1">${item.price.toFixed(2)}</p>
        <div className="d-flex align-items-center">
          <button 
            className="btn btn-sm btn-outline-secondary me-2" 
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button 
            className="btn btn-sm btn-outline-secondary me-2" 
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
          <button 
            className="btn btn-sm btn-danger" 
            onClick={() => removeFromCart(item.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;