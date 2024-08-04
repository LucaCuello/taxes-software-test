# Taxes Software [Prueba técnica]

## Deploy en Vercel

Para visitar el deploy en vercel, [hacer click aquí.](https://bookbuddyshelf.vercel.app/)

## Instalar el proyecto

Para correr el proyecto en local, se debe realizar:

```bash
npm install
npm run dev

```

## Requisitos de la prueba

Interfaz de usuario:
• Un campo de entrada para agregar el título del libro.
• Un segundo campo de entrada para agregar el autor del libro.
• Un botón para añadir el libro ingresado a la colección.
• Una lista que muestre todos los libros añadidos con su título y autor.
• Cada libro en la lista debe tener un botón "Eliminar" para borrarlo de la colección.

Funcionalidad:
• Al hacer clic en el botón de añadir, el libro con su título y autor debe ser añadido a la
lista de la colección.
• Al hacer clic en el botón de "Eliminar" en un libro, dicho libro debe ser eliminado de la
lista.

Diseño y Presentación:
• La aplicación debe tener un diseño moderno y atractivo.
• Se debe considerar la experiencia del usuario al interactuar con la aplicación.
• Se pueden usar frameworks o bibliotecas de CSS como Bootstrap, Tailwind CSS, entre
otros, para mejorar la presentación.
• Se valorará positivamente la atención al detalle y la creatividad en el diseño.

Bonus:
• Implementar persistencia local utilizando localStorage para que la colección no se
pierda al recargar la página.
• Permitir marcar libros como "Leídos". Los libros marcados deben mostrarse de manera
diferente (por ejemplo, con un ícono o color diferente).
• Implementar un filtro para ver todos los libros, solo los libros leídos, o solo los libros
pendientes de leer.
