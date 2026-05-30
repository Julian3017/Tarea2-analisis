# Tarea2-analisis

## Descripcion

Aplicación desarrollada en React que simula una intersección de cuatro semáforos controlados por un coordinador central.

El sistema utiliza eventos asíncronos para sincronizar los cambios de luces y evitar conflictos en la intersección.

## Funcionamiento

1. El usuario ingresa la duración del ciclo.
2. El controlador central activa un semáforo.
3. El semáforo cambia:
   - Verde
   - Amarillo
   - Rojo
4. El control pasa al siguiente semáforo.
5. El proceso se repite indefinidamente.

## Uso de Hooks

### useState

Se utiliza para almacenar el estado de cada semáforo.

### useEffect

Se utiliza para ejecutar el ciclo de control.

### useRef

Se utiliza para:
- Mantener el índice actual.
- Almacenar los temporizadores activos.

## Instalación

bash
npm install
npm run dev
