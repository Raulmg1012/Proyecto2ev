//Constantes
const { jsPDF } = window.jspdf
const panelBienvenida = document.getElementById("panelBienvenida")
const btnComenzar = document.getElementById("btnComenzar")
const panelCrear = document.getElementById("panelCrear")
const listaArchivos = document.getElementById("listaArchivos")
const btnCrearArchivo = document.getElementById("btnCrearArchivo")
const panelFormularioArchivo = document.getElementById("panelFormularioArchivo")
const nombre = document.getElementById("nombre")
const titulo = document.getElementById("titulo")
const descripcion = document.getElementById("descripcion")
const crearArchivo = document.getElementById("crearArchivo")
const exportarPDF = document.getElementById("exportarPDF")
const exportarTXT = document.getElementById("exportarTXT")
const plantillas = document.getElementById("plantillas")
const listaPlantillas = document.getElementById("listaPlantillas")
const selectPlantilla = document.getElementById("selectPlantilla")
const btnVolver = document.getElementById("btnVolver")
const btnBold = document.getElementById("btnBold")
const btnUnderline = document.getElementById("btnUnderline")
const btnItalic = document.getElementById("btnItalic")
let arrayArchivos = JSON.parse(localStorage.getItem("arrayArchivos")) || []
let archivoEdicion = null
//Texto de las plantillas
const plantillasTexto = {
    curriculum: `Nombre: [Tu nombre aquí]
Email: [Tu correo aquí]
Teléfono: [Tu número aquí]

Experiencia Laboral:
- [Trabajo 1: Descripción breve]
- [Trabajo 2: Descripción breve]

Educación:
- [Título académico: Nombre de la institución]

Habilidades:
- [Habilidad 1]
- [Habilidad 2]`,

    cartaPresentacion: `Estimado/a [Nombre del destinatario],

Me dirijo a usted con el fin de expresar mi interés en [posición o asunto].
Considero que mi experiencia en [campo o área] me hace un candidato/a ideal.

Gracias por considerar mi solicitud.
Atentamente,
[Tu nombre aquí]`,

    cartaFormal: `Estimado/a [Nombre del destinatario],

Le escribo para informarle sobre [asunto]. 
Agradezco de antemano su atención.

Saludos cordiales,
[Tu nombre aquí]`,

    reporte: `Título del Reporte: [Título aquí]

Introducción:
[Introducción aquí]

Desarrollo:
[Puntos principales aquí]

Conclusión:
[Conclusión aquí]`,

    articuloBlog: `Título del Artículo: [Título aquí]

Introducción:
[Introducción breve]

Desarrollo:
[Contenido principal]

Conclusión:
[Resumen o llamada a la acción]`,

    redaccion: `Título: [Título aquí]

Introducción:
[Introducción aquí]

Desarrollo:
[Desarrollo del tema]

Conclusión:
[Conclusión o reflexión final]`,

    contratoBasico: `CONTRATO

Entre [Nombre de la parte 1] y [Nombre de la parte 2].

Se acuerda lo siguiente:
- [Condiciones]

Firmado:
[Nombre y Firma]`,

    listaTareas: `Lista de Tareas:
- [Tarea 1]
- [Tarea 2]
- [Tarea 3]`,

    invitacion: `¡Estás invitado/a!

Evento: [Nombre del evento]
Fecha: [Fecha aquí]
Hora: [Hora aquí]
Lugar: [Lugar aquí]

¡Esperamos verte allí!`,

    guion: `Guion para [Evento o Tema]

[Escena 1: Descripción y diálogo]
[Escena 2: Descripción y diálogo]`,

    planProyecto: `Título del Proyecto: [Título aquí]

Objetivos:
- [Objetivo 1]
- [Objetivo 2]

Actividades:
- [Actividad 1]
- [Actividad 2]

Responsables:
- [Nombre de los responsables]`,

    discurso: `Discurso para [Ocasión]

[Introducción]

[Desarrollo del discurso]

[Conclusión o agradecimientos]`,

    actaReunion: `ACTA DE REUNIÓN

Fecha: [Fecha de la reunión]
Asistentes: [Nombres]

Temas tratados:
- [Tema 1]
- [Tema 2]

Acuerdos:
- [Acuerdo 1]
- [Acuerdo 2]`,

    emailProfesional: `Asunto: [Asunto del correo]

Estimado/a [Nombre del destinatario],

Espero que este mensaje le encuentre bien.
[Contenido del mensaje]

Quedo atento/a a su respuesta.
Atentamente,
[Tu nombre aquí]`
}


//Al iniciar la página carga los datos del localStorage
document.addEventListener("DOMContentLoaded",(e)=>{
    e.preventDefault()
    listaArchivos.innerHTML = ""
    listaPlantillas.style.display = "none"
    arrayArchivos.forEach((el,i)=>{
        const elemento = document.createElement("button")
        elemento.innerHTML = `<p>Archivo ${i+1}</p>
        <p>Titulo:${el.titulo}</p>
        <button class="btnEliminar">Eliminar</button>`
        elemento.addEventListener("click",()=>cargarArchivo(el,i))
        elemento.querySelector(".btnEliminar").addEventListener("click",(e)=>{
            e.stopImmediatePropagation()
            eliminarArchivo(i)
        })
        listaArchivos.append(elemento)
    })

})

//Acción del botón comenzar que muestra los demás paneles
btnComenzar.addEventListener("click",(e)=>{
    e.preventDefault()
    panelCrear.hidden = false
    panelBienvenida.hidden = true
    listaArchivos.hidden = false
})

//Acción del botón volver que esconde el formulario
btnVolver.addEventListener("click",()=>{
    listaArchivos.hidden = false
    btnCrearArchivo.hidden = false
    panelFormularioArchivo.hidden = true
    listaPlantillas.hidden = true
})

//Acción del botón crear nuevo archivo que muestra el formulario
btnCrearArchivo.addEventListener("click",(e)=>{
    e.preventDefault()
    listaArchivos.hidden = true
    btnCrearArchivo.hidden = true
    panelFormularioArchivo.hidden = false
    exportarPDF.hidden = true
    exportarTXT.hidden = true
    nombre.value = ""
    titulo.value = ""
    descripcion.innerHTML = ""
    crearArchivo.textContent = "Crear Archivo"
    plantillas.textContent = "Mostrar Plantillas"
    listaPlantillas.style.display = "none"
    archivoEdicion = null
})

//Botón que crea el archivo y lo guarda en el localStorage
crearArchivo.addEventListener("click",(e)=>{
    e.preventDefault()
    
    const objeto = {
        nombre: nombre.value,
        titulo: titulo.value,
        descripcion: descripcion.innerHTML
    }
    if(archivoEdicion !== null) {
        arrayArchivos[archivoEdicion] = objeto
    } else {
    arrayArchivos.push(objeto)    
    }
    
    localStorage.setItem("arrayArchivos",JSON.stringify(arrayArchivos))
    nombre.value = ""
    titulo.value = ""
    descripcion.value = ""
    listaArchivos.innerHTML = ""

    arrayArchivos.forEach((el,i)=>{
        const elemento = document.createElement("button")
        elemento.innerHTML = `<p>Archivo ${i+1}</p>
        <p>Titulo:${el.titulo}</p>
        <button class="btnEliminar">Eliminar</button>`
        elemento.addEventListener("click",()=>cargarArchivo(el,i))
        elemento.querySelector(".btnEliminar").addEventListener("click",(e)=>{
            e.stopImmediatePropagation()
            eliminarArchivo(i)
        })
        listaArchivos.append(elemento)
    })
    btnCrearArchivo.hidden = false
    listaArchivos.hidden = false
    panelFormularioArchivo.hidden = true
    listaPlantillas.style.display = "none"
    crearArchivo.textContent = "Crear Archivo"
    archivoEdicion = null

})

//Botón para crear el PDF
exportarPDF.addEventListener("click",(e)=>{
    e.preventDefault()
    crearPDF()
})

//Botón para crear el TXT
exportarTXT.addEventListener("click",(e)=>{
    e.preventDefault()
    crearTXT()
})

//Botón que muestra el select de las plantillas
plantillas.addEventListener("click",(e)=>{
    e.preventDefault()
    listaPlantillas.hidden = false
   const isHidden = listaPlantillas.style.display === "none" || listaPlantillas.style.display === ""
   listaPlantillas.style.display = isHidden ? "block" : "none"
   plantillas.textContent = isHidden ? "Cerrar Plantillas" : "Mostrar Plantillas"
   selectPlantilla.style.display = "block"
})

//Botón que escribe la plantilla elegida
selectPlantilla.addEventListener("change", (e) => {
    const plantillaSeleccionada = e.target.value;
    if (plantillaSeleccionada in plantillasTexto) {
        //Reemplaza los saltos de línea con <br> para que se conserven los párrafos
        descripcion.innerHTML = plantillasTexto[plantillaSeleccionada].replace(/\n/g, "<br>");
    } else {
        descripcion.innerHTML = "";
    }
});

//Botones de negrita, cursiva y subrayado
btnBold.addEventListener("click",()=> formatText("bold"))
btnUnderline.addEventListener("click",()=> formatText("underline"))
btnItalic.addEventListener("click",()=> formatText("italic"))

//Función que sirve para cargar un archivo
function cargarArchivo(archivo,i) {
    nombre.value = archivo.nombre
    titulo.value = archivo.titulo
    descripcion.innerHTML = archivo.descripcion
    crearArchivo.textContent = "Guardar Cambios"
    archivoEdicion = i
    listaArchivos.hidden = true
    btnCrearArchivo.hidden = true
    panelFormularioArchivo.hidden = false
    exportarPDF.hidden = false
    exportarTXT.hidden = false
    listaPlantillas.style.display = "none"
    plantillas.textContent = "Mostrar Plantillas"
}

//Función que sirve para eliminar un archivo
function eliminarArchivo(i) {
    const confirmar = confirm("¿Seguro que quieres eliminar este archivo?")
    if(!confirmar) {
        return
    }
    arrayArchivos.splice(i,1)
    localStorage.setItem("arrayArchivos",JSON.stringify(arrayArchivos))
    listaArchivos.innerHTML = ""

    arrayArchivos.forEach((el,i)=>{
        const elemento = document.createElement("button")
        elemento.innerHTML = `<p>Archivo ${i+1}</p>
        <p>Titulo:${el.titulo}</p>
        <button class="btnEliminar">Eliminar</button>`
        elemento.addEventListener("click",()=>cargarArchivo(el,i))
        elemento.querySelector(".btnEliminar").addEventListener("click",(e)=>{
            e.stopImmediatePropagation
            eliminarArchivo(i)
        })
        listaArchivos.append(elemento)
    })
}

//Función que sirve para crear y editar la forma del PDF
function crearPDF() {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.text("Información del Archivo", 10, 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Nombre: ${nombre.value}`, 10, 30);
    doc.text(`Título: ${titulo.value}`, 10, 40);
    doc.text("Descripción:", 10, 50);
    doc.html(descripcion, {
        x: 10,
        y: 60,
        width: 180,
        windowWidth: 800,
        callback: function (doc) {
            let nombreArchivo = titulo.value.trim() ? titulo.value.trim().replace(/[^a-zA-Z0-9]/g, "_") : "Archivo";
            doc.save(`${nombreArchivo}.pdf`);
        }
    });
}

//Función que sirve para crear y editar la forma del TXT
function crearTXT() {
    const contenidoDescripcion = descripcion.innerText
    const contenido = `Nombre: ${nombre.value}\nTítulo: ${titulo.value}\nDescripción:\n${contenidoDescripcion}`;
    const blob = new Blob([contenido], { type: "text/plain" })
    const link = document.createElement("a")
    let nombreArchivo = titulo.value.trim() ? titulo.value.trim().replace(/[^a-zA-Z0-9]/g,"_") : "Archivo"
    link.download = `${nombreArchivo}.txt`
    link.href = URL.createObjectURL(blob)
    link.click()
    URL.revokeObjectURL(link.href)
}

//Función que sirve para escribir en negrita, cursiva o subrayado
function formatText(command) {
    document.execCommand(command,false,null)
}