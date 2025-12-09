import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import styled from 'styled-components';
import { useProducts } from '../../context/ProductContext';
import { validateProductForm } from '../../utils/validations';

const StyledForm = styled(Form)`
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-control {
    border-radius: 0.375rem;
    border: 1px solid #ced4da;
    padding: 0.375rem 0.75rem;
    
    &:focus {
      border-color: #86b7fe;
      box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
    }
  }
  
  .invalid-feedback {
    display: block;
    color: #dc3545;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

const ProductForm = ({ show, handleClose, productToEdit }) => {
  const { addProduct, editProduct } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: '',
    image: '',
    stock: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        price: productToEdit.price || '',
        description: productToEdit.description || '',
        category: productToEdit.category || '',
        image: productToEdit.image || '',
        stock: productToEdit.stock || ''
      });
    } else {
      setFormData({
        name: '',
        price: '',
        description: '',
        category: '',
        image: '',
        stock: ''
      });
    }
    setErrors({});
  }, [productToEdit, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error cuando el usuario corrige el campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateProductForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock, 10)
      };
      
      let result;
      if (productToEdit) {
        result = await editProduct(productToEdit.id, productData);
      } else {
        result = await addProduct(productData);
      }
      
      if (result.success) {
        handleClose();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <StyledForm onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre del Producto</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              isInvalid={!!errors.name}
              placeholder="Ingrese el nombre del producto"
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Precio</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              isInvalid={!!errors.price}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              isInvalid={!!errors.description}
              placeholder="Descripción del producto (mínimo 10 caracteres)"
              rows={3}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Categoría</Form.Label>
            <Form.Select
              name="category"
              value={formData.category}
              onChange={handleChange}
              isInvalid={!!errors.category}
            >
              <option value="">Seleccione una categoría</option>
              <option value="electronics">Electrónica</option>
              <option value="clothing">Ropa</option>
              <option value="home">Hogar</option>
              <option value="sports">Deportes</option>
              <option value="books">Libros</option>
            </Form.Select>
            {errors.category && <div className="invalid-feedback">{errors.category}</div>}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              isInvalid={!!errors.image}
              placeholder="https://ejemplo.com/imagen.jpg"
            />
            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              isInvalid={!!errors.stock}
              placeholder="0"
              min="0"
            />
            {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
          </Form.Group>
        </StyledForm>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Guardando...' : (productToEdit ? 'Actualizar' : 'Guardar')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductForm;