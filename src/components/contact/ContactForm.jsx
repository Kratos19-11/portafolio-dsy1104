import { useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INITIAL_VALUES = { name: '', email: '', message: '' };

function validate(values) {
  const errors = {};

  if (!values.name) {
    errors.name = 'El nombre es obligatorio.';
  }
  if (!values.email) {
    errors.email = 'El correo es obligatorio.';
  } else if (!EMAIL_REGEX.test(values.email)) {
    errors.email = 'Ingresa un correo válido.';
  }
  if (values.message.length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres.';
  }

  return errors;
}

/**
 * Formulario de contacto con el componente Form de Bootstrap.
 * Props:
 *  - sectionId: id HTML de la sección (para el menú) y prefijo de los ids de los campos
 *  - title: título de la sección
 *  - onSubmit: función opcional que recibe { name, email, message } cuando el formulario es válido
 */
function ContactForm({ sectionId = 'contacto', title = 'Contacto', onSubmit }) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setSent(false);
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const clean = {
      name: values.name.trim(),
      email: values.email.trim(),
      message: values.message.trim(),
    };
    const found = validate(clean);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      setSent(false);
      return;
    }

    if (onSubmit) onSubmit(clean);
    setValues(INITIAL_VALUES);
    setSent(true);
  };

  const fieldProps = (name) => ({
    id: `${sectionId}-${name}`,
    name,
    value: values[name],
    onChange: handleChange,
    className: `form-control${errors[name] ? ' is-invalid' : ''}`,
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${sectionId}-${name}-error` : undefined,
  });

  const renderError = (name) =>
    errors[name] && (
      <div id={`${sectionId}-${name}-error`} className="invalid-feedback">
        {errors[name]}
      </div>
    );

  return (
    <section id={sectionId} className="py-5">
      <h2 className="mb-4 text-center">{title}</h2>

      <div className="row justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          {sent && (
            <div className="alert alert-success" role="status">
              ¡Gracias! Tu mensaje fue enviado correctamente.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label htmlFor={`${sectionId}-name`} className="form-label">
                Nombre
              </label>
              <input type="text" {...fieldProps('name')} />
              {renderError('name')}
            </div>

            <div className="mb-3">
              <label htmlFor={`${sectionId}-email`} className="form-label">
                Correo electrónico
              </label>
              <input type="email" {...fieldProps('email')} />
              {renderError('email')}
            </div>

            <div className="mb-3">
              <label htmlFor={`${sectionId}-message`} className="form-label">
                Mensaje
              </label>
              <textarea rows="4" {...fieldProps('message')}></textarea>
              {renderError('message')}
            </div>

            <button type="submit" className="btn btn-primary w-100">
              Enviar mensaje
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ContactForm;