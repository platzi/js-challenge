# PlatziStore: Tu Comercio en Línea 

¡Bienvenido a PlatziStore! Somos una plataforma de comercio en línea con una amplia variedad de productos esperando ser explorados. A medida que nos preparamos para nuestro lanzamiento oficial, hemos identificado varios desafíos en nuestra aplicación que necesitan ser abordados.

Desde pequeños bugs hasta tareas incompletas y nuevos recursos por implementar, estamos en busca de soluciones que garanticen una experiencia fluida para nuestros usuarios.

## Configuración Inicial

### Instalación

Para comenzar, necesitas instalar las dependencias del proyecto con el siguiente comando:

```
npm install
```

### Ejecución

Una vez que hayas instalado todo, puedes ejecutar la aplicación con:

```
npm run start
```

### Depuración

Para acceder a la interfaz de depuración, visita:

http://localhost:8080/public/

## Entendiendo la Estructura

### Documentación Básica

Aquí hay una breve descripción de algunos de los elementos clave:

- `$app`: Es la variable donde renderizaremos nuestra aplicación.
- `$observe`: Representa un elemento del DOM que será observado.
- `API`: Es una constante que utiliza la FakeAPI de Platzi para obtener datos.

```javascript
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
```

Tenemos una función llamada `getData` encargada de hacer solicitudes Fetch a una API y de construir un nuevo elemento en el DOM:

```javascript
const getData = (api) => {
  // ... 
};
```

Además, contamos con una función `loadData` que obtiene información de los productos:

```javascript
const loadData = () => {
  // ...
};
```

Y, por último, se encuentra la lógica para el Intersection Observer:

```javascript
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // ...
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
```

## Desafíos Técnicos

### Desafío 1: Integración con la API

- Estudia y analiza la estructura de la API: fakeapi.platzi.com.
- Implementa la API de productos, iniciando desde el producto 5 y obteniendo los siguientes 10 productos.
- Usa el `localStorage` para guardar la posición inicial ("pagination"). Asegúrate de actualizar esta posición con cada nueva petición para traer los siguientes productos.
- Diseña la lógica para implementar un scroll infinito utilizando el Intersection Observer.

### Desafío 2: Presentación de Productos

- Diseña una estructura HTML adecuada para mostrar cada producto.
- Crea un artículo con la clase "Card" que muestre la imagen, título y precio de un producto:

```html
<article class="Card">
  <img src="imagen.png" />
  <h2>
    Producto
    <small>$ Precio</small>
  </h2>
</article>
```

- Asegúrate de que el archivo `index.html` tenga los elementos mínimos de SEO (por ejemplo, `title = "PlatziStore"` y una descripción adecuada).

### Desafío 3: Experiencia al Recargar

Al cerrar o recargar la pestaña, es esencial que los usuarios vean los primeros 10 productos:

- Muestra los primeros 10 productos.
- Limpia el `localStorage`.
- Refactoriza la función `loadData()` para usar Async/Await.

### Desafío 4: Finalización de la Paginación

Dado que la API "fakeAPI" proporciona 200 productos, utilizaremos la paginación tal como se describe en su documentación. Al llegar al final de la lista de productos:

- Muestra el mensaje: "Todos los productos han sido obtenidos".
- Termina la observación del elemento "observe" con el Intersection Observer.

### Desafío Bono: Despliegue

¡Pon tu solución en vivo! Despliega la aplicación en uno de los siguientes servicios: GitHub Pages, Netlify o Vercel.

## Colabora con Nosotros

Si sientes que puedes aportar o mejorar algún aspecto del proyecto, ¡te animamos a hacerlo! Haz un "Fork" de este proyecto, resuelve los desafíos y envía un "Pull Request" a [js-challenge](https://github.com/platzi/js-challenge/).

## Licencia

El proyecto `js-challenge` está bajo la licencia [MIT](https://opensource.org/licenses/MIT). ¡Úsalo con confianza!
