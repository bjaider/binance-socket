<h1 align="center">Bienvenido a Binance test 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> Esto es un reto para practicar un poco sobre sockets y Binance.

## Install

```sh
npm install
```

## Usage
Para ejecutar el proyecto se tiene que abrir 2 terminales y ejecutar los siguientes comandos:

```sh
##Terminal 1
cd server
npm run dev
```

```sh
##Terminal 2.
cd client
npm start
```

## Client

### Components

- ### Currency
  Es donde se encuentran las dos cards que muestran en tiempo real el valor de BTC y ETH expresados en USD, todo esto gracias a Web Socket.
- ### Quote Table
  Componente que se encarga de hacer la petición para la información de la cotización, así como tambien la de exportar la data en un CSV/JSON
  
### Helpers

- ### Axios
  Es básicamente una instancia de Axios con la URL base.
  
- ### Month Format
  Se encarga de formatear la data que viene del servidor para que pueda ser ingresada a la tabla de Next UI

### Librerias

- ### [Next UI](https://nextui.org/)
  Para que se enfocara toda la atención en la implementación de los puntos acordados en el enunciado se usó la librería de Next UI para armar un diseño del lado del cliente.
- ### [Axios](https://axios-http.com/docs/intro)
  Librería de JavaScript que puede ejecutarse en el navegador y que nos permite hacer sencillas las operaciones como cliente HTTP.
- ### [Socket IO Client](https://socket.io/docs/v4/)
  Es la libreria para implementar web socket de parte del cliente.
## Server

App.js es el archivo en donde se hacen todas las configuraciones iniciales. Todas las peticiones de Binance se hicieron gracias a la librería @binance/connector.

### Controllers

- ### Quotes
  Existe dos controladores, uno para obtener la cotización y otro en el que se puede descargar un archivo CSV/JSON con la información de la tabla de intereses acumulados.

### Middlewares

- ### Check Fields
  Este middleware retorna en la respuesta de la petición los mensajes de los checks, como por ejemplo un campo que sea requerido y no fue enviado.

### Routes

- ### Quotes
  Asigna la ruta al controlador quotesDownloadsPost y quotesPost

### Librerias

- ### [@binance/connector](https://github.com/binance/binance-connector-node)
  Librería que nos ofrece muchas funciones para hacer las peticiones al API de Binance.
- ### [Cors](https://www.npmjs.com/package/cors)
  Librería para habilitar los sitios que queremos que hagan peticiones a nuestro servidor.
- ### [Express](https://expressjs.com/)
  Es básicamente un framework para Node.js que permite estructurar una aplicación de una manera ágil, nos proporciona funcionalidades como el enrutamiento, opciones para gestionar sesiones y cookies, etc.
- ### [Dotenv](https://www.npmjs.com/package/dotenv)
  Una forma muy eficiente de manejar las variables de entorno.
- ### [Express Validator](https://express-validator.github.io/docs/)
  Es un conjunto de middlewares de express.js que envuelve las funciones de validación.
- ### [Morgan](https://www.npmjs.com/package/morgan)
  Es un Middleware de nivel de solicitud HTTP. Es una gran herramienta que registra las requests
- ### [Socket IO](https://socket.io/docs/v4/)
  Es la libreria para implementar web socket de parte del servidor.

## Author

👤 **Jaider Bermudez**

- Github: [@bjaider](https://github.com/bjaider)
