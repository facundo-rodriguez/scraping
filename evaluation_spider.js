

const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Scrapes a given URL and loads the HTML content into Cheerio.
 * Includes basic error handling from the original script.
 *
 * @param {object} input - An object containing the input parameters.
 * @param {string} input.url - The URL to scrape.
 */
async function run(input) {

  try {

    // Check if the input object and URL are provided
    if( !input || !input.url || (input.page && input.page < 0) || (input.resultsPerPage && input.resultsPerPage < 0)){
      console.error('Error: Input object with URL is required and values must be valid.');
      return;
    }

    const url = input.url;
    console.log(`Attempting to scrape: ${url}`); // Keep this line for clarity

    //la url que me pasan en string la convierto a objeto URL, que me permite acceder a propiedades como pathname, query, etc.
    const parsedUrl = new URL(url); 
    const hostname = parsedUrl.hostname; //obtengo el hostname de la url
    

    //obtengo el pathname y lo divido por '/categoria/' y luego por '/', y lo vuelvo a unir con '|'. 
    //Esto me da la categoria en el formato que necesito para la consulta a la api.
    const categoryPath = parsedUrl.pathname.split('/categoria/')[1].split('/').join('|').toString(); 
    const category=categoryPath.split('|').at(-1); 

    const body = {
      partner: 'linx',
      page: input.page || 1,
      resultsPerPage: input.resultsPerPage || 1,
      multiCategory: categoryPath  || 'alimentos|doces-e-sobremesas|bomboniere' , 
      sortBy: 'relevance',
      department: 'ecom',
      storeId: 483,
      customerPlus: true,
    };

    const headers = {
      'accept': 'application/json, text/plain, */*',
      'content-type': 'application/json',
      'referer': 'https://www.extramercado.com.br/',
    };

    const url_api= 'https://api.vendas.gpa.digital/ex/search/category-page';

    const response = await axios.post(url_api, body,headers)
    const {products} = response.data;
  
    products.forEach((product) => {
      
      product.productImages= product.productImages.map((image) =>hostname+image);

      const prod = {  
        name: product.name,
        price: product.price,
        image: product.productImages,
        url: product.urlDetails,
        category: category
      };
      console.log(prod);
    
    });
    

  } catch (error) {
    //Simple error handling as in the original script
    console.error('Error during scraping:', error.message);
  }
}


const scrapingInput = {
  url: 'https://www.extramercado.com.br/categoria/alimentos/doces-e-sobremesas/bomboniere', 
  
  page: 1, // número de páginas
  resultsPerPage: 1 // número de productos por página
};

run(scrapingInput)



