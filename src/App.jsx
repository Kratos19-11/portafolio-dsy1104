import NavBar from './components/layout/NavBar';
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

const PROFILE = {
  name: 'Andeison Belandria',
  title: 'Estudiante de Desarrollo Fullstack · Duoc UC',
  bio: 'Soy un estudiante apasionado por la tecnología y el desarrollo web. Me especializo en crear soluciones innovadoras y eficientes, siempre buscando aprender y mejorar mis habilidades.',
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
    </>
  );
}

export default App;