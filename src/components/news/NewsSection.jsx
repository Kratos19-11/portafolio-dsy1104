import useFetchJson from '../../hooks/useFetchJson';
import NewsItem from './NewsItem';

/**
 * Sección de noticias cargadas desde un JSON.
 * Props:
 *  - sectionId: id HTML de la sección (para los enlaces del menú)
 *  - title: título de la sección
 *  - category: si se entrega, solo muestra las noticias de esa categoría
 *  - dataUrl: ruta del archivo JSON (por defecto 'data/news.json')
 */
function NewsSection({
  sectionId = 'noticias',
  title = 'Noticias',
  category,
  dataUrl = 'data/news.json',
}) {
  const { data: news, loading, error } = useFetchJson(dataUrl);

  const visibleNews = category
    ? news.filter((item) => item.category === category)
    : news;

  return (
    <section id={sectionId} className="py-5">
      <h2 className="mb-4">{title}</h2>

      {loading && (
        <div className="d-flex align-items-center gap-2" role="status">
          <div className="spinner-border spinner-border-sm" aria-hidden="true"></div>
          <span>Cargando noticias...</span>
        </div>
      )}

      {error && (
        <div className="alert alert-danger" role="alert">
          No se pudieron cargar las noticias. {error}
        </div>
      )}

      {!loading && !error && visibleNews.length === 0 && (
        <p className="text-secondary">No hay noticias para mostrar.</p>
      )}

      <div className="row g-4">
        {visibleNews.map((item) => (
          <div className="col-12 col-md-6" key={item.id}>
            <NewsItem title={item.title} date={item.date} content={item.content} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewsSection;