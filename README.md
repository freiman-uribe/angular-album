# Angular Album

Este proyecto es una aplicación Angular para gestionar álbumes musicales. Permite crear, editar, ver y eliminar álbumes, así como agregar comentarios a los álbumes.

## Requisitos

- Node.js (versión 23 o superior)
- Angular CLI (versión 12 o superior)

## Instalación

1. Clona el repositorio:

   `
   git clone https://github.com/freiman-uribe/angular-album.git
   cd angular-album`

2. Instala las dependencias:

`npm install`

## Ejecución

Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:

`ng serve`

Luego, abre tu navegador y navega a http://localhost:4200/.

## Estructura del Proyecto
- src/app/album-create/album-create.component.ts: Componente para crear y editar álbumes.

- src/app/album-comment/album-comment.component.ts: Componente para dejar un comentario al álbum.

- src/app/album-list/album-list.component.ts: Componente para listar los álbumes.

- src/app/album-detail/album-detail.component.ts: Componente para ver los detalles de un álbum.

- src/app/models/album.models.ts: 
Modelos de la informacion que se espera de los album.

- src/app/services/album.service.ts: Servicio para gestionar las operaciones CRUD de los álbumes.

## Funcionalidades

- Crear Álbum: Permite crear un nuevo álbum con nombre, cubierta, fecha de lanzamiento, descripción, género y disquera.

- Editar Álbum: Permite editar un álbum existente.

- Ver Álbum: Permite ver los detalles de un álbum, incluyendo sus comentarios y canciones.

- Eliminar Álbum: Permite eliminar un álbum.

- Agregar Comentarios: Permite agregar comentarios a un álbum.
