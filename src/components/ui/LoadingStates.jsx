import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Spinner } from 'react-bootstrap';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem 1rem;
  animation: ${fadeIn} 0.5s ease-in;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: #6c757d;
  font-size: 1.1rem;
`;

const ProductsLoading = () => (
  <LoadingContainer>
    <Spinner animation="border" variant="primary" role="status" />
    <LoadingText>Cargando productos...</LoadingText>
  </LoadingContainer>
);

const ActionLoading = ({ message = "Procesando..." }) => (
  <LoadingContainer>
    <Spinner animation="border" variant="primary" role="status" />
    <LoadingText>{message}</LoadingText>
  </LoadingContainer>
);

const SkeletonCard = () => (
  <div className="col-md-4 col-sm-6 mb-4">
    <div className="card h-100">
      <div className="skeleton skeleton-img"></div>
      <div className="card-body">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-price"></div>
        <div className="skeleton skeleton-button"></div>
      </div>
    </div>
  </div>
);

const ProductsGridSkeleton = () => (
  <div className="row g-4">
    {[...Array(6)].map((_, index) => (
      <SkeletonCard key={index} />
    ))}
  </div>
);

export { ProductsLoading, ActionLoading, ProductsGridSkeleton };