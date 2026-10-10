import useFetchJson from '../../hooks/useFetchJson';
import ProjectCard from './ProjectCard';

/**
 * Sección que carga los proyectos desde un JSON y los muestra en una grilla.
 * Props:
 *  - dataUrl: ruta del archivo JSON (por defecto 'data/projects.json')
 *  - title: título de la sección
 */
function ProjectsSection({ dataUrl = 'data/projects.json', title = 'Proyectos' }) {
  const { data: projects, loading, error } = useFetchJson(dataUrl);

  return (
    <section id="proyectos" className="py-5">
      <h2 className="mb-4">{title}</h2>

      {loading && (
        <div className="d-flex align-items-center gap-2" role="status">
          <div className="spinner-border spinner-border-sm" aria-hidden="true"></div>
          <span>Cargando proyectos...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          No se pudieron cargar los proyectos. {error}
        </div>
      )}

      {!loading && !error && projects.length === 0 && (
        <p className="text-secondary">Aún no hay proyectos para mostrar.</p>
      )}

      <div className="row g-4">
        {projects.map((project) => (
          <div className="col-12 col-md-6 col-lg-4" key={project.id}>
            <ProjectCard {...project} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProjectsSection;