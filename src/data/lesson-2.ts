import type { SlideDeck } from '../types/slide'
import { CREATIVE_PROMPT } from './lesson-1'

const COPY_PROJECT_PROMPT = `Actuá como copywriter creativo para redes sociales.

Recibís una idea creativa ya seleccionada. No cambies su concepto central, pero podés refinarla si necesita más claridad o fuerza.

Si el formato todavía no fue informado, preguntá si será Feed 4:5, Stories 9:16 o ambos, y si será una pieza única o un carrusel. Si es carrusel, preguntá cuántas páginas tendrá.

Después, presentá tres opciones diferentes de copy y propuesta visual dentro del mismo concepto.

Para una pieza única, incluí:

- texto visible;
- descripción de la imagen.

Para un carrusel, detallá cada página con:

- texto visible;
- descripción de la imagen.

El usuario puede elegir una opción o pedir ajustes sobre cualquiera de ellas.

Cuando apruebe una opción, escribí la descripción de la publicación y esperá su aprobación.

Después de la aprobación final, entregá todo en dos bloques de código separados, sin explicaciones adicionales:

Bloque 1 — Planificación creativa

- formato;
- texto visible de cada pieza o página;
- descripción visual de cada pieza o página;
- CTA.

Bloque 2 — Descripción de la publicación

- texto final que acompañará la publicación.

No inventes información. No generes imágenes ni prompts para generarlas. Trabajá únicamente el copy y la descripción conceptual de lo que debe aparecer.`

const DESIGN_PROJECT_PROMPT = `Eres un diseñador experimentado, con formación publicitaria y conectado al mercado actual. Odias la monotonía y repetir tendencias; generas tendencias y casos relevantes a partir de tu experiencia. En este proyecto recibirás un briefing. Consulta las fuentes del proyecto para identificar el logo y el lenguaje visual.

Usa las referencias de las fuentes del proyecto para orientar tu creación y generación de imágenes, manteniendo siempre la paleta de verdes del logo y el logo original de la empresa, que también se encuentra en las fuentes.

Aplica el lenguaje visual y el logo, usando el briefing para crear la pieza solicitada.

# PROCESO
1. Recibe el briefing.
2. Verifica en las fuentes del proyecto el logo y el lenguaje visual de referencia.
3. Valida lo que vas a hacer con un subagente en 10/10, enviándole todas las instrucciones recibidas (incluidas las instrucciones del proyecto).
4. Usa el logo y el lenguaje visual como input para generar la pieza solicitada en el briefing.

## Recomendaciones
- Ejecuta el 100 % usando tu capacidad de generación de imágenes.
- Si la solicitud de creación es un carrusel, genera una imagen independiente para cada página planificada; nunca coloques todas las páginas en un único archivo.
- No uses numeración para las páginas.
- Usa el logo y los colores solicitados.`

const CHAT_CONTEXT_CHECK = '¿Cuáles son las fuentes y las instrucciones de este proyecto?'

export const lessonTwoSlides = [
  {
    id: 'portada',
    eyebrow: 'Clase 02',
    title: 'De la idea a la pieza con IA.',
    subtitle: 'Copy, planificación creativa, diseño y edición en un proceso claro.',
    time: '00–02 min',
    kind: 'cover',
  },
  {
    id: 'repaso-anterior',
    eyebrow: 'Repaso rápido',
    title: '¿Qué vimos en la clase anterior?',
    time: '02–04 min',
    kind: 'bullets',
    bullets: [
      'La función del anuncio es generar flujo hacia el negocio.',
      'Antes de vender, el anuncio compite por la atención.',
      'Los cuatro pilares: romper el patrón, conectar, comunicar el resultado y dirigir hacia una acción.',
    ],
  },
  {
    id: 'correccion-ideas',
    eyebrow: 'Corrección de la clase 1',
    title: 'Primero corregimos el prompt de ideas.',
    subtitle: 'Antes de programar una tarea, confirmamos que el prompt genere solamente ideas, sin copy, diseño ni imágenes.',
    time: '04–07 min',
    kind: 'statement',
    highlight: 'Quien quiera puede recrear sus ideas después de esta corrección.',
    copyText: {
      label: 'Copiar prompt de ideas',
      successLabel: 'Prompt copiado',
      content: CREATIVE_PROMPT,
    },
  },
  {
    id: 'tarea-programada',
    eyebrow: 'Agendamiento',
    title: 'Ahora sí: una tarea programada.',
    subtitle: 'Con el prompt corregido, definimos qué debe hacer, cuándo y con qué frecuencia.',
    time: '07–12 min',
    kind: 'bullets',
    bullets: [
      'Puede traer nuevas ideas en un día y horario definido.',
      'Ejemplo: cada lunes, investigar y proponer nuevas líneas creativas.',
      'La calidad depende de tener un briefing claro antes de programar.',
    ],
  },
  {
    id: 'aprendizajes-hoy',
    eyebrow: 'Objetivo de hoy',
    title: 'Hoy seguimos este flujo.',
    subtitle: 'Vamos a pasar de una idea a piezas listas para publicar.',
    time: '12–14 min',
    kind: 'bullets',
    bullets: [
      '1. Crear el proyecto de Copy y generar la planificación creativa.',
      '2. Crear el proyecto de Diseño, buscar referencias y ajustar las instrucciones.',
      '3. Crear, editar y adaptar piezas para distintos formatos.',
    ],
  },
  {
    id: 'proyecto-copy',
    eyebrow: 'Proyecto 01',
    title: 'Creamos el proyecto de Copy.',
    subtitle: 'Nombre sugerido: Copy — nombre del emprendimiento.',
    time: '14–17 min',
    kind: 'bullets',
    bullets: [
      'Abrí un proyecto nuevo para este negocio.',
      'Entrá en las configuraciones del proyecto.',
      'Pegá las instrucciones de Copy en el mismo lugar, sin cambiarlas.',
    ],
  },
  {
    id: 'prompt-copy',
    eyebrow: 'Instrucciones compartidas',
    title: 'Prompt del proyecto de Copy.',
    subtitle: 'Es el mismo prompt para GPT Work y GPT Chat.',
    time: '17–18 min',
    kind: 'statement',
    copyText: {
      label: 'Copiar prompt',
      successLabel: 'Prompt copiado',
      content: COPY_PROJECT_PROMPT,
    },
  },
  {
    id: 'practica-copy',
    eyebrow: 'Práctica individual',
    title: 'Ahora cada persona trabaja su Copy.',
    subtitle: 'Usá una idea elegida en la clase 1. Si todavía no tenés una, retomá el caso del pet shop.',
    time: '18–25 min',
    kind: 'practice',
    bullets: [
      'Pegá la idea creativa seleccionada.',
      'Elegí una de las tres opciones o pedí un ajuste.',
      'Aprobá la descripción de la publicación.',
    ],
  },
  {
    id: 'entrega-copy',
    eyebrow: 'Puente hacia el diseño',
    title: 'Del Copy llevamos solamente la planificación creativa.',
    subtitle: 'La descripción de la publicación queda lista para acompañar la pieza cuando se publique.',
    time: '25–27 min',
    kind: 'statement',
    highlight: 'Copiá el Bloque 1: planificación creativa.',
  },
  {
    id: 'buscar-referencias',
    eyebrow: 'Antes del diseño',
    title: 'Buscá referencias, no plantillas para copiar.',
    subtitle: 'Guardá lo que orienta la pieza: composición, color, fotografía, tipografía y lenguaje visual.',
    time: '27–29 min',
    kind: 'statement',
    highlight: 'Las referencias orientan. No reemplazan el criterio ni se copian.',
  },
  {
    id: 'referencias-visuales',
    eyebrow: 'Práctica individual',
    title: 'Cuatro lugares para explorar.',
    subtitle: 'Elegí y guardá referencias que ayuden a resolver la pieza de tu propio negocio.',
    time: '29–33 min',
    kind: 'resources',
    references: [
      {
        name: 'Behance',
        url: 'https://www.behance.net/galleries/advertising',
        focus: 'Campañas completas',
        description: 'Identidad, dirección de arte y aplicación de una idea en varias piezas.',
      },
      {
        name: 'Dribbble',
        url: 'https://dribbble.com/shots/popular',
        focus: 'Soluciones visuales',
        description: 'Composición, estilos, tipografía y recursos gráficos para explorar.',
      },
      {
        name: 'Pinterest',
        url: 'https://www.pinterest.com/',
        focus: 'Moodboards',
        description: 'Referencias de color, fotografía, formato y atmósfera visual.',
      },
    ],
  },
  {
    id: 'proyecto-diseno',
    eyebrow: 'Proyecto 02',
    title: 'Creamos el proyecto de Diseño.',
    subtitle: 'Nombre sugerido: Diseño — nombre del emprendimiento.',
    time: '33–36 min',
    kind: 'bullets',
    bullets: [
      'Subí el logo original del negocio.',
      'Guardá las referencias visuales seleccionadas.',
      'Agregá los materiales relevantes del emprendimiento.',
    ],
  },
  {
    id: 'prompt-disenador',
    eyebrow: 'Instrucciones compartidas',
    title: 'Prompt del proyecto de Diseño.',
    subtitle: 'Es el mismo prompt para GPT Work y GPT Chat.',
    time: '36–38 min',
    kind: 'statement',
    copyText: {
      label: 'Copiar prompt',
      successLabel: 'Prompt copiado',
      content: DESIGN_PROJECT_PROMPT,
    },
  },
  {
    id: 'verificar-contexto',
    eyebrow: 'Paso obligatorio en GPT Chat',
    title: 'Antes de diseñar, pedimos las fuentes y las instrucciones.',
    subtitle: 'Esperá la respuesta. Recién después pegá la planificación creativa.',
    time: '38–40 min',
    kind: 'statement',
    copyText: {
      label: 'Copiar pregunta',
      successLabel: 'Pregunta copiada',
      content: CHAT_CONTEXT_CHECK,
    },
  },
  {
    id: 'practica-diseno',
    eyebrow: 'Práctica individual',
    title: 'Generamos el diseño paso a paso.',
    subtitle: 'Usá el Bloque 1 de planificación creativa dentro del proyecto de Diseño.',
    time: '40–50 min',
    kind: 'practice',
    bullets: [
      'En GPT Chat, primero recuperá las fuentes e instrucciones.',
      'Pegá la planificación creativa aprobada.',
      'Pedí la primera imagen y revisala antes de pedir la siguiente.',
      'En un carrusel, cada página es una imagen independiente.',
    ],
  },
  {
    id: 'editar-imagen',
    eyebrow: 'Edición',
    title: 'Una imagen lista también se puede ajustar.',
    subtitle: 'No hace falta empezar de cero para corregir un detalle concreto.',
    time: '50–54 min',
    kind: 'bullets',
    bullets: [
      'Cambiar un texto o un elemento puntual.',
      'Agregar, quitar o corregir un objeto.',
      'Ajustar el fondo, el encuadre o un detalle de la composición.',
    ],
  },
  {
    id: 'adaptar-formato',
    eyebrow: 'Último ajuste',
    title: 'Adaptamos la pieza para Feed o Stories.',
    subtitle: 'Conservamos el concepto y la identidad visual al preparar otra versión de la misma pieza.',
    time: '54–57 min',
    kind: 'statement',
    highlight: 'Pedí un cambio de formato, no un concepto nuevo.',
  },
] satisfies SlideDeck
