import { act } from 'react';
import { createRoot } from 'react-dom/client';
import Introduction from './Introduction';

describe('Introduction', () => {
  const props = {
    name: 'Andeison Belandria',
    title: 'Estudiante de Desarrollo Fullstack',
    bio: 'Me apasiona crear aplicaciones web.',
    photo: 'images/Panda_Profile.jpg',
    ctaText: 'Ver proyectos',
    ctaHref: '#proyectos',
  };
  let container, root;

  const render = (p) => act(() => root.render(<Introduction {...p} />));

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('muestra el nombre, el cargo y la biografía recibidos por props', () => {
    render(props);
    expect(container.querySelector('h1').textContent).toBe('Andeison Belandria');
    expect(container.querySelector('.lead').textContent).toBe(props.title);
    expect(container.textContent).toContain(props.bio);
  });

  it('renderiza la foto con su ruta y un texto alternativo por defecto', () => {
    render(props);
    const img = container.querySelector('img');
    expect(img.getAttribute('src')).toBe(props.photo);
    expect(img.getAttribute('alt')).toBe('Foto de Andeison Belandria');
  });

  it('usa el texto alternativo personalizado cuando se entrega', () => {
    render({ ...props, photoAlt: 'Retrato profesional' });
    expect(container.querySelector('img').getAttribute('alt')).toBe('Retrato profesional');
  });

  it('muestra el botón con su texto y destino cuando hay ctaHref', () => {
    render(props);
    const button = container.querySelector('a.btn');
    expect(button.textContent).toBe('Ver proyectos');
    expect(button.getAttribute('href')).toBe('#proyectos');
  });

  it('no muestra el botón cuando no se entrega ctaHref', () => {
    render({ ...props, ctaText: undefined, ctaHref: undefined });
    expect(container.querySelector('a.btn')).toBeNull();
  });

  it('usa clases de la grilla de Bootstrap y una imagen responsiva', () => {
    render(props);
    expect(container.querySelector('.row')).not.toBeNull();
    expect(container.querySelector('.col-md-4')).not.toBeNull();
    expect(container.querySelector('img').classList.contains('img-fluid')).toBeTrue();
  });
});