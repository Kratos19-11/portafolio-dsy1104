import { act } from 'react';
import { createRoot } from 'react-dom/client';

describe('Entorno de pruebas', () => {
  let container, root;

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

  it('renderiza un componente React en el DOM', () => {
    act(() => root.render(<h1>Hola Jasmine</h1>));
    expect(container.querySelector('h1').textContent).toBe('Hola Jasmine');
  });
});