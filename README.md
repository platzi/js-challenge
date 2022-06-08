# PlatziStore

Somos comercio en línea con una gran cantidad de productos a comercializar. Estamos por lanzar nuestra implementación y necesitamos resolver los problemas que presenta nuestra aplicación.

PlatziStore tiene varios bugs, tareas sin completar y recursos a implementar para su lanzamiento oficial.

### Instalación

```
npm install
```

### Ejecución

```
npm run start
```

### Debug

http://localhost:8080/public/

### Deploy

Crea un worktree para la rama gh-pages en la carpeta dist. Elimina la carpeta si existe.
```
rm -rf ./dist
git worktree add dist gh-pages
```

Construye el proyecto; copia las carpetas public y src, y su contenido a dist.
```
npm run build
```

Ingresa a la carpeta dist
```
cd dist
```

Agrega los cambios
```
git add .
```

Realiza un commit
```
git commit -am 'Ejemplo de mensaje'
```

Sube los cambios a la rama gh-pages
```
git push origin gh-pages
```

Revisa la página: https://alula96.github.io/js-challenge/public/

**_DOCS:_** [Deploying your JS App to Github Pages the easy way (or not)](https://medium.com/linagora-engineering/deploying-your-js-app-to-github-pages-the-easy-way-or-not-1ef8c48424b7)

### Documentación

- Variable llamada $app donde haremos render de nuestra app.
- Elemento del DOM que será Observado.
- Constante 'API': Utilizamos la FakeAPI de Platzi.

```javascript
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";
```

Función llamada 'getData' que se encarga de hacer Fetch a una API y debe de construir un elemento nuevo en el DOM.

```javascript
const getData = (api) => {
  fetch(api)
    .then((response) => response.json())
    .then((response) => {
      const products = response;
    })
    .catch((error) => console.log(error));
};
```

Función encargada de obtener de los Productos.

```javascript
const loadData = () => {
  getData(API);
};
```

Intersection Observer

```javascript
const intersectionObserver = new IntersectionObserver(
  (entries) => {
    // logic...
  },
  {
    rootMargin: "0px 0px 100% 0px",
  }
);

intersectionObserver.observe($observe);
```

## RETO

### Primer problema

1. Analiza la API: fakeapi.platzi.com
2. Implementa la API de productos iniciando en el producto 5 y obteniendo los siguientes 10 productos.
3. Guarda en localStorage la posición inicial ("pagination") y actualízala en cada petición nueva para traer los siguientes productos.
4. Crear la lógica para implementar un scroll infinito con Intersection Observer.

### Segundo Problema

1. Crear la estructura de HTML para mostrar cada producto dentro de Items
2. Crear un article con la clase "Card" para contener la imagen, título y precio de un producto:

```html
<article class="Card">
  <img src="imagen.png" />
  <h2>
    Producto
    <small>$ Precio</small>
  </h2>
</article>
```

3. Index.html debe de cumplir con los elementos mínimos de SEO (title = "PlatziStore", descripcion = "...")

### Tercer Problema

Cuando cerramos la pestaña o recargamos la pagina se debe de volver a mostrar los primeros 10 Productos.

1. Mostrar los primeros 10 productos.
2. Eliminar el localStorage.
3. Actualiza la función loadData() a Async/Await.

### Cuarto Problema

La API utilizada "fakeAPI" retorna 200 productos, utilizaremos la paginación propuesta en su documentación para obtener los productos en bloques de 10, cuando la última petición sea ejecutada debes de mostrar un mensaje "Todos los productos Obtenidos", a su vez debes de destruir el intersection observer.

1. Implementar mensaje: "Todos los productos Obtenidos".
2. Deja de observar el elemento "observe".

### Quinto Problema (Bonus)

Desplegar la aplicación en alguno de los siguientes servicios: GitHub Pages, Netlify, Vercel.

### Enviar solución de reto

Debes de hacer un "Fork" de este proyecto, revolver los problemas y crear un Pull Request hacia este repositorio.

### Contribuir

Si alguien quiere agregar o mejorar algo, lo invito a colaborar directamente en este repositorio: [js-challenge](https://github.com/platzi/js-challenge/)

### Licencia

js-challenge se lanza bajo la licencia [MIT](https://opensource.org/licenses/MIT).
