/**
 * Sección de presentación personal.
 * Props:
 *  - name: nombre completo (string)
 *  - title: cargo o especialidad (string)
 *  - bio: breve biografía (string)
 *  - photo: ruta de la foto de perfil (string)
 *  - photoAlt: texto alternativo de la foto (string, opcional)
 *  - ctaText / ctaHref: texto y destino del botón (opcionales)
 */
function Introduction({ name, title, bio, photo, photoAlt, ctaText, ctaHref }) {
  return (
    <section id="introduccion" className="py-5">
      <div className="row align-items-center g-4">
        <div className="col-12 col-md-4 text-center">
          <img
              src={photo}
              alt={photoAlt || `Foto de ${name}`}
              className="img-fluid rounded-circle shadow intro-photo"
              width="260"
              height="260"
              fetchPriority="high"
            />
        </div>

        <div className="col-12 col-md-8 text-center text-md-start">
          <h1 className="display-5 fw-bold">{name}</h1>
          <p className="lead text-secondary">{title}</p>
          <p>{bio}</p>
          {ctaHref && (
            <a className="btn btn-primary btn-lg" href={ctaHref}>
              {ctaText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

export default Introduction;