import React from "react";

/**
 * Componente reutilizable de semáforo.
 *
 * @param {Object} props
 * Propiedades del componente.
 *
 * @param {string} props.direccion
 * Nombre de la dirección.
 *
 * @param {string} props.estado
 * Estado actual del semáforo.
 *
 * @returns {JSX.Element}
 */
export default function Semaforo({
  direccion,
  estado
}) {

  return (
    <div className="traffic-wrapper">

      <h3>
        {direccion}
      </h3>

      <div className="traffic-light">

        {/* Luz roja */}
        <div
          className={`light red ${
            estado === "red"
              ? "active"
              : ""
          }`}
        ></div>

        {/* Luz amarilla */}
        <div
          className={`light yellow ${
            estado === "yellow"
              ? "active"
              : ""
          }`}
        ></div>

        {/* Luz verde */}
        <div
          className={`light green ${
            estado === "green"
              ? "active"
              : ""
          }`}
        ></div>

      </div>

    </div>
  );
}