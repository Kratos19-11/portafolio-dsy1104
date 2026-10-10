/**
 * Tarjeta de proyecto basada en el componente Card de Bootstrap.
 * Props:
 *  - title, description: textos del proyecto
 *  - image / imageAlt: ruta y texto alternativo de la imagen
 *  - technologies: arreglo de strings
 *  - url / linkLabel: enlace a la demo o repositorio y su texto
 */
function ProjectCard({
  title,
  description,
  image,
  imageAlt,
  technologies = [],
  url,
  linkLabel = 'Ver proyecto',
}) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={image}
        className="card-img-top project-img"
        alt={imageAlt || `Captura del proyecto ${title}`}
        loading="lazy"
      />
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5">{title}</h3>
        <p className="card-text">{description}</p>

        <ul className="list-inline mb-3">
          {technologies.map((tech) => (
            <li key={tech} className="list-inline-item">
              <span className="badge text-bg-primary">{tech}</span>
            </li>
          ))}
        </ul>

        <a
          href={url}
          className="btn btn-outline-primary mt-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          {linkLabel}
        </a>
      </div>
    </div>
  );
}

export default ProjectCard;