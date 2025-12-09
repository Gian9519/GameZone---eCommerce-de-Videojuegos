import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail'; // Nueva ruta para detalles de producto
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import Cart from './components/cart/Cart';
import Checkout from './pages/Checkout'; // Nueva ruta para checkout
import ProtectedRoute from './components/auth/ProtectedRoute';

import GlobalStyle from './styles/global';

function App() {
  return (
    <>
      <Helmet>
        <title>Mi eCommerce - Los mejores productos al mejor precio</title>
        <meta name="description" content="Encuentra los mejores productos en nuestra tienda online con envíos a todo el país." />
        <meta name="keywords" content="ecommerce, tienda online, productos, compras" />
        <meta name="author" content="Mi eCommerce" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      
      <GlobalStyle />
      
      <AuthProvider>
        <CartProvider>
          <ProductProvider>
            <Router>
              <div className="App d-flex flex-column min-vh-100">
                <Header />
                
                <main className="flex-grow-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/products/:id" element={<ProductDetail />} /> {/* Nueva ruta */}
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    <Route 
                      path="/profile" 
                      element={
                        <ProtectedRoute>
                          <Profile />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/admin" 
                      element={
                        <ProtectedRoute adminOnly>
                          <Admin />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/cart" 
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      } 
                    />
                    
                    <Route 
                      path="/checkout" 
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      } 
                    />
                  </Routes>
                </main>
                
                <Footer />
              </div>
              
              <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored" // Añadimos tema para mejor visibilidad
              />
            </Router>
          </ProductProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;