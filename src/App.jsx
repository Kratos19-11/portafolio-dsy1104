import NavBar from './components/layout/NavBar';
import Introduction from './components/introduction/Introduction';
import ProjectsSection from './components/projects/ProjectsSection';

const NAV_LINKS = [
  { label: 'Introducción', href: '#introduccion' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Noticias', href: '#noticias' },
];

const PROFILE = {
  name: 'Andeison Belandria',
  title: 'Estudiante de Desarrollo Fullstack · Duoc UC',
  bio: 'Ingeniero en informatica y estudiante de desarrollo fullstack en Duoc UC. Me apasiona crear aplicaciones web y aprender nuevas tecnologías.',
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
        <ProjectsSection />

        <section id="noticias" className="py-5 min-vh-100">
          <h2>Noticias</h2>
        </section>
      </main>
    </>
  );
}

export default App;