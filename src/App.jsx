import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Introduction from './components/introduction/Introduction';
import ProjectsSection from './components/projects/ProjectsSection';
import NewsSection from './components/news/NewsSection';
import ContactForm from './components/contact/ContactForm';

const NAV_LINKS = [
  { label: 'Introducción', href: '#introduccion' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Noticias', href: '#noticias' },
  { label: 'Contacto', href: '#contacto' },
];

const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com/Kratos19-11' },
];

const PROFILE = {
  name: 'Andeison Belandria',
  title: 'Estudiante de Desarrollo Fullstack · Duoc UC',
  bio: 'Estudiante de Ingenieria en Informatica · Duoc UC',
  bio: 'Soy un estudiante apasionado por la tecnología y el desarrollo web. Me especializo en crear soluciones innovadoras y eficientes, siempre buscando aprender y mejorar mis habilidades.',
  photo: 'images/Panda_Profile.jpg',
  photoAlt: 'Foto de perfil de Andeison Belandria',
  ctaText: 'Ver mis proyectos',
  ctaHref: '#proyectos',
};

function App() {
  return (
    <>
      <a
        href="#contenido"
        className="visually-hidden-focusable btn btn-warning position-fixed top-0 start-0 m-2 skip-link"
      >
        Saltar al contenido
      </a>

      <NavBar brand="Mi Portafolio" links={NAV_LINKS} />

      <main id="contenido" className="container" tabIndex="-1">
        <Introduction {...PROFILE} />
        <ProjectsSection />
        <NewsSection
          sectionId="noticias"
          title="Noticias de Tecnología"
          category="Tecnología"
        />
        <NewsSection
          sectionId="noticias-academicas"
          title="Noticias Académicas"
          category="Académico"
        />
        <ContactForm />
      </main>

      <Footer name={PROFILE.name} links={FOOTER_LINKS} />
    </>
  );
}

export default App;