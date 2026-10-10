import { act } from 'react';
import { createRoot } from 'react-dom/client';
import NavBar from './NavBar';

describe('NavBar', () => {
  const links = [
    { label: 'Inicio', href: '#introduccion' },
    { label: 'Proyectos', href: '#proyectos' },
    { label: 'Noticias', href: '#noticias' },
  ];
  let container, root;

  const getToggler = () => container.querySelector('.navbar-toggler');
  const getCollapse = () => container.querySelector('.navbar-collapse');

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<NavBar brand="Mi Portafolio" links={links} />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('renderiza la marca recibida por props', () => {
    expect(container.querySelector('.navbar-brand').textContent).toBe('Mi Portafolio');
  });

  it('renderiza un enlace por cada elemento de links', () => {
    const items = container.querySelectorAll('.nav-link');
    expect(items.length).toBe(3);
    expect(items[1].textContent).toBe('Proyectos');
    expect(items[1].getAttribute('href')).toBe('#proyectos');
  });

  it('inicia con el menú colapsado', () => {
    expect(getCollapse().classList.contains('show')).toBeFalse();
    expect(getToggler().getAttribute('aria-expanded')).toBe('false');
  });

  it('abre y cierra el menú al hacer clic en el botón (evento + estado)', () => {
    act(() => getToggler().click());
    expect(getCollapse().classList.contains('show')).toBeTrue();
    expect(getToggler().getAttribute('aria-expanded')).toBe('true');

    act(() => getToggler().click());
    expect(getCollapse().classList.contains('show')).toBeFalse();
  });

  it('cierra el menú al hacer clic en un enlace', () => {
    act(() => getToggler().click());
    expect(getCollapse().classList.contains('show')).toBeTrue();

    act(() => container.querySelector('.nav-link').click());
    expect(getCollapse().classList.contains('show')).toBeFalse();
  });
});