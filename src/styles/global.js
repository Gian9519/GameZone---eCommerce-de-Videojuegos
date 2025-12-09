import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  /* Variables CSS */
  :root {
    --primary-color: #0077ff;
    --secondary-color: #2d2d2d;
    --accent-color: #ff5e00;
    --light-color: #f8f8f8;
    --dark-color: #1a1a1a;
    --font-main: 'Roboto', sans-serif;
    --font-title: 'Montserrat', sans-serif;
  }

  /* Estilos generales */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: var(--font-main);
    color: var(--dark-color);
    line-height: 1.6;
    background-color: #f8f9fa;
  }
  
  a {
    text-decoration: none;
    color: inherit;
    
    &:hover {
      color: var(--primary-color);
    }
  }
  
  .btn-primary {
    background-color: var(--primary-color);
    border-color: var(--primary-color);
    
    &:hover {
      background-color: #0056b3;
      border-color: #0056b3;
    }
  }
  
  .card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
  }
  
  .product-img {
    height: 200px;
    object-fit: cover;
  }
  
  .cart-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    width: 400px;
    background-color: white;
    box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
    z-index: 1050;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    
    &.open {
      transform: translateX(0);
    }
  }
  
  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 200px;
  }
  
  .search-bar {
    position: relative;
    
    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background-color: white;
      border: 1px solid #ddd;
      border-top: none;
      max-height: 300px;
      overflow-y: auto;
      z-index: 100;
    }
  }
  
  .pagination {
    justify-content: center;
    margin-top: 2rem;
  }
  
  /* Animaciones */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fade-in {
    animation: fadeIn 0.8s ease-in-out;
  }
  
  /* Media Queries */
  @media (max-width: 992px) {
    .contact-container {
      grid-template-columns: 1fr;
    }
  }
  
  @media (max-width: 768px) {
    .hero-banner h1 {
      font-size: 2rem;
    }
    
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .cart-sidebar {
      width: 100%;
    }
  }
  
  @media (max-width: 576px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }
`;

export default GlobalStyle;