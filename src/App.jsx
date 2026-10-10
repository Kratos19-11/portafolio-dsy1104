import NavBar from './components/layout/NavBar';
import Introduction from './components/introduction/Introduction';

const NAV_LINKS = [
  { label: 'Introducción', href: '#introduccion' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Noticias', href: '#noticias' },
];

const PROFILE = {
  name: 'Andeison Belandria',
  title: 'Estudiante de Desarrollo Fullstack · Duoc UC',
  bio: 'Escribe aquí tu propia biografía: qué estudias, qué tecnologías te gustan y qué buscas lograr.',
  photo: 'images/Panda_Profile.jpg',
  photoAlt: 'Foto de perfil de Andeison Belandria',
  ctaText: 'Ver mis proyectos',
  ctaHref: '#proyectos',
};

function App() {
  return (
    <>
      <NavBar brand="Mi Portafolio" links={NAV_LINKS} />
      <main className="container">
        <Introduction {...PROFILE} />

        <section id="proyectos" className="py-5 min-vh-100">
          <h2>Proyectos</h2>
        </section>
        <section id="noticias" className="py-5 min-vh-100">
          <h2>Noticias</h2>
        </section>
      </main>
    </>
  );
}

export default App;