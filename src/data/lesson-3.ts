import type { SlideDeck } from '../types/slide'
import { surveyConfig } from './survey'

const ideasSchedulePrompt = `Usá el conector de Todoist del usuario y, antes de crear el agendamiento:

1. Localizá el proyecto \`{{NOMBRE_FLUJO}}\`.
2. Consultá sus secciones y obtené los IDs actuales del proyecto y de cada columna mencionada abajo.
3. Validá que cada ID corresponda al nombre correcto. No uses IDs proporcionados anteriormente ni los inventes.
4. Si falta alguna columna o existe ambigüedad, no crees el agendamiento e informá el bloqueo.

Después, creá un agendamiento recurrente con estos parámetros:

- Recurrencia: {{RECURRENCIA}}
- Zona horaria: \`America/Montevideo\`

Incluí estas instrucciones con los IDs encontrados:

En Todoist, abrí el proyecto \`{{NOMBRE_FLUJO}}\` y ejecutá este flujo en el orden indicado:

1. Leé integralmente las orientaciones y el briefing vigentes de este proyecto GPT. Trabajá como especialista del equipo en ideas publicitarias y mantené como objetivo principal generar nuevos agendamientos para el pet shop.

2. Leé todas las tareas, descripciones y comentarios de \`Ideas Descartadas\`. Usá los conceptos y motivos de descarte como lista de exclusión: no vuelvas a proponer la misma idea, mecanismo, promesa o insight, aunque cambien el nombre o la redacción.

3. Leé las tareas existentes del resto del proyecto, especialmente \`Nuevas Ideias\`, \`Ideias Selecionadas\`, \`Copy\`, \`Copy Selecionadas\`, \`Diseños\`, \`Diseños Selecionados\` y \`Concluídos\`. Construí un inventario de los conceptos ya propuestos o en producción para evitar duplicados semánticos en cualquier etapa.

4. Revisá todos los comentarios de las tareas de \`Nuevas Ideias\`. Respondé únicamente los comentarios nuevos o accionables y resolvelos antes de generar ideas. Todo comentario que escribas debe comenzar exactamente con \`agente: \`. No respondas comentarios ya atendidos ni publiques mensajes innecesarios.

5. Investigá en internet campañas similares con resultados comprobables, sin copiar conceptos ni inventar resultados.

6. Generá exactamente cinco ideas nuevas, diferentes entre sí y distintas de todas las ideas existentes o descartadas. Antes de crear cada tarea, compará la propuesta con el inventario anterior. Si coincide en concepto, mecanismo, promesa o insight, reemplazala.

7. Creá una tarea independiente por idea en \`Nuevas Ideias\`. Usá el nombre de la idea como título y, en la descripción, incluí: ruptura visual de patrón, identificación visual y conceptual, resultado, CTA y concepto. No desarrolles todavía el formato, el copy ni el diseño final.

Usá dentro de estas instrucciones los IDs actuales encontrados para identificar inequívocamente el proyecto y cada columna.

Al finalizar cada ejecución, informá brevemente qué comentarios fueron respondidos, cuáles fueron las cinco tareas creadas y cualquier bloqueo real. No inventes información.

Finalmente, confirmá que el agendamiento fue creado, su frecuencia, zona horaria y el proyecto de Todoist utilizado.`

const copySchedulePrompt = `Creá una tarea programada recurrente con la siguiente recurrencia: {{RECURRENCIA}}, en la zona horaria \`America/Montevideo\`, con acceso a Todoist. La tarea deberá ejecutar exactamente estas instrucciones:

Leé y seguí integralmente las instrucciones del proyecto de ChatGPT antes de actuar. Después, abrí el proyecto \`{{NOMBRE_FLUJO}}\` en Todoist y trabajá siempre dentro de la misma tarea, sin eliminarla, recrearla ni duplicarla. Como la cuenta es compartida, todos tus comentarios deben comenzar exactamente con \`agente: \`.

Ejecutá el proceso en este orden:

1. Revisá primero todas las tareas de la columna \`Copy\` y leé el historial completo de comentarios de cada una. Respondé únicamente si existe un comentario nuevo o una solicitud pendiente que requiera una acción. Aplicá los ajustes solicitados sin modificar el concepto central. Si una opción fue aprobada, redactá la descripción de la publicación y esperá su aprobación. Si la descripción final fue aprobada, entregá dentro de la misma tarea los dos bloques finales exigidos por las instrucciones del proyecto. No repitas respuestas ni versiones ya publicadas.

2. Después, procesá las tareas de la columna \`Ideias Selecionadas\`. Leé el título, la descripción y todos los comentarios. Conservá la idea original y su historial. Si el formato todavía no está definido, preguntá en un comentario si será Feed 4:5, Stories 9:16 o ambos; si será una pieza única o un carrusel; y, en caso de ser un carrusel, cuántas páginas tendrá. En ese caso, no generes las opciones de copy ni muevas la tarea hasta recibir una respuesta.

3. Cuando exista información suficiente, generá tres opciones diferentes de copy y propuesta visual, siguiendo exactamente las instrucciones del proyecto. Para una pieza única, incluí el texto visible y la descripción de la imagen. Para un carrusel, detallá el texto visible y la descripción de la imagen de cada página. Publicá todo en un único comentario iniciado con \`agente: \` y mové la misma tarea a la columna \`Copy\`.

No inventes información, no generes imágenes ni prompts de imagen y no realices modificaciones fuera de este flujo.

Antes de finalizar, verificá que el agendamiento conserve integralmente todas estas reglas. Luego, crealo y confirmá la frecuencia configurada.`

const designSchedulePrompt = `Creá un agendamiento recurrente con la siguiente recurrencia: {{RECURRENCIA}}, hora de Uruguay (\`America/Montevideo\`). No ejecutes ahora el flujo operativo. Usá íntegramente el siguiente texto como instrucción del agendamiento:

En Todoist, ejecutá este flujo:

1. Localizá el proyecto \`{{NOMBRE_FLUJO}}\` y consultá en Todoist sus IDs actuales y los de sus columnas. No dependas de IDs fijos.

2. Revisá primero todos los cards de \`Diseños\`. Leé título, descripción y el historial completo de comentarios. Actuá únicamente si existe un comentario nuevo o una corrección pendiente. Aplicá el ajuste solicitado sin modificar el concepto aprobado, generá solamente las piezas necesarias y no repitas versiones ya entregadas. Subí cada pieza final a Google Drive usando el conector @Google Drive y agregá el enlace real del archivo en un comentario del mismo card. Confirmá que la carga se completó y que el enlace quedó registrado correctamente. Mantené el card en esa columna.

3. Después, procesá todos los cards de \`Copy Selecionadas\`. Leé íntegramente título, descripción y comentarios, además de las instrucciones y fuentes vigentes de este proyecto GPT. Usá el logo original y el lenguaje visual de referencia como inputs. Antes de generar, validá con un subagente en nivel 10/10 lo que vas a producir, enviándole el briefing completo y las instrucciones vigentes del proyecto. Luego generá el diseño usando la capacidad de generación de imágenes. Respetá el formato indicado; si es un carrusel, generá una imagen independiente por página, sin numeración y manteniendo continuidad visual.

4. Subí todas las piezas finales a Google Drive usando el conector @Google Drive. Después agregá en un comentario del mismo card los enlaces reales de todos los archivos subidos. Únicamente después de confirmar que las imágenes fueron generadas, cargadas correctamente en Google Drive y enlazadas en el card, movelo a \`Diseños\`.

Todo comentario debe comenzar exactamente con \`agente: \`. No elimines, recrees ni dupliques tareas. No inventes información, enlaces ni alteres el concepto aprobado. Si falta información esencial o falla la generación, la carga en Google Drive o el registro del enlace en Todoist, comentá la pendencia en el card y no lo muevas.

Creá efectivamente el agendamiento usando la herramienta de automatizaciones disponible y confirmame solamente después de verificar que quedó guardado correctamente.`

export const lessonThreeSlides = [
  {
    id: 'portada',
    eyebrow: 'Clase 03 · Automatización',
    title: 'Hoy vamos a construir la máquina.',
    subtitle: 'Ya aprendimos a crear ideas, escribir el copy y diseñar las piezas. Ahora vamos a conectar esas etapas para convertirlas en un sistema de trabajo.',
    time: '00–02 min',
    kind: 'cover',
  },
  {
    id: 'cuatro-formas',
    eyebrow: 'Evolución del uso de la IA',
    title: 'Cuatro formas de utilizar la inteligencia artificial.',
    subtitle: 'La evolución no consiste solamente en obtener mejores respuestas. Consiste en delegar más partes del trabajo.',
    time: '02–09 min',
    kind: 'concept-grid',
    cards: [
      {
        label: '01',
        title: 'Conversacional',
        description: 'Hacemos una pregunta. La inteligencia artificial responde.',
        icon: 'message',
      },
      {
        label: '02',
        title: 'Por tareas',
        description: 'Solicitamos una tarea concreta, pero seguimos indicando cada paso.',
        icon: 'task',
      },
      {
        label: '03',
        title: 'Delegada',
        description: 'Entregamos un objetivo. El agente planifica, ejecuta y revisa.',
        icon: 'agent',
      },
      {
        label: '04',
        title: 'Integrada',
        description: 'El agente actúa dentro de nuestras aplicaciones, archivos y procesos.',
        icon: 'network',
      },
    ],
  },
  {
    id: 'ia-versus-agente',
    eyebrow: 'Concepto clave',
    title: 'La inteligencia artificial es el motor.',
    time: '09–12 min',
    kind: 'agent-comparison',
    cards: [
      {
        label: 'Motor',
        title: 'Inteligencia artificial',
        description: 'Interpreta información, razona y genera respuestas.',
        icon: 'brain',
      },
      {
        label: 'Sistema',
        title: 'Agente',
        description: 'Combina la IA con un objetivo, contexto, capacidades, decisiones y permisos.',
        icon: 'agent',
      },
    ],
  },
  {
    id: 'ciclo-agente',
    eyebrow: 'Autonomía en acción',
    title: 'Un agente trabaja en ciclos.',
    subtitle: 'No necesita recibir una nueva instrucción después de cada paso.',
    time: '12–17 min',
    kind: 'agent-cycle',
    steps: [
      {
        title: 'Comprender',
        description: 'Interpreta el objetivo y el contexto.',
      },
      {
        title: 'Planificar',
        description: 'Decide qué necesita hacer y en qué orden.',
      },
      {
        title: 'Actuar',
        description: 'Ejecuta el próximo paso.',
      },
      {
        title: 'Observar',
        description: 'Analiza el resultado de la acción.',
      },
      {
        title: 'Ajustar',
        description: 'Corrige el plan y continúa trabajando.',
      },
    ],
    highlight: 'Cuando alcanza el objetivo, entrega el resultado. Este ciclo es gestionado por un sistema llamado agent harness.',
  },
  {
    id: 'entorno-agente',
    eyebrow: 'El entorno del agente',
    title: 'El agente trabaja dentro de un entorno.',
    subtitle: 'Existen muchas capacidades a su alrededor. En esta clase nos enfocaremos en tres: MCP, Skills y Plugins.',
    time: '17–20 min',
    kind: 'agent-environment',
    cards: [
      {
        title: 'MCP',
        icon: 'plug',
      },
      {
        title: 'Skills',
        icon: 'skill',
      },
      {
        title: 'Plugins',
        icon: 'package',
      },
      {
        title: 'Herramientas',
        icon: 'tool',
      },
      {
        title: 'Instrucciones',
        icon: 'instructions',
      },
      {
        title: 'Automatizaciones',
        icon: 'trigger',
      },
    ],
  },
  {
    id: 'mcp',
    eyebrow: 'Conectar el agente',
    title: 'MCP: el conector entre la IA y otros sistemas.',
    subtitle: 'Un estándar que permite al agente consultar información y ejecutar acciones fuera del chat.',
    time: '20–22 min',
    kind: 'connector-map',
    diagram: ['Agente', 'MCP', 'Gmail'],
    highlight: 'El agente utiliza una conexión que le ofrece información y acciones.',
  },
  {
    id: 'conector-consulta',
    eyebrow: 'Cómo funciona un conector',
    title: 'Así conversa el agente con un conector.',
    subtitle: 'Cada respuesta añade contexto para que la inteligencia artificial decida su próximo paso.',
    time: '22–26 min',
    kind: 'connector-chat',
    chat: [
      {
        role: 'agent',
        label: 'Inteligencia artificial',
        mention: '@Gmail',
        text: 'Comprobar nuevos correos.',
      },
      {
        role: 'connector',
        label: 'Conector Gmail',
        text: '3 correos nuevos',
        items: [
          '#01 · Informe mensual — Ana Torres',
          '#02 · Reunión del proyecto — Equipo Nova',
          '#03 · Factura pendiente — Proveedor',
        ],
      },
      {
        role: 'agent',
        label: 'Inteligencia artificial',
        mention: '@Gmail',
        text: 'Ver el correo #03.',
      },
      {
        role: 'connector',
        label: 'Conector Gmail',
        text: 'Correo #03',
        details: [
          { label: 'De', value: 'proveedor@empresa.com' },
          { label: 'Asunto', value: 'Factura pendiente' },
          { label: 'Mensaje', value: 'Adjuntamos la factura correspondiente a julio.' },
          { label: 'Adjunto', value: 'factura-julio.pdf' },
        ],
      },
    ],
    highlight: 'El agente actúa, observa la respuesta y continúa investigando dentro de la misma conversación.',
  },
  {
    id: 'skills',
    eyebrow: 'Enseñar una forma de trabajar',
    title: 'Una skill convierte herramientas en un proceso.',
    subtitle: 'Es una instrucción reutilizable que define qué hacer, en qué orden y con qué criterios.',
    time: '26–30 min',
    kind: 'skill-process',
    steps: [
      { title: 'Comprobar', description: 'Revisar los correos no leídos.' },
      { title: 'Priorizar', description: 'Identificar los mensajes urgentes.' },
      { title: 'Investigar', description: 'Abrir solamente los correos relevantes.' },
      { title: 'Obtener', description: 'Descargar adjuntos cuando sean necesarios.' },
      { title: 'Resumir', description: 'Crear una lista de tareas y próximos pasos.' },
    ],
    highlight: 'Las herramientas son los verbos. La skill organiza esos verbos.',
  },
  {
    id: 'plugins',
    eyebrow: 'Todo en un solo paquete',
    title: 'Un plugin reúne conexión y forma de trabajar.',
    time: '30–34 min',
    kind: 'plugin-bundle',
    cards: [
      { title: 'MCP', icon: 'plug' },
      { title: 'Skill', icon: 'skill' },
      { title: 'Plugin', icon: 'package' },
    ],
  },
  {
    id: 'maquina-vision',
    eyebrow: 'La máquina que vamos a construir',
    title: 'Un sistema para organizar y ejecutar nuestra producción de contenido.',
    subtitle: 'Todoist organiza el flujo, ChatGPT ejecuta las etapas y las programaciones mantienen la máquina en movimiento.',
    time: '34–37 min',
    kind: 'machine-overview',
    cards: [
      { title: 'Todoist', description: 'Organiza el trabajo.', icon: 'task' },
      { title: 'ChatGPT', description: 'Ejecuta cada etapa.', icon: 'agent' },
      { title: 'Programaciones', description: 'Activan las rutinas.', icon: 'trigger' },
    ],
    highlight: 'Un proceso conectado que transforma ideas en piezas listas para publicar.',
  },
  {
    id: 'maquina-pasos',
    eyebrow: 'Cómo vamos a construirla',
    title: 'Cuatro pasos para construir la máquina.',
    time: '37–40 min',
    kind: 'machine-roadmap',
    steps: [
      { title: 'Crear la cuenta', description: 'Preparamos nuestro espacio en Todoist.' },
      { title: 'Construir el flujo', description: 'Creamos el proyecto y sus etapas de producción.' },
      { title: 'Conectar ChatGPT', description: 'Instalamos el plugin y autorizamos Todoist.' },
      { title: 'Programar actividades', description: 'Creamos las rutinas que ejecutarán cada etapa.' },
    ],
  },
  {
    id: 'prompts-agendamientos',
    eyebrow: 'Recursos para la práctica',
    title: 'Prompts para programar la máquina.',
    time: '40–100 min',
    kind: 'prompt-library',
    cards: [
      {
        title: 'Ideas',
        description: 'Prompt configurable para programar la generación de ideas.',
        prompt: ideasSchedulePrompt,
        icon: 'message',
      },
      {
        title: 'Copy',
        description: 'Prompt configurable para programar la creación de copy.',
        prompt: copySchedulePrompt,
        icon: 'draft',
      },
      {
        title: 'Diseño',
        description: 'Prompt configurable para programar la creación de diseños.',
        prompt: designSchedulePrompt,
        icon: 'skill',
      },
    ],
  },
  {
    id: 'encuesta-final',
    eyebrow: 'Cierre de la clase 03',
    title: 'Completá la encuesta antes de salir.',
    subtitle: 'Una revisión simple de los conceptos esenciales de las tres clases.',
    time: '100–120 min',
    kind: 'statement',
    externalLink: {
      label: 'Abrir encuesta',
      url: surveyConfig.formUrl,
      unavailableLabel: 'El enlace de la encuesta se configurará antes de la clase.',
    },
  },
] satisfies SlideDeck
