import React, { useEffect, useRef, useState } from "react";
import Semaforo from "./Semaforo";
import "./styles.css";

/**
 * Componente principal de la aplicación.
 *
 * Simula una intersección de 4 semáforos
 * controlados por un coordinador central.
 *
 * Cada semáforo funciona de manera independiente,
 * pero sincronizada para evitar conflictos.
 *
 * @returns {JSX.Element}
 */
export default function App() {

  /**
   * Tiempo configurable de duración
   * de la luz verde.
   *
   * @type {[number, Function]}
   */
  const [tiempo, setTiempo] = useState(3000);

  /**
   * Estado del semáforo norte.
   *
   * Valores posibles:
   * - "red"
   * - "yellow"
   * - "green"
   *
   * @type {[string, Function]}
   */
  const [norte, setNorte] = useState("green");

  /**
   * Estado del semáforo sur.
   *
   * @type {[string, Function]}
   */
  const [sur, setSur] = useState("red");

  /**
   * Estado del semáforo este.
   *
   * @type {[string, Function]}
   */
  const [este, setEste] = useState("red");

  /**
   * Estado del semáforo oeste.
   *
   * @type {[string, Function]}
   */
  const [oeste, setOeste] = useState("red");

  /**
   * Índice del semáforo activo.
   *
   * useRef permite almacenar valores
   * persistentes sin provocar renderizados.
   *
   * @type {React.MutableRefObject<number>}
   */
  const indiceActual = useRef(0);

  /**
   * Orden de activación de los semáforos.
   *
   * @type {string[]}
   */
  const orden = [
    "norte",
    "sur",
    "este",
    "oeste"
  ];

  /**
   * Lista de temporizadores activos.
   *
   * @type {React.MutableRefObject<number[]>}
   */
  const temporizadores = useRef([]);

  /**
   * Hook encargado del controlador central.
   *
   * Coordina los cambios de luces
   * utilizando eventos asíncronos.
   */
  useEffect(() => {

    /**
     * Elimina todos los temporizadores activos.
     *
     * Evita fugas de memoria.
     *
     * @returns {void}
     */
    const limpiarTemporizadores = () => {

      temporizadores.current.forEach(clearTimeout);

      temporizadores.current = [];
    };

    /**
     * Agrega un nuevo temporizador.
     *
     * @param {Function} callback
     * Función a ejecutar.
     *
     * @param {number} delay
     * Tiempo de espera en milisegundos.
     *
     * @returns {void}
     */
    const agregarTemporizador = (
      callback,
      delay
    ) => {

      const timer = setTimeout(
        callback,
        delay
      );

      temporizadores.current.push(timer);
    };

    /**
     * Coloca todos los semáforos en rojo.
     *
     * @returns {void}
     */
    const ponerTodosEnRojo = () => {

      setNorte("red");
      setSur("red");
      setEste("red");
      setOeste("red");
    };

    /**
     * Cambia el estado de un semáforo.
     *
     * @param {string} direccion
     * Dirección del semáforo.
     *
     * @param {string} color
     * Nuevo color del semáforo.
     *
     * @returns {void}
     */
    const activarSemaforo = (
      direccion,
      color
    ) => {

      switch (direccion) {

        case "norte":
          setNorte(color);
          break;

        case "sur":
          setSur(color);
          break;

        case "este":
          setEste(color);
          break;

        case "oeste":
          setOeste(color);
          break;

        default:
          break;
      }
    };

    /**
     * Controlador central del sistema.
     *
     * Ejecuta el ciclo de cambios
     * de los semáforos.
     *
     * @returns {void}
     */
    const ejecutarCiclo = () => {

      /**
       * Semáforo actual.
       *
       * @type {string}
       */
      const actual =
        orden[indiceActual.current];

      /**
       * Todos los semáforos se colocan
       * inicialmente en rojo.
       */
      ponerTodosEnRojo();

      /**
       * Se activa el semáforo actual
       * en verde.
       */
      activarSemaforo(actual, "green");

      /**
       * Cambio de verde a amarillo.
       */
      agregarTemporizador(() => {

        activarSemaforo(actual, "yellow");

        /**
         * Cambio de amarillo a rojo.
         */
        agregarTemporizador(() => {

          activarSemaforo(actual, "red");

          /**
           * Avanza al siguiente semáforo.
           */
          indiceActual.current =
            (indiceActual.current + 1)
            % orden.length;

          /**
           * Reinicia el ciclo.
           */
          ejecutarCiclo();

        }, 1500);

      }, tiempo);
    };

    /**
     * Inicia el sistema.
     */
    ejecutarCiclo();

    /**
     * Limpieza automática del efecto.
     */
    return limpiarTemporizadores;

  }, [tiempo]);

  return (
    <div className="app">

      <h1>
        Semaforos asincronicos
      </h1>

      <div className="controls">

        <label>
          Duración del verde (ms):
        </label>

        <input
          type="number"
          min="1000"
          step="1000"
          value={tiempo}
          onChange={(e) =>
            setTiempo(Number(e.target.value))
          }
        />

      </div>

      <div className="crossroad">

        <div className="north">
          <Semaforo
            direccion="Norte"
            estado={norte}
          />
        </div>

        <div className="south">
          <Semaforo
            direccion="Sur"
            estado={sur}
          />
        </div>

        <div className="east">
          <Semaforo
            direccion="Este"
            estado={este}
          />
        </div>

        <div className="west">
          <Semaforo
            direccion="Oeste"
            estado={oeste}
          />
        </div>

      </div>

    </div>
  );
}