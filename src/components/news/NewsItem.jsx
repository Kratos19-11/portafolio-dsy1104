/**
 * Tarjeta de una noticia.
 * Props:
 *  - title: título de la noticia
 *  - date: fecha en formato AAAA-MM-DD
 *  - content: contenido breve
 */
function NewsItem({ title, date, content }) {
  // Se fuerza la hora local para que la fecha no se desplace un día por la zona horaria
  const formattedDate = new Date(`${date}T00:00:00`).toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="card h-100 shadow-sm">
      <div className="card-body">
        <h3 className="card-title h5">{title}</h3>
        <p className="card-subtitle mb-2 text-secondary small">
          <time dateTime={date}>{formattedDate}</time>
        </p>
        <p className="card-text">{content}</p>
      </div>
    </article>
  );
}

export default NewsItem;