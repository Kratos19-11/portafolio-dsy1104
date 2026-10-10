import { act } from 'react';
import { createRoot } from 'react-dom/client';
import NewsItem from './NewsItem';

describe('NewsItem', () => {
  const props = {
    title: 'Primera noticia',
    date: '2026-09-15',
    content: 'Contenido breve de la noticia.',
  };
  let container, root;

  beforeAll(() => { globalThis.IS_REACT_ACT_ENVIRONMENT = true; });

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
    act(() => root.render(<NewsItem {...props} />));
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
  });

  it('muestra el título y el contenido recibidos por props', () => {
    expect(container.querySelector('.card-title').textContent).toBe('Primera noticia');
    expect(container.querySelector('.card-text').textContent).toBe('Contenido breve de la noticia.');
  });

  it('conserva la fecha original en el atributo datetime', () => {
    expect(container.querySelector('time').getAttribute('datetime')).toBe('2026-09-15');
  });

  it('muestra la fecha en un formato legible', () => {
    const text = container.querySelector('time').textContent;
    expect(text).toContain('2026');
    expect(text).toContain('15');
    expect(text).not.toBe('2026-09-15');
  });

  it('usa un elemento article con la estructura de Card de Bootstrap', () => {
    const article = container.querySelector('article');
    expect(article).not.toBeNull();
    expect(article.classList.contains('card')).toBeTrue();
    expect(container.querySelector('.card-body')).not.toBeNull();
  });
});