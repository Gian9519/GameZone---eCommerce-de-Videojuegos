import React from 'react';
import styled from 'styled-components';
import { Button, Alert } from 'react-bootstrap';
import { FaExclamationTriangle, FaRedo } from 'react-icons/fa';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  text-align: center;
`;

const ErrorIcon = styled.div`
  font-size: 4rem;
  color: #dc3545;
  margin-bottom: 1.5rem;
`;

const ErrorTitle = styled.h3`
  margin-bottom: 1rem;
  color: #343a40;
`;

const ErrorMessage = styled.p`
  margin-bottom: 2rem;
  max-width: 600px;
  color: #6c757d;
`;

const RetryButton = styled(Button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProductsError = ({ error, onRetry }) => (
  <ErrorContainer>
    <ErrorIcon>
      <FaExclamationTriangle />
    </ErrorIcon>
    <ErrorTitle>Error al cargar productos</ErrorTitle>
    <ErrorMessage>{error}</ErrorMessage>
    <RetryButton variant="primary" onClick={onRetry}>
      <FaRedo /> Reintentar
    </RetryButton>
  </ErrorContainer>
);

const ActionError = ({ error }) => (
  <Alert variant="danger" className="d-flex align-items-center">
    <FaExclamationTriangle className="me-2" />
    <div>{error}</div>
  </Alert>
);

const BackupNotice = () => (
  <Alert variant="info" className="d-flex align-items-center">
    <div>
      <strong>Modo sin conexión:</strong> Estás viendo un catálogo de respaldo. 
      Algunas funciones podrían no estar disponibles.
    </div>
  </Alert>
);

export { ProductsError, ActionError, BackupNotice };