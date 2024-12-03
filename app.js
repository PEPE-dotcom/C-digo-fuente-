const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot');
const QRPortalWeb = require('@bot-whatsapp/portal');
const BaileysProvider = require('@bot-whatsapp/provider/baileys');
const MockAdapter = require('@bot-whatsapp/database/mock');

// Flujo para mostrar el catálogo de repuestos
const flow2 = addKeyword(['2', 'repuestos', 'catalogo de repuestos']).addAnswer(
    [
        'Este es nuestro catálogo de repuestos. 📄',
        'Por favor, revisa el archivo adjunto.',
    ],
    {
        media: 'https://drive.google.com/uc?export=download&id=1CJHotwOQd6Aqb6gy6kEpgVFrd6QWG6Ja', // Ruta al archivo PDF de repuestos
    }
);

// Flujo para mostrar el catálogo de motos
const flow1 = addKeyword(['1', 'motos', 'catalogo de motos']).addAnswer(
    [
        'Este es nuestro catálogo de motos. 📄',
        'Por favor, revisa el archivo adjunto.',
    ],
    {
        media: 'https://drive.google.com/uc?export=download&id=1BZ7wmQeLAnFocOEfctMscfuFPurYey4m', // Ruta al archivo PDF de motos
    }
);

// Flujo para mostrar el enlace de Google Maps con la ubicación
const flow3 = addKeyword(['3', 'ubicación', 'donde estamos']).addAnswer(
    [
        'Puedes encontrarnos en la siguiente ubicación de Google Maps: 📍',
        '👉 [Ver en Google Maps](https://maps.app.goo.gl/MvcHo4yXGwSZbEjx9)', // Asegúrate de cambiar la URL de Google Maps
    ]
);

// Flujo para proporcionar el número de contacto de un asesor
const flow4 = addKeyword(['4', 'asesor', 'hablar con asesor']).addAnswer(
    [
        'Si necesitas hablar con un asesor, puedes llamarnos o enviarnos un mensaje a nuestro número de WhatsApp: 📞',
        '👉 💬[Hablar con asesor](https://wa.me/964341276)', // Asegúrate de cambiar el número de teléfono por el real
    ]
);

const flow5 = addKeyword(['5', 'fb', 'página']).addAnswer(
    [
        'Visita nuestra página de Facebook aquí: 🌐',
        '👉 [Consorcio Bardales](https://www.facebook.com/ConsorcioBardales?mibextid=ZbWKwL)', // Asegúrate de cambiar la URL de Google Maps
    ]
);

const flow6 = addKeyword(['6', 'atencion', 'horario']).addAnswer(
    [
       '⏱️ Nuestro horario de atención es de lunes a viernes de 8:00 AM a 6:00 PM y sábados de 9:00 AM a 1:00 PM.'
    ]
);

// Flujo para regresar al menú principal
const flowVolver = addKeyword(['menu', 'volver', 'opciones', 'inicio']).addAnswer(
    [
        '¿En qué mas puedo ayudarte hoy?',
        '👉 *1* 🏍️ Ver nuestras motos disponibles.',
        '👉 *2* ⚙️ Explorar repuestos y accesorios.',
        '👉 *3* 📍 Ver nuestra ubicación en Google Maps.',
        '👉 *4* 💬 Hablar con un asesor.',
        '👉 *5* 🌐 Visitar nuestra página de Facebook.',
        '👉 *6* ⏱️ Consultar nuestro horario de atención.',
        'Escribe el número correspondiente o la palabra *menu* para regresar al inicio en cualquier momento. 📲',
    ],
    null,
    null,
    [flow1, flow2, flow3, flow4, flow5, flow6] // Conectar todos los flujos
);

// Define el flujo principal
const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🏍️ Bienvenido a *Consorcio Bardales*, la mejor tienda de repuestos y motos de todo Tarma.')
    .addAnswer(
        [
            '¿En qué puedo ayudarte hoy?',
            '👉 *1* 🏍️ Ver nuestras motos disponibles.',
            '👉 *2* ⚙️ Explorar repuestos y accesorios.',
            '👉 *3* 📍 Ver nuestra ubicación en Google Maps.',
            '👉 *4* 💬 Hablar con un asesor.',
            '👉 *5* 🌐 Visitar nuestra página de Facebook.',
            '👉 *6* ⏱️ Consultar nuestro horario de atención.',
            'Escribe el número correspondiente o la palabra *menu* para regresar al inicio en cualquier momento. 📲',
        ],
        null,
        null,
        [flow1, flow2, flow3, flow4, flow5, flow6] // Conectar el flujo del catálogo
    );

// Función principal para inicializar el bot
const main = async () => {
    const adapterDB = new MockAdapter(); // Adaptador de base de datos en memoria
    const adapterFlow = createFlow([flowPrincipal, flowVolver]); // Flujo principal y flujo de vuelta al menú
    const adapterProvider = createProvider(BaileysProvider); // Proveedor de WhatsApp

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb(); // Generar QR para conectarse
};

main();
