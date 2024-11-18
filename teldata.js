const axios = require('axios');
const readline = require('readline');

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

const messages = {
    es: {
        chooseLanguage: 'Elige tu idioma:\n1. Español\n2. Inglés',
        askNumber: 'Por favor, ingresa el número de teléfono (con el prefijo "+"): ',
        invalidNumber: 'Número de teléfono inválido. Asegúrate de que contenga el prefijo "+" seguido de dígitos.',
        invalidOption: 'Opción no válida. Inténtalo de nuevo.',
        phoneInfo: 'Información del número de teléfono:',
        notFound: 'Número de teléfono no válido o no encontrado.',
    },
    en: {
        chooseLanguage: 'Choose your language:\n1. Spanish\n2. English',
        askNumber: 'Please enter the phone number (with the prefix "+"): ',
        invalidNumber: 'Invalid phone number. Make sure it starts with "+" followed by digits.',
        invalidOption: 'Invalid option. Please try again.',
        phoneInfo: 'Phone number information:',
        notFound: 'Phone number not valid or not found.',
    }
};

let lang = 'en';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const chooseLanguage = () => {
    rl.question(messages[lang].chooseLanguage + '\n', (option) => {
        if (option === '1') {
            lang = 'es';
        } else if (option === '2') {
            lang = 'en';
        } else {
            console.log(messages[lang].invalidOption);
            chooseLanguage();
            return;
        }
        console.log(title);
        askPhoneNumber();
    });
};

const askPhoneNumber = () => {
    rl.question(messages[lang].askNumber, (numeroTelefono) => {
        const phoneRegex = /^\+\d+$/;
        if (!phoneRegex.test(numeroTelefono)) {
            console.log(messages[lang].invalidNumber);
            askPhoneNumber();
            return;
        }

        const url = `${BASE_URL}/${numeroTelefono}?apikey=${API_KEY}`;

        axios.get(url)
            .then(response => {
                const data = response.data;
                if (data.valid) {
                    console.log(messages[lang].phoneInfo);
                    console.log(`Número: ${data.intl_format}`);
                    console.log(`Formato local: ${data.local_format}`);
                    console.log(`Nombre del país: ${data.country_name}`);
                    console.log(`Código de país: ${data.country_code}`);
                    console.log(`Tipo: ${data.line_type}`);
                    console.log(`Operador: ${data.carrier}`);
                    console.log(`Ubicación: ${data.location}`);
                    rl.close();
                } else {
                    console.log(messages[lang].notFound);
                    askPhoneNumber();
                }
            })
            .catch(error => {
                console.error('Error al realizar la solicitud:', error.message);
                askPhoneNumber();
            });
    });
};

chooseLanguage();
