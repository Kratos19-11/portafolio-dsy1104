import { act } from 'react';
import { createRoot } from 'react-dom/client';
import ProjectCard from './ProjectCard';

describe('ProjectCard', () => {
  const props = {
    title: 'Tienda Online',
    description: 'Catálogo de productos con carrito de compras.',
    image: 'images/projects/placeholder.svg',
    technologies: ['React', 'Bootstrap', 'JSON'],
    url: 'https://github.com/usuario/tienda',
    linkLabel: 'Ver repositorio',
  };
  let container, root;

  const render = (p) => act(() => root.render(<ProjectCard {...p} />));

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

  it('muestra el título y la descripción recibidos por props', () => {
    render(props);
    expect(container.querySelector('.card-title').textContent).toBe('Tienda Online');
    expect(container.querySelector('.card-text').textContent).toBe(props.description);
  });

  it('renderiza la imagen con su ruta y un texto alternativo por defecto', () => {
    render(props);
    const img = container.querySelector('img');
    expect(img.getAttribute('src')).toBe(props.image);
    expect(img.getAttribute('alt')).toBe('Captura del proyecto Tienda Online');
  });

  it('usa el texto alternativo personalizado cuando se entrega', () => {
    render({ ...props, imageAlt: 'Vista principal de la tienda' });
    expect(container.querySelector('img').getAttribute('alt')).toBe('Vista principal de la tienda');
  });

  it('muestra una etiqueta por cada tecnología', () => {
    render(props);
    const badges = container.querySelectorAll('.badge');
    expect(badges.length).toBe(3);
    expect(badges[0].textContent).toBe('React');
    expect(badges[2].textContent).toBe('JSON');
  });

  it('no muestra etiquetas cuando no se entregan tecnologías', () => {
    render({ ...props, technologies: undefined });
    expect(container.querySelectorAll('.badge').length).toBe(0);
  });

  it('el enlace apunta a la url y se abre en una pestaña nueva de forma segura', () => {
    render(props);
    const link = container.querySelector('a.btn');
    expect(link.getAttribute('href')).toBe(props.url);
    expect(link.getAttribute('target')).toBe('_blank');
    expect(link.getAttribute('rel')).toBe('noopener noreferrer');
    expect(link.textContent).toBe('Ver repositorio');
  });

  it('usa el texto "Ver proyecto" cuando no se entrega linkLabel', () => {
    render({ ...props, linkLabel: undefined });
    expect(container.querySelector('a.btn').textContent).toBe('Ver proyecto');
  });

  it('usa la estructura del componente Card de Bootstrap', () => {
    render(props);
    expect(container.querySelector('.card')).not.toBeNull();
    expect(container.querySelector('.card-img-top')).not.toBeNull();
    expect(container.querySelector('.card-body')).not.toBeNull();
  });
});