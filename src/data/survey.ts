export const surveyConfig = {
  // Ruta de la encuesta dentro del sitio.
  formUrl: '#encuesta',
  // Web App de Apps Script que registra y devuelve las respuestas.
  appScriptUrl: 'https://script.google.com/macros/s/AKfycbyoibcWZGydrwNvrwLOCmUBXZGJpP1vK_cxmYmyzSzzbOvzEveXbXPNloa8DoRQOmo-/exec',
  // Enlace de respaldo para abrir la pestaña de respuestas en Google Sheets.
  sheetUrl: 'https://docs.google.com/spreadsheets/d/1ejKX6cVpZPCN1KhLHjS1BY8HGRzGCvLy0jSpCJyiNH4/edit?gid=0#gid=0',
} as const

export const surveyQuestions = [
  {
    question: '¿Para qué sirve un briefing antes de crear un anuncio?',
    options: ['Para definir solamente el estilo visual.', 'Para reunir la información esencial del negocio, el público y el objetivo.', 'Para programar la publicación del anuncio.', 'Para escribir directamente el texto final.'],
  },
  {
    question: '¿Qué es un prompt cuando trabajamos con inteligencia artificial?',
    options: ['El resultado que entrega la inteligencia artificial.', 'Una carpeta donde guardamos archivos.', 'El nombre de un proyecto de trabajo.', 'Una instrucción que explica qué debe hacer la inteligencia artificial.'],
  },
  {
    question: '¿Cuál es la función principal de un anuncio?',
    options: ['Llevar personas hacia el negocio.', 'Cerrar todas las ventas sin ayuda.', 'Definir la identidad visual de la marca.', 'Organizar las tareas del equipo.'],
  },
  {
    question: '¿Qué necesitamos antes de comenzar a desarrollar el copy?',
    options: ['La imagen final ya creada.', 'El horario de publicación.', 'Una idea creativa seleccionada.', 'El diseño adaptado a todos los formatos.'],
  },
  {
    question: '¿Qué ayuda al proyecto de Diseño a mantener la identidad de la marca?',
    options: ['Solamente el horario de publicación.', 'El logo, las referencias visuales y las instrucciones del proyecto.', 'La lista completa de tareas terminadas.', 'Solamente el llamado a la acción.'],
  },
  {
    question: '¿Para qué buscamos referencias visuales antes de diseñar?',
    options: ['Para repetir exactamente una pieza que ya existe.', 'Para reemplazar la información del briefing.', 'Para decidir cuándo se publicará el anuncio.', 'Para orientar la dirección visual sin copiar otra solución.'],
  },
  {
    question: '¿Cuál es el orden básico del proceso creativo que aprendimos?',
    options: ['Diseño → idea → copy → planificación creativa.', 'Copy → diseño → idea → planificación creativa.', 'Idea → copy → planificación creativa → diseño.', 'Planificación creativa → diseño → idea → copy.'],
  },
  {
    question: 'Si todavía no definimos el formato de una pieza, ¿qué debemos confirmar?',
    options: ['Si será Feed, Stories o ambos, y si será una pieza única o un carrusel.', 'Si cambiaremos el objetivo del anuncio.', 'Si descartaremos la idea seleccionada.', 'Si crearemos un nuevo briefing.'],
  },
  {
    question: '¿Cómo se deben generar las imágenes de un carrusel?',
    options: ['Como una sola imagen con todas las páginas.', 'Como varias versiones de la misma portada.', 'Como un collage sin separar las páginas.', 'Como una imagen independiente para cada página.'],
  },
  {
    question: 'Al adaptar una pieza para otro formato, ¿qué debemos conservar?',
    options: ['La misma composición, aunque pierda legibilidad.', 'El concepto central y la identidad visual.', 'Exactamente las mismas dimensiones.', 'La posición de todos los elementos.'],
  },
  {
    question: '¿Cuál es la forma más básica de utilizar la inteligencia artificial?',
    options: ['Conectarla con todas nuestras aplicaciones.', 'Programarla para trabajar cada semana.', 'Hacer una pregunta y recibir una respuesta.', 'Dejar que complete todo el proceso sin revisión.'],
  },
  {
    question: '¿Cuál es la diferencia más simple entre una inteligencia artificial y un agente?',
    options: ['La IA es el motor; el agente es ese motor dentro de un sistema que puede actuar.', 'La IA trabaja con texto y el agente solamente con imágenes.', 'El agente funciona sin inteligencia artificial.', 'La IA y el agente son exactamente lo mismo.'],
  },
  {
    question: '¿Qué significa que un agente pueda trabajar con autonomía?',
    options: ['Que puede trabajar sin un objetivo definido.', 'Que puede planificar, actuar, observar y ajustar sin recibir una orden después de cada paso.', 'Que puede cambiar las reglas del proyecto.', 'Que siempre toma decisiones sin consultar información.'],
  },
  {
    question: '¿Qué es un MCP en el ejemplo visto en clase?',
    options: ['Una instrucción con una forma de trabajar.', 'Una programación que activa una tarea.', 'Un proyecto que organiza las etapas.', 'Un conector que permite a la IA consultar o actuar en otro sistema.'],
  },
  {
    question: '¿Para qué sirve una Skill?',
    options: ['Para conectar la IA con una aplicación externa.', 'Para definir cuándo se repite una tarea.', 'Para enseñar una forma de trabajar, con pasos y criterios.', 'Para organizar las columnas de un proyecto.'],
  },
  {
    question: 'En el modelo simplificado de esta clase, ¿qué reúne un Plugin?',
    options: ['MCP + Skill.', 'MCP + agendamiento.', 'Todoist + Gmail.', 'Prompt + calendario.'],
  },
  {
    question: '¿Qué función cumple Todoist dentro de la máquina que construimos?',
    options: ['Generar los diseños finales.', 'Organizar las tareas y las etapas del trabajo.', 'Escribir todas las ideas y los copies.', 'Aprobar automáticamente las piezas.'],
  },
  {
    question: '¿Para qué usamos los agendamientos dentro de la máquina?',
    options: ['Para elegir el estilo visual de la marca.', 'Para aprobar las ideas seleccionadas.', 'Para reemplazar el flujo de trabajo.', 'Para activar tareas según la recurrencia definida.'],
  },
  {
    question: '¿Cuál es el orden para montar nuestra máquina?',
    options: ['Conectar ChatGPT → crear la cuenta → programar → construir el flujo.', 'Construir el flujo → programar → crear la cuenta → conectar ChatGPT.', 'Crear la cuenta → construir el flujo → conectar ChatGPT → programar actividades.', 'Programar actividades → conectar ChatGPT → construir el flujo → crear la cuenta.'],
  },
  {
    question: '¿Qué datos completamos antes de copiar un prompt de agendamiento?',
    options: ['El nombre del flujo y la recurrencia.', 'El formato de la pieza y el CTA.', 'El logo y las referencias visuales.', 'El nombre de cada tarea terminada.'],
  },
] as const

// La integración externa corrige por posición. Conservá esta secuencia al reemplazar preguntas.
export const surveyAnswerKey = [
  'B', 'D', 'A', 'C', 'B',
  'D', 'C', 'A', 'D', 'B',
  'C', 'A', 'B', 'D', 'C',
  'A', 'B', 'D', 'C', 'A',
] as const

export function hasSurveySheetUrl() {
  return surveyConfig.sheetUrl.trim().length > 0
}
