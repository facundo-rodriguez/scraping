## 🎯 Objetivo

Desarrollar un script que scrapee productos de una categoría específica del sitio https://www.extramercado.com.br, permitiendo controlar el volumen de scraping mediante parámetros personalizados:

- Número de productos a scrapear (`resultsPerPage`)
- Número de páginas a recorrer (`page`)

## 🧪 Tecnologías Utilizadas

- [Node.js](https://nodejs.org/)
- [Axios](https://www.npmjs.com/package/axios)
- [Cheerio](https://www.npmjs.com/package/cheerio)

## 📦 Datos extraídos por producto

- 🏷️ Nombre del producto  
- 💲 Precio  
- 🌐 URL del producto  
- 🖼️ URL de la imagen  
- 🗂️ Categoría

## 🛠️ Instalación y Ejecución

### Requisitos previos

- Tener instalado [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/)

### Pasos

```bash
git clone https://github.com/tu_usuario/tu_repositorio.git
cd tu_repositorio
npm install
node evaluation_spider.js
```

⚙️ Configuración
Configurá el input dentro del archivo evaluation_spider.js:

```
const scrapingInput = {
  url: 'https://www.extramercado.com.br/categoria/alimentos/doces-e-sobremesas/bomboniere',
  page: 1,              // Número de página a scrapear
  resultsPerPage: 12    // Cantidad de productos por página
};
```

📤 Salida
Por cada producto, el script imprimirá algo como esto en consola:
```
{
  "name": "Bala Mentos 38g",
  "price": 2.99,
  "image": ["https://www.extramercado.com.br/imagem1.jpg"],
  "url": "/produto/bala-mentos-38g",
  "category": "bomboniere"
}
```
📁 Estructura del Proyecto
```
.
├── evaluation_spider.js      # Script principal
├── package.json              # Dependencias
├── package-lock.json
└── README.md                 # Este archivo
```

✅ Notas adicionales:

-El sitio web carga los poductos dinamicamente, por lo que no pude usar cheerio para hacer el scarping :/. 
Buscando dentro del sitio encontre la api de donde se obtiene la informacion, y fue lo que use.

-El script utiliza una API interna del sitio para obtener los productos.

-La categoría se extrae dinámicamente a partir de la URL provista.

-Se incluye validación de entradas y manejo básico de errores.
