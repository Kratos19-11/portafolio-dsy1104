/**
 * Pie de página del portafolio.
 * Props:
 *  - name: nombre que aparece en el aviso de derechos
 *  - year: año (por defecto, el año actual)
 *  - links: arreglo de { label, href } con enlaces externos
 */
function Footer({ name, year = new Date().getFullYear(), links = [] }) {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-2">
        <p className="mb-0 small">
          &copy; {year} {name}. Todos los derechos reservados.
        </p>

        {links.length > 0 && (
          <ul className="list-inline mb-0">
            {links.map((link) => (
              <li className="list-inline-item" key={link.href}>
                <a
                  className="link-light"
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </footer>
  );
}

export default Footer;