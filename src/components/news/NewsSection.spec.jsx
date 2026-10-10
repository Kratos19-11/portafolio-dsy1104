import { act } from 'react';
import { createRoot } from 'react-dom/client';
import NewsSection from './NewsSection';

describe('NewsSection', () => {
  const NEWS = [
    { id: 1, title: 'Tec uno', date: '2026-10-05', content: 'Contenido 1', category: 'Tecnología' },
    { id: 2, title: 'Tec dos', date: '2026-09-28', content: 'Contenido 2', category: 'Tecnología' },
    { id: 3, title: 'Acad uno', date: '2026-09-15', content: 'Contenido 3', category: 'Académico' },
    { id: 4, title: 'Acad dos', date: '2026-10-09', content: 'Contenido 4', category: 'Académico' },
  ];
  let container, root;

  // Simula fetch (mock) con una respuesta controlada
  const mockFetch = (body, ok = true) =>
    spyOn(window, 'fetch').and.resolveTo({
      ok,
      status: ok ? 200 : 500,
      json: () => Promise.resolve(body),
    });

  const renderSection = (element) => act(() => root.render(element));

  // Espera a que se resuelvan las promesas y React actualice el DOM
  const settle = () => act(async () => { await new Promise((resolve) => setTimeout(resolve, 0)); });

  const titles = () =>
    Array.from(container.querySelectorAll('.card-title')).map((el) => el.textContent);

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

  it('muestra el indicador de carga mientras se obtienen los datos', () => {
    spyOn(window, 'fetch').and.returnValue(new Promise(() => {}));
    renderSection(<NewsSection />);
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain('Cargando noticias');
  });

  it('solicita el JSON de noticias por defecto', async () => {
    mockFetch(NEWS);
    renderSection(<NewsSection />);
    await settle();
    expect(window.fetch).toHaveBeenCalledWith('data/news.json');
  });

  it('solicita el JSON indicado en la prop dataUrl', async () => {
    mockFetch(NEWS);
    renderSection(<NewsSection dataUrl="data/otras.json" />);
    await settle();
    expect(window.fetch).toHaveBeenCalledWith('data/otras.json');
  });

  it('muestra solo las noticias de la categoría indicada', async () => {
    mockFetch(NEWS);
    renderSection(<NewsSection category="Tecnología" />);
    await settle();

    expect(container.querySelectorAll('article').length).toBe(2);
    expect(titles()).toEqual(['Tec uno', 'Tec dos']);
  });

  it('muestra todas las noticias cuando no se indica categoría', async () => {
    mockFetch(NEWS);
    renderSection(<NewsSection />);
    await settle();

    expect(container.querySelectorAll('article').length).toBe(4);
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it('muestra el título y el id recibidos por props', async () => {
    mockFetch(NEWS);
    renderSection(<NewsSection sectionId="noticias-academicas" title="Noticias Académicas" />);
    await settle();

    expect(container.querySelector('h2').textContent).toBe('Noticias Académicas');
    expect(container.querySelector('section').id).toBe('noticias-academicas');
  });

  it('usa "noticias" como id por defecto', async () => {
    mockFetch(NEWS);
    renderSection(<NewsSection />);
    await settle();

    expect(container.querySelector('section').id).toBe('noticias');
  });

  it('muestra un mensaje de error cuando la carga falla', async () => {
    mockFetch({}, false);
    renderSection(<NewsSection />);
    await settle();

    const alert = container.querySelector('.alert-danger');
    expect(alert).not.toBeNull();
    expect(alert.textContent).toContain('No se pudieron cargar las noticias');
    expect(container.querySelectorAll('article').length).toBe(0);
  });

  it('muestra un mensaje cuando no hay noticias para la categoría', async () => {
    mockFetch(NEWS);
    renderSection(<NewsSection category="Deportes" />);
    await settle();

    expect(container.textContent).toContain('No hay noticias para mostrar');
    expect(container.querySelectorAll('article').length).toBe(0);
  });
});