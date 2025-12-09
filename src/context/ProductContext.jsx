import React, { createContext, useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { fetchGames } from '../services/gamesAPI';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Función para transformar los datos de la API al formato que necesitamos
  const transformGameData = (games) => {
    return games.map(game => {
      // Extraer nombres de plataformas
      const platforms = game.platforms ? 
        game.platforms.map(p => p.platform.name).join(', ') : 
        'Varias plataformas';
      
      // Generar precio aleatorio
      const priceValue = (Math.floor(Math.random() * 50) + 10).toFixed(2);
      
      return {
        id: game.id,
        name: game.name,
        description: game.description || `Juego destacado: ${game.name}`,
        price: parseFloat(priceValue),
        image: game.background_image || 'https://via.placeholder.com/400x225?text=Juego',
        category: platforms.includes('PC') ? 'PC' : 
                  platforms.includes('PlayStation') ? 'PlayStation' : 
                  platforms.includes('Xbox') ? 'Xbox' : 'Videojuegos',
        platform: platforms,
        rating: game.rating || 0,
        released: game.released || 'Desconocido'
      };
    });
  };

  // Cargar juegos desde la API
  const loadGames = async (page = 1, search = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const games = await fetchGames(productsPerPage, search);
      const transformedGames = transformGameData(games);
      
      // Si es una nueva búsqueda o la primera página, reemplazamos los productos
      if (page === 1 || search !== searchTerm) {
        setProducts(transformedGames);
        setFilteredProducts(transformedGames);
      } else {
        // Si es una página siguiente, añadimos los productos
        setProducts(prev => [...prev, ...transformedGames]);
        setFilteredProducts(prev => [...prev, ...transformedGames]);
      }
      
      // Para la paginación, asumimos que hay más páginas (la API no devuelve el total)
      setTotalPages(games.length === productsPerPage ? page + 1 : page);
    } catch (err) {
      setError('Error al cargar los juegos');
      toast.error('Error al cargar los juegos');
    } finally {
      setLoading(false);
    }
  };

  // Cargar la primera página de productos al iniciar
  useEffect(() => {
    loadGames(1, searchTerm);
  }, []);

  // Filtrar productos cuando cambia el término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, products]);

  // Cargar más productos (paginación infinita)
  const loadMoreProducts = () => {
    if (!loading && currentPage < totalPages) {
      loadGames(currentPage + 1, searchTerm);
      setCurrentPage(currentPage + 1);
    }
  };

  // Función de búsqueda
  const searchProducts = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
    loadGames(1, term);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        filteredProducts,
        loading,
        error,
        searchTerm,
        currentPage,
        totalPages,
        productsPerPage,
        setSearchTerm: searchProducts,
        loadMoreProducts,
        // Mantenemos las funciones CRUD para productos locales
        addProduct: async (productData) => {
          // Implementación para agregar productos locales
          const newProduct = {
            ...productData,
            id: Date.now(),
            price: parseFloat(productData.price)
          };
          setProducts([newProduct, ...products]);
          setFilteredProducts([newProduct, ...filteredProducts]);
          toast.success('Producto agregado exitosamente');
          return { success: true };
        },
        editProduct: async (id, productData) => {
          // Implementación para editar productos
          const updatedProducts = products.map(product =>
            product.id === id ? { ...product, ...productData } : product
          );
          setProducts(updatedProducts);
          setFilteredProducts(updatedProducts);
          toast.success('Producto actualizado exitosamente');
          return { success: true };
        },
        removeProduct: async (id) => {
          // Implementación para eliminar productos
          const filtered = products.filter(product => product.id !== id);
          setProducts(filtered);
          setFilteredProducts(filtered);
          toast.success('Producto eliminado exitosamente');
          return { success: true };
        },
        paginate: (pageNumber) => {
          // Para la paginación tradicional
          setCurrentPage(pageNumber);
          loadGames(pageNumber, searchTerm);
        }
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};