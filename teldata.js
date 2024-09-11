
const axios = require('axios');

const API_KEY = 'c2023659d43ecb2d23519e63db05462e';
const BASE_URL = 'http://apilayer.net/api/validate';

// Mostrar el título en ASCII art
const title = `
  _____    _     _       _        
 |_   _|__| | __| | __ _| |_ __ _ 
   | |/ _ \\ |/ _\` |/ _\` | __/ _\` |
   | |  __/ | (_| | (_| | || (_| |
   |_|\___|_|\__,_|\__,_|\__\__,_|
`;

console.log(title);

// Obtener el número de teléfono y el código de país desde la línea de comandos
const numeroTelefono = process.argv[2];
const countryCode = process.argv[3] || ''; // Permitir que el usuario ingrese el código de país

// Validar la entrada del número de teléfono
if (!numeroTelefono) {
    console.log('Uso: node teldata.js <numero_de_telefono> [código_de_país]');
    process.exit(1);
}

// Validar el formato del número de teléfono
const phoneRegex = /^\d+$/;
if (!phoneRegex.test(numeroTelefono)) {
    console.log('Número de teléfono inválido. Asegúrate de que solo contenga dígitos.');
    process.exit(1);
}

// Construir la URL de la solicitud
const url = `${BASE_URL}?access_key=${API_KEY}&number=${numeroTelefono}&country_code=${countryCode}&format=1`;

// Realizar la solicitud a la API
axios.get(url)
    .then(response => {
        if (response.data.valid) {
            console.log('Información del número de teléfono:');
            console.log(`Número: ${response.data.number}`);
            console.log(`Código de país: ${response.data.country_code}`);
            console.log(`Tipo: ${response.data.line_type}`);
            console.log(`Operador: ${response.data.carrier}`);
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