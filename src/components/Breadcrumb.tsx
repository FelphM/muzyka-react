import { Link } from "react-router-dom";
import "../styles/breadcrumb.css";

type BreadcrumbItem = {
  label: string;
  path: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb navigation">
      <ol>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        {items.map((item, index) => (
          <li key={index}>
            <span className="separator">/</span>
            {index === items.length - 1 ? (
              <span className="current">{item.label}</span>
            ) : (
              <Link to={item.path}>{item.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}