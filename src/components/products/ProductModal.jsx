import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useProducts } from '../../context/ProductContext';

const ProductModal = ({ show, handleClose, product }) => {
  const { removeProduct } = useProducts();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const result = await removeProduct(product.id);
    if (result.success) {
      handleClose();
    }
    setIsDeleting(false);
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmar Eliminación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Está seguro que desea eliminar el producto "{product?.name}"?</p>
        <p>Esta acción no se puede deshacer.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancelar
        </Button>
        <Button 
          variant="danger" 
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? 'Eliminando...' : <><FaTrash /> Eliminar</>}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductModal;