const axios = require('axios');


const API_KEY = 'num_live_ZAdVEWCqEn8coW65E3HaMAO9jkZsTq91fKB28U8U';
const BASE_URL = 'https://api.numlookupapi.com/v1/validate';


const title = `
╔██████═╗██████═╗██╗     ██████╗  █████╗ ████████╗ █████╗ 
╚══██╔══╝██╔════╝██║     ██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗
   ██║   █████╗  ██║     ██║  ██║███████║   ██║   ███████║
   ██║   ██╔══╝  ██║     ██║  ██║██╔══██║   ██║   ██╔══██║
   ██║   ███████╗███████╗██████╔╝██║  ██║   ██║   ██║  ██║
   ╚═╝   ╚══════╝╚══════╝╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝
`;

console.log(title);


const numeroTelefono = process.argv[2];


if (!numeroTelefono) {
    console.log('Uso: node teldata.js <numero_de_telefono>');
    process.exit(1);
}


const phoneRegex = /^\+\d+$/; 
if (!phoneRegex.test(numeroTelefono)) {
    console.log('Número de teléfono inválido. Asegúrate de que contenga el prefijo "+" seguido de dígitos.');
    process.exit(1);
}

// Constru
const url = `${BASE_URL}/${numeroTelefono}?apikey=${API_KEY}`;

// Realiza
axios.get(url)
    .then(response => {
        const data = response.data;
        if (data.valid) {
            console.log('Información del número de teléfono:');
            console.log(`Número: ${data.intl_format}`);
            console.log(`Formato local: ${data.local_format}`);
            console.log(`Nombre del país: ${data.country_name}`);
            console.log(`Código de país: ${data.country_code}`);
            console.log(`Tipo: ${data.line_type}`);
            console.log(`Operador: ${data.carrier}`);
            console.log(`Ubicación: ${data.location}`);
        } else {
            console.log('Número de teléfono no válido o no encontrado.');
        }
    })
    .catch(error => {
        if (error.response) {
            console.error('Error en la respuesta de la API:', error.response.data);
        } else if (error.request) {
            console.error('No se recibió respuesta de la API:', error.request);
        } else {
            console.error('Error al realizar la solicitud:', error.message);
        }
    });
