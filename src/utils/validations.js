export const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateProductForm = (formData) => {
  const errors = {};
  
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'El nombre del producto es obligatorio';
  }
  
  if (!formData.price || formData.price <= 0) {
    errors.price = 'El precio debe ser mayor a 0';
  }
  
  if (!formData.description || formData.description.trim() === '') {
    errors.description = 'La descripción es obligatoria';
  } else if (formData.description.length < 10) {
    errors.description = 'La descripción debe tener al menos 10 caracteres';
  }
  
  if (!formData.category || formData.category.trim() === '') {
    errors.category = 'Debe seleccionar una categoría';
  }
  
  if (!formData.image || formData.image.trim() === '') {
    errors.image = 'La URL de la imagen es obligatoria';
  } else if (!isValidUrl(formData.image)) {
    errors.image = 'Debe ingresar una URL válida';
  }
  
  return errors;
};

export const validateLoginForm = (formData) => {
  const errors = {};
  
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'El email es obligatorio';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Debe ingresar un email válido';
  }
  
  if (!formData.password || formData.password.trim() === '') {
    errors.password = 'La contraseña es obligatoria';
  } else if (formData.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  return errors;
};

export const validateContactForm = (formData) => {
  const errors = {};
  
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'El nombre es obligatorio';
  }
  
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'El email no es válido';
  }
  
  if (!formData.message || formData.message.trim() === '') {
    errors.message = 'El mensaje es obligatorio';
  }
  
  return errors;
};

export const validateCheckoutForm = (formData) => {
  const errors = {};
  
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'El nombre es obligatorio';
  }
  
  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'El email es obligatorio';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Debe ingresar un email válido';
  }
  
  if (!formData.address || formData.address.trim() === '') {
    errors.address = 'La dirección es obligatoria';
  }
  
  if (!formData.city || formData.city.trim() === '') {
    errors.city = 'La ciudad es obligatoria';
  }
  
  if (!formData.postalCode || formData.postalCode.trim() === '') {
    errors.postalCode = 'El código postal es obligatorio';
  }
  
  return errors;
};