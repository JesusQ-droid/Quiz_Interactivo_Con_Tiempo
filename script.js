// Lista de preguntas
const preguntas = [
    {
        pregunta: "¿Cuál es la capital de Venezuela?",
        opciones: ["Madrid", "Caracas", "Miranda", "Bógota"],
        respuesta: "Caracas"
    },
    {
        pregunta: "¿Cuánto es 5 x 6?",
        opciones: ["11", "30", "56", "20"],
        respuesta: "30"
    },
    {
        pregunta: "¿Qué Lenguaje Utiliza la Extensión .py?",
        opciones: ["Java", "C++", "Python", "HTML"],
        respuesta: "Python"
    },
    {
        pregunta: "¿Cuántos Estados tiene Venezuela?",
        opciones: ["18", "24", "30", "27"],
        respuesta: "24"
    },
    {
        pregunta: "¿Un Software es...?",
        opciones: ["La parte física de una computadora", "La unidad central de procesamiento", "El conjunto de programas, instrucciones y técnicas del sistema operativo", "Una memoria de solo lectura"],
        respuesta: "El conjunto de programas, instrucciones y técnicas del sistema operativo"
    },
    {
        pregunta: "¿Qué son los Dispositivos de Entrada?",
        opciones: ["Dispositivos Mixtos (Memoria USB)", "Introducen datos al computador (Mouse, Teclado)", "Muestran información (Monitor, Impresora)", "El componente de Almacenamiento"],
        respuesta: "Introducen datos al computador (Mouse, Teclado)"
    },
    {
        pregunta: "¿Qué se Puede Hacer con la Manipulación de Archivos de Datos?",
        opciones: ["Alterar intencionalmente variables independientes para observar sus efectos sobre otras", "Transformar, limpiar y organizar datos crudos para facilitar su análisis", "Cambiar datos entre sí, alterando su funcionamiento", "Leer frecuencias y almacenar datos"],
        respuesta: "Transformar, limpiar y organizar datos crudos para facilitar su análisis"
    },
    {
        pregunta: "La derivada de un número entero (1, 2, 3, etc...) es...",
        opciones: ["¿Su... derivada?", "El mismo número", "La multiplicación del mismo por 2", "0"],
        respuesta: "0"
    },
    {
        pregunta: "¿Qué Extensión de Archivos Pertenece a .txt?",
        opciones: ["Bloc de Notas", "Microsoft Word", "Excel", "Python"],
        respuesta: "Bloc de Notas"
    },
    {
        pregunta: "¿Qué Sistema Operativo Utiliza un Pinguino como Representación?",
        opciones: ["Mac", "Linux", "Windows", "Android"],
        respuesta: "Linux"
    },
    {
        pregunta: "¿Comó se Llama el Tipo de Almacenamiento que Guarda Datos, Archivos y Aplicaciones en un Equipo?",
        opciones: ["ROM", "Caché", "SSD/HDD", "CPU"],
        respuesta: "SSD/HDD"
    },
    {
        pregunta: "La Manipulación de Archivos de Datos Actúa Desde...",
        opciones: ["El Sistema Operativo", "El Sistema de Archivos", "La aplicación que ejecuta", "Una página web"],
        respuesta: "El Sistema Operativo"
    }
];

// Variables globales
let puntos = 0;
let indicePregunta = 0;
let tiempo = 10; // segundos
let temporizadorId;

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    if(indicePregunta >= preguntas.length){
        document.getElementById('pregunta').innerText = "🏁 Quiz Finalizado";
        document.getElementById('opciones').innerHTML = "";
        document.getElementById('temporizador').innerText = `Puntuación final: ${puntos}/${preguntas.length}`;
        return;
    }

    const q = preguntas[indicePregunta];
    document.getElementById('pregunta').innerText = q.pregunta;

    const opcionesDiv = document.getElementById('opciones');
    opcionesDiv.innerHTML = "";
    q.opciones.sort(() => Math.random() - 0.5); // mezclar opciones

    q.opciones.forEach(opcion => {
        const btn = document.createElement('button');
        btn.innerText = opcion;
        btn.onclick = () => verificarRespuesta(opcion);
        opcionesDiv.appendChild(btn);
    });

    tiempo = 10;
    document.getElementById('temporizador').innerText = `Tiempo: ${tiempo}s`;

    clearInterval(temporizadorId);
    temporizadorId = setInterval(() => {
        tiempo--;
        document.getElementById('temporizador').innerText = `Tiempo: ${tiempo}s`;
        if(tiempo <= 0){
            clearInterval(temporizadorId);
            document.getElementById('resultado').innerText = `⏰ Tiempo agotado. La respuesta correcta era: ${q.respuesta}`;
            setTimeout(() => {
                document.getElementById('resultado').innerText = "";
                indicePregunta++;
                mostrarPregunta();
            }, 2000);
        }
    }, 1000);
}

// Función para verificar respuesta
function verificarRespuesta(opcionElegida){
    clearInterval(temporizadorId);
    const q = preguntas[indicePregunta];
    if(opcionElegida === q.respuesta){
        puntos++;
        document.getElementById('resultado').innerText = "✅ Correcto!";
    } else {
        document.getElementById('resultado').innerText = `❌ Incorrecto. La respuesta correcta era: ${q.respuesta}`;
    }

    setTimeout(() => {
        document.getElementById('resultado').innerText = "";
        indicePregunta++;
        mostrarPregunta();
    }, 2000);
}

// Iniciar quiz al cargar página
window.onload = mostrarPregunta;
