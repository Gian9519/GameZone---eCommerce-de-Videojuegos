const API_URL = 'https://mockapi.io/projects/tu-proyecto-id'; // Reemplaza con tu URL de MockAPI

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_URL}/products`);
    if (!response.ok) {
      throw new Error('Error al obtener los productos');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getProducts:', error);
    // En caso de error, devolver productos de respaldo
    return getBackupProducts();
  }
};

export const getProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error('Error al obtener el producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en getProductById:', error);
    throw error;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await fetch(`${API_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Error al crear el producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en createProduct:', error);
    throw error;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!response.ok) {
      throw new Error('Error al actualizar el producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en updateProduct:', error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error al eliminar el producto');
    }
    return await response.json();
  } catch (error) {
    console.error('Error en deleteProduct:', error);
    throw error;
  }
};

// Productos de respaldo en caso de que la API falle
const getBackupProducts = () => {
  return [
    {
      id: 1,
      name: "Producto de ejemplo 1",
      price: 29.99,
      description: "Este es un producto de respaldo cuando la API no está disponible",
      image: "https://picsum.photos/seed/product1/400/300.jpg",
      category: "Electrónica"
    },
    {
      id: 2,
      name: "Producto de ejemplo 2",
      price: 49.99,
      description: "Otro producto de respaldo de alta calidad",
      image: "https://picsum.photos/seed/product2/400/300.jpg",
      category: "Hogar"
    },
    {
      id: 3,
      name: "Producto de ejemplo 3",
      price: 19.99,
      description: "Un producto económico pero de buena calidad",
      image: "https://picsum.photos/seed/product3/400/300.jpg",
      category: "Ropa"
    }
  ];
};