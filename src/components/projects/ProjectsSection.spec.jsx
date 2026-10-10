import { act } from 'react';
import { createRoot } from 'react-dom/client';
import ProjectsSection from './ProjectsSection';

describe('ProjectsSection', () => {
  const PROJECTS = [
    { id: 1, title: 'Proyecto Uno', description: 'Descripción uno', image: 'images/uno.svg', technologies: ['React'], url: 'https://example.com/1' },
    { id: 2, title: 'Proyecto Dos', description: 'Descripción dos', image: 'images/dos.svg', technologies: ['Bootstrap'], url: 'https://example.com/2' },
    { id: 3, title: 'Proyecto Tres', description: 'Descripción tres', image: 'images/tres.svg', technologies: ['JSON'], url: 'https://example.com/3' },
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
    renderSection(<ProjectsSection />);
    expect(container.querySelector('[role="status"]')).not.toBeNull();
    expect(container.textContent).toContain('Cargando proyectos');
  });

  it('renderiza una Card por cada proyecto del JSON y oculta la carga', async () => {
    mockFetch(PROJECTS);
    renderSection(<ProjectsSection />);
    await settle();

    expect(container.querySelectorAll('.card').length).toBe(3);
    expect(container.querySelector('[role="status"]')).toBeNull();
  });

  it('muestra los datos de cada proyecto en el orden del JSON', async () => {
    mockFetch(PROJECTS);
    renderSection(<ProjectsSection />);
    await settle();

    const titles = Array.from(container.querySelectorAll('.card-title')).map((el) => el.textContent);
    expect(titles).toEqual(['Proyecto Uno', 'Proyecto Dos', 'Proyecto Tres']);
  });

  it('solicita el JSON de proyectos por defecto', async () => {
    mockFetch(PROJECTS);
    renderSection(<ProjectsSection />);
    await settle();

    expect(window.fetch).toHaveBeenCalledWith('data/projects.json');
  });

  it('solicita el JSON indicado en la prop dataUrl', async () => {
    mockFetch(PROJECTS);
    renderSection(<ProjectsSection dataUrl="data/otros.json" />);
    await settle();

    expect(window.fetch).toHaveBeenCalledWith('data/otros.json');
  });

  it('muestra un mensaje de error cuando la carga falla', async () => {
    mockFetch({}, false);
    renderSection(<ProjectsSection />);
    await settle();

    const alert = container.querySelector('.alert-danger');
    expect(alert).not.toBeNull();
    expect(alert.textContent).toContain('No se pudieron cargar los proyectos');
    expect(container.querySelectorAll('.card').length).toBe(0);
  });

  it('muestra un mensaje cuando el JSON no tiene proyectos', async () => {
    mockFetch([]);
    renderSection(<ProjectsSection />);
    await settle();

    expect(container.textContent).toContain('Aún no hay proyectos para mostrar');
  });
});