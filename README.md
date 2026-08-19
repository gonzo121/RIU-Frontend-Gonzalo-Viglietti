# RIU-Frontend-Gonzalo-Viglietti

# Super Heroes Challenge

Aplicación SPA desarrollada en **Angular** para la gestión de superhéroes.

El proyecto permite listar, buscar, crear, editar, visualizar y eliminar héroes. Los datos se gestionan en memoria mediante servicios de Angular, sin necesidad de un backend externo.

## Funcionalidades

* Listado de superhéroes.
* Búsqueda de héroes por nombre.
* Alta de nuevos héroes.
* Edición de héroes existentes.
* Visualización del detalle de un héroe.
* Eliminación con diálogo de confirmación.
* Formularios reactivos con validaciones.
* Carga opcional de icono para cada héroe.
* Visualización de poderes y franquicia.
* Paginación en la vista desktop.
* Vista responsive adaptada a dispositivos móviles.
* Infinite scroll en dispositivos móviles.
* Indicador global de carga para las operaciones.
* Navegación mediante Angular Router.

## Tecnologías utilizadas

El proyecto fue desarrollado utilizando las siguientes tecnologías principales:

| Tecnología          |                                                Versión |
| ------------------- | -----------------------------------------------------: |
| Node.js             |                                                22.23.1 |
| pnpm                |                                                11.21.0 |
| Angular             |                                                 21.2.x |
| Angular CLI         |                                                21.2.20 |
| Angular Material    |                                                21.2.14 |
| Angular CDK         |                                                21.2.14 |
| TypeScript          |                                                  5.9.2 |
| RxJS                |                                                  7.8.x |
| Jest                |                                                 30.4.2 |
| jest-preset-angular |                                                 17.0.0 |
| ESLint              |                                                 10.3.0 |
| Prettier            |                                                  3.9.6 |
| Docker              |           Utilizado para la ejecución de la aplicación |
| Docker Compose      |         Utilizado para construir y levantar el entorno |

Para las versiones exactas de las dependencias consultar `package.json` y `pnpm-lock.yaml`.

## Ejecución con Docker

La forma recomendada de ejecutar la aplicación es mediante **Docker Compose**.

### Requisitos

Es necesario tener instalados:

* Docker
* Docker Compose

### Construir y ejecutar la aplicación

Desde la raíz del proyecto ejecutar:

```bash
docker compose up --build
```

## Ejecución local para desarrollo

También es posible ejecutar la aplicación directamente con Node.js y pnpm.

### Requisitos de desarrollo

* Node.js `22.23.1`
* pnpm `11.21.0`

Instalar dependencias:

```bash
pnpm install
```

Ejecutar el servidor de desarrollo:

```bash
pnpm start
```

La aplicación estará disponible por defecto en:

```text
http://localhost:4200
```

## Testing

El proyecto utiliza **Jest** como framework de testing.

Ejecutar todos los tests:

```bash
pnpm test
```

Ejecutar los tests en modo watch:

```bash
pnpm test:watch
```

Generar el reporte de cobertura:

```bash
pnpm test:coverage
```

## Calidad de código

Ejecutar ESLint:

```bash
pnpm lint
```

Aplicar formato con Prettier:

```bash
pnpm format
```

Verificar el formato sin modificar archivos:

```bash
pnpm format:check
```



## Autor

**Gonzalo Viglietti**
