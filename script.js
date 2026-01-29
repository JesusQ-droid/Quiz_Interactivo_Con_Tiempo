document.addEventListener("DOMContentLoaded", () => {

    let audioHabilitado = false;
    let puntos = 0;
    let indicePregunta = 0;
    let tiempo = 12;
    let temporizadorId;

    const btnIniciar = document.getElementById("btnIniciar");
    const restartBtn = document.getElementById("restartBtn");
    const resultadoDiv = document.getElementById("resultado");
    const temp = document.getElementById("temporizador");

    const preguntas = [
    {
        pregunta: "¿Cuál es la capital de Venezuela?",
        opciones: ["Madrid", "Caracas", "Miranda", "Bógota"],
        respuesta: "Caracas",
        imagen: "imagenes/venezuela.jpg"
    },
    {
        pregunta: "¿Cuánto es 7 x 9?",
        opciones: ["11", "30", "63", "20"],
        respuesta: "63",
        imagen: "imagenes/multiplicacion.jpg"
    },
    {
        pregunta: "¿Qué Lenguaje Utiliza la Extensión .py?",
        opciones: ["Java", "C++", "Python", "HTML"],
        respuesta: "Python",
        imagen: "imagenes/archivocomputadora1.jpg"
    },
    {
        pregunta: "¿Cuántos Estados tiene Venezuela?",
        opciones: ["18", "24", "30", "27"],
        respuesta: "24",
        imagen: "imagenes/mapavenezuela.jpg"
    },
    {
        pregunta: "¿Un Software es...?",
        opciones: ["La parte física de una computadora", "La unidad central de procesamiento", "El conjunto de programas, instrucciones y técnicas del sistema operativo", "Una memoria de solo lectura"],
        respuesta: "El conjunto de programas, instrucciones y técnicas del sistema operativo",
        imagen: "imagenes/software.jpg"
    },
    {
        pregunta: "¿Qué son los Dispositivos de Entrada?",
        opciones: ["Dispositivos Mixtos (Memoria USB)", "Introducen datos al computador (Mouse, Teclado)", "Muestran información (Monitor, Impresora)", "El componente de Almacenamiento"],
        respuesta: "Introducen datos al computador (Mouse, Teclado)",
        imagen: "imagenes/dispositivos.jpg"
    },
    {
        pregunta: "¿Qué se Puede Hacer con la Manipulación de Archivos de Datos?",
        opciones: ["Alterar intencionalmente variables independientes para observar sus efectos sobre otras", "Transformar, limpiar y organizar datos crudos para facilitar su análisis", "Cambiar datos entre sí, alterando su funcionamiento", "Leer frecuencias y almacenar datos"],
        respuesta: "Transformar, limpiar y organizar datos crudos para facilitar su análisis",
        imagen: "imagenes/manipulaciondearchivodedatos1.jpg"
    },
    {
        pregunta: "La derivada de un número entero (1, 2, 3, etc...) es...",
        opciones: ["¿Su... derivada?", "El mismo número", "La multiplicación del mismo por 2", "0"],
        respuesta: "0",
        imagen: "imagenes/derivada.jpg"
    },
    {
        pregunta: "¿Qué Extensión de Archivos Pertenece a .txt?",
        opciones: ["Bloc de Notas", "Microsoft Word", "Excel", "Python"],
        respuesta: "Bloc de Notas",
        imagen: "imagenes/archivocomputadora2.jpg"
    },
    {
        pregunta: "¿Qué Sistema Operativo Utiliza un Pinguino como Representación?",
        opciones: ["Mac", "Linux", "Windows", "Android"],
        respuesta: "Linux",
        imagen: "imagenes/sistemaoperativo.jpg"
    },
    {
        pregunta: "¿Comó se Llama el Tipo de Almacenamiento que Guarda Datos, Archivos y Aplicaciones en un Equipo?",
        opciones: ["ROM", "Caché", "SSD/HDD", "CPU"],
        respuesta: "SSD/HDD",
        imagen: "imagenes/almacenamientocomputadora.jpg"
    },
    {
        pregunta: "La Manipulación de Archivos de Datos Actúa Desde...",
        opciones: ["El Sistema Operativo", "El Sistema de Archivos", "La aplicación que ejecuta", "Una página web"],
        respuesta: "El Sistema Operativo",
        imagen: "imagenes/manipulaciondearchivodedatos2.jpg"
    }
];

    function mezclarPreguntas() {
        preguntas.sort(() => Math.random() - 0.5);
    }

    function mostrarPregunta() {
        if (indicePregunta >= preguntas.length) {
            document.getElementById('pregunta').innerText = "🏁 Quiz Finalizado";
            document.getElementById('opciones').innerHTML = "";
            temp.innerText = `Puntuación final: ${puntos}/${preguntas.length}`;
            restartBtn.style.display = "block";
            return;
        }

        const q = preguntas[indicePregunta];

        document.getElementById("progreso").style.width =
            ((indicePregunta + 1) / preguntas.length) * 100 + "%";
        document.getElementById('pregunta').innerText = q.pregunta;

        const img = document.getElementById("imagen-pregunta");
        if (q.imagen) {
            img.src = q.imagen;
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }

        const opcionesDiv = document.getElementById('opciones');
        opcionesDiv.innerHTML = "";
        q.opciones.sort(() => Math.random() - 0.5);

        q.opciones.forEach(opcion => {
            const btn = document.createElement('button');
            btn.innerText = opcion;
            btn.dataset.correct = opcion === q.respuesta;

            btn.onclick = () => {
                document.querySelectorAll('#opciones button').forEach(b => b.disabled = true);
                verificarRespuesta(opcion);
            };

            opcionesDiv.appendChild(btn);
        });

        tiempo = 12;
        temp.innerText = `Tiempo: ${tiempo}s`;
        temp.className = "tiempo-verde";

        clearInterval(temporizadorId);
        temporizadorId = setInterval(() => {
            tiempo--;
            temp.innerText = `Tiempo: ${tiempo}s`;

            if (tiempo <= 5 && tiempo > 0 && audioHabilitado) {
                const sonido = document.getElementById("sonido-tic");
                if (sonido) {
                    sonido.currentTime = 0;
                    sonido.play();
                }
                temp.className = tiempo <= 3 ? "tiempo-rojo temporizador-animado" : "tiempo-amarillo temporizador-animado";
            } else {
                temp.classList.remove("temporizador-animado");
            }

            if (tiempo <= 0) {
                clearInterval(temporizadorId);
                verificarRespuesta(null);
            }
        }, 1000);
    }

    function verificarRespuesta(opcionElegida) {
        clearInterval(temporizadorId);
        const q = preguntas[indicePregunta];
        document.querySelectorAll('#opciones button').forEach(btn => {
            btn.classList.toggle("correcta", btn.innerText === q.respuesta);
            btn.classList.toggle("incorrecta", btn.innerText !== q.respuesta);
        });

       resultadoDiv.classList.remove("correcto", "incorrecto"); // limpiar clases previas

if(opcionElegida === q.respuesta){
    resultadoDiv.innerText = "✅ Correcto!";
    resultadoDiv.classList.add("correcto");
} else if(opcionElegida === null){
    resultadoDiv.innerText = `⏱ Tiempo agotado. La respuesta correcta era: ${q.respuesta}`;
    resultadoDiv.classList.add("incorrecto");
} else {
    resultadoDiv.innerText = `❌ Incorrecto. La respuesta correcta era: ${q.respuesta}`;
    resultadoDiv.classList.add("incorrecto");
}

        const sonidoId = opcionElegida === q.respuesta ? "sonido-correcto" : "sonido-incorrecto";
        const sonido = document.getElementById(sonidoId);
        if (sonido) {
            sonido.currentTime = 0;
            sonido.play();
        }

        setTimeout(() => {
            resultadoDiv.innerText = "";
            indicePregunta++;
            mostrarPregunta();
        }, 2000);
    }

    btnIniciar.addEventListener("click", () => {
        mezclarPreguntas();

        const sonido = document.getElementById("sonido-tic");
        if (sonido) {
            sonido.play().then(() => {
                sonido.pause();
                sonido.currentTime = 0;
                audioHabilitado = true;
            });
        }

        btnIniciar.style.display = "none";
        mostrarPregunta();
    });

    restartBtn.addEventListener("click", () => {
        puntos = 0;
        indicePregunta = 0;
        tiempo = 12;

        mezclarPreguntas();
        restartBtn.style.display = "none";
        resultadoDiv.innerText = "";

        mostrarPregunta();
    });
});
