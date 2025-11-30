import React, { useState, useEffect } from "react";
import "../styles/FloatingUp.css"; // Asegúrate de crear este archivo CSS

interface FloatingUpProps {
  /** Porcentaje de la página que debe desplazarse antes de que aparezca el botón (0.3 = 30%) */
  visibilityThreshold?: number;
}

export const FloatingUp: React.FC<FloatingUpProps> = ({
  visibilityThreshold = 0.25,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  // 1. Función para manejar el evento de scroll
  const toggleVisibility = () => {
    // Calcula la altura total de la página
    const totalHeight =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;

    // Calcula la posición de scroll como un porcentaje
    const scrolledPercentage = window.scrollY / totalHeight;

    // Compara el porcentaje de scroll con el umbral (e.g., 0.3 = 30%)
    if (scrolledPercentage > visibilityThreshold) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // 2. Función para subir la página suavemente
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Hace que el scroll sea animado y suave
    });
  };

  // 3. Hook para añadir y limpiar el listener de scroll
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Limpieza: importante para evitar fugas de memoria
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []); // El array vacío asegura que solo se ejecute al montar y desmontar

  return (
    <button
      className={`floating-up-button ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
      title="Go to top"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-up"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M6 15l6 -6l6 6" />
      </svg>
    </button>
  );
};
