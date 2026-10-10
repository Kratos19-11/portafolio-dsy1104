import { useState } from 'react';

/**
 * Barra de navegación responsiva basada en el Navbar de Bootstrap.
 * Props:
 *  - brand: texto de la marca (string)
 *  - links: arreglo de { label, href }
 */
function NavBar({ brand, links = [] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top"
      aria-label="Navegación principal"
    >
      <div className="container">
        <a className="navbar-brand" href="#introduccion">
          {brand}
        </a>

        <button
          className="navbar-toggler"
          type="button"
          aria-controls="navbarNav"
          aria-expanded={isOpen}
          aria-label="Mostrar u ocultar menú"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className={`collapse navbar-collapse${isOpen ? ' show' : ''}`}
          id="navbarNav"
        >
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.href}>
                <a
                  className="nav-link"
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;