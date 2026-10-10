import { act } from 'react';
import { createRoot } from 'react-dom/client';
import ContactForm from './ContactForm';

describe('ContactForm', () => {
  let container, root, onSubmitSpy;

  const field = (name) => container.querySelector(`[name="${name}"]`);

  // React escucha el evento "input": se asigna el valor con el setter nativo y se dispara el evento
  const type = (name, value) =>
    act(() => {
      const el = field(name);
      const setter = Object.getOwnPropertyDescriptor(Object.getPrototypeOf(el), 'value').set;
      setter.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    });

  const submit = () =>
    act(() => container.querySelector('button[type="submit"]').click());

  const fillValid = () => {
    type('name', 'Ana Pérez');
    type('email', 'ana@correo.cl');
    type('message', 'Hola, me gustaría contactarte.');
  };

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    onSubmitSpy = jasmine.createSpy('onSubmit');
    act(() => root.render(<ContactForm onSubmit={onSubmitSpy} />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('renderiza los tres campos con su etiqueta asociada y el botón de envío', () => {
    ['name', 'email', 'message'].forEach((name) => {
      const input = field(name);
      expect(input).not.toBeNull();
      const label = container.querySelector(`label[for="${input.id}"]`);
      expect(label).not.toBeNull();
    });
    expect(container.querySelector('button[type="submit"]').textContent).toBe('Enviar mensaje');
  });

  it('muestra un error por cada campo vacío y no llama a onSubmit', () => {
    submit();

    expect(container.querySelectorAll('.invalid-feedback').length).toBe(3);
    expect(field('name').getAttribute('aria-invalid')).toBe('true');
    expect(container.querySelector('.alert-success')).toBeNull();
    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('considera inválido un nombre con solo espacios', () => {
    type('name', '   ');
    type('email', 'ana@correo.cl');
    type('message', 'Mensaje con más de diez caracteres');
    submit();

    expect(container.querySelector('#contacto-name-error').textContent).toBe('El nombre es obligatorio.');
    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('rechaza un correo con formato inválido', () => {
    type('name', 'Ana');
    type('email', 'correo-sin-arroba');
    type('message', 'Mensaje con más de diez caracteres');
    submit();

    expect(container.querySelector('#contacto-email-error').textContent).toBe('Ingresa un correo válido.');
    expect(onSubmitSpy).not.toHaveBeenCalled();
  });

  it('rechaza un mensaje demasiado corto', () => {
    type('name', 'Ana');
    type('email', 'ana@correo.cl');
    type('message', 'Hola');
    submit();

    expect(container.querySelector('#contacto-message-error').textContent)
      .toBe('El mensaje debe tener al menos 10 caracteres.');
  });

  it('con datos válidos llama a onSubmit, muestra el éxito y limpia el formulario', () => {
    fillValid();
    submit();

    expect(onSubmitSpy).toHaveBeenCalledWith({
      name: 'Ana Pérez',
      email: 'ana@correo.cl',
      message: 'Hola, me gustaría contactarte.',
    });
    expect(container.querySelector('.alert-success')).not.toBeNull();
    expect(field('name').value).toBe('');
    expect(field('email').value).toBe('');
    expect(field('message').value).toBe('');
  });

  it('actualiza el valor del campo mientras se escribe (estado controlado)', () => {
    type('name', 'Luis');
    expect(field('name').value).toBe('Luis');
  });

  it('quita el error de un campo cuando el usuario empieza a corregirlo', () => {
    submit();
    expect(field('name').classList.contains('is-invalid')).toBeTrue();

    type('name', 'Ana');

    expect(field('name').classList.contains('is-invalid')).toBeFalse();
    expect(field('email').classList.contains('is-invalid')).toBeTrue();
  });

  it('oculta el mensaje de éxito cuando se vuelve a escribir', () => {
    fillValid();
    submit();
    expect(container.querySelector('.alert-success')).not.toBeNull();

    type('name', 'Otro nombre');

    expect(container.querySelector('.alert-success')).toBeNull();
  });

  it('usa componentes de formulario y grilla de Bootstrap', () => {
    expect(container.querySelectorAll('.form-control').length).toBe(3);
    expect(container.querySelectorAll('.form-label').length).toBe(3);
    expect(container.querySelector('.btn.btn-primary')).not.toBeNull();
    expect(container.querySelector('.col-md-8')).not.toBeNull();
  });
});