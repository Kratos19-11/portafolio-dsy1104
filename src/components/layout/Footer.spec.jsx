import { act } from 'react';
import { createRoot } from 'react-dom/client';
import Footer from './Footer';

describe('Footer', () => {
  const links = [
    { label: 'GitHub', href: 'https://github.com/Kratos19-11' },
    { label: 'Correo', href: 'https://example.com/contacto' },
  ];
  let container, root;

  const render = (element) => act(() => root.render(element));

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

  it('muestra el nombre y el año recibidos por props', () => {
    render(<Footer name="Andeison Belandria" year={2030} />);
    const text = container.querySelector('p').textContent;
    expect(text).toContain('2030');
    expect(text).toContain('Andeison Belandria');
  });

  it('usa el año actual cuando no se entrega year', () => {
    render(<Footer name="Andeison Belandria" />);
    expect(container.querySelector('p').textContent).toContain(String(new Date().getFullYear()));
  });

  it('renderiza un enlace externo seguro por cada elemento de links', () => {
    render(<Footer name="Andeison Belandria" links={links} />);
    const anchors = container.querySelectorAll('a');

    expect(anchors.length).toBe(2);
    expect(anchors[0].textContent).toBe('GitHub');
    expect(anchors[0].getAttribute('href')).toBe('https://github.com/Kratos19-11');
    expect(anchors[0].getAttribute('target')).toBe('_blank');
    expect(anchors[0].getAttribute('rel')).toBe('noopener noreferrer');
  });

  it('no renderiza la lista de enlaces cuando no se entregan links', () => {
    render(<Footer name="Andeison Belandria" />);
    expect(container.querySelector('ul')).toBeNull();
  });

  it('usa un elemento footer semántico con clases de Bootstrap', () => {
    render(<Footer name="Andeison Belandria" />);
    const footer = container.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.classList.contains('bg-dark')).toBeTrue();
    expect(container.querySelector('.container')).not.toBeNull();
  });
});