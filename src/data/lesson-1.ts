import type { Pillar, SlideDeck } from '../types/slide'

const pillars = [
  { title: 'Romper el patrón' },
  { title: 'Conectar' },
  { title: 'Comunicar' },
  { title: 'Dirigir' },
] satisfies readonly Pillar[]

export const CREATIVE_PROMPT = `Actuá como estratega creativo para anuncios.

Si el usuario todavía no informó el objetivo principal del creativo, preguntalo. Si ya lo informó, avanzá directamente.

Después:

1. Leé el briefing disponible en el proyecto.
2. Investigá en internet campañas similares que hayan obtenido resultados.
3. Proponé cinco ideas diferentes, sin repetir ideas anteriores.

Presentá cada idea así:

### IDEA — NOMBRE

**1. Ruptura visual de patrón**  
Qué elemento visual detiene la atención.

**2. Identificación visual y conceptual**  
Cómo la imagen y el concepto hacen que el público se reconozca.

**3. Resultado**  
Qué resultado obtiene o percibe la persona.

**4. CTA**  
Qué acción debe realizar.

**Concepto**  
Explicación breve y clara de la idea.

No inventes información ni copies campañas. No desarrolles todavía el formato, el copy ni el diseño final.

Al terminar, preguntá:

“¿Querés elegir una de estas ideas o repetir el ciclo con cinco ideas nuevas?”

Si pide nuevas ideas, repetí la investigación sin reutilizar conceptos anteriores.

Si elige una idea, entregá su contenido completo como texto limpio dentro de un único bloque de código, sin explicaciones adicionales.`

export const lessonOneSlides = [
  {
    id: 'portada',
    eyebrow: 'Clase 01 · 2 horas',
    title: 'De la atención al briefing',
    subtitle: 'Cómo construir la base de un anuncio que tenga sentido.',
    time: '00–05 min',
    kind: 'cover',
  },
  {
    id: 'presentacion',
    eyebrow: 'Presentación',
    title: 'Antes de empezar, necesitamos contexto.',
    subtitle: 'Cada participante se presenta para conectar el curso con una necesidad real.',
    time: '05–10 min',
    kind: 'bullets',
    bullets: ['Nombre.', 'Negocio o área en la que trabaja.', 'Qué problema busca resolver con el curso.'],
  },
  {
    id: 'pregunta-funcion',
    eyebrow: 'Concepto básico',
    title: '¿Cuál es la función de un anuncio?',
    time: '10–12 min',
    kind: 'statement',
  },
  {
    id: 'funcion',
    eyebrow: 'Concepto básico',
    title: 'La función del anuncio no es vender directamente.',
    subtitle: 'Su función principal es generar flujo: llevar personas hacia el negocio.',
    time: '12–20 min',
    kind: 'statement',
    highlight: 'El anuncio abre la puerta. La venta ocurre después.',
  },
  {
    id: 'atencion',
    eyebrow: 'La pregunta clave',
    title: '¿Cómo genera flujo un anuncio?',
    subtitle: 'Primero necesita conquistar algo mucho más escaso que el dinero: la atención.',
    time: '20–25 min',
    kind: 'statement',
    highlight: 'Sin atención, no hay mensaje. Sin mensaje, no hay acción.',
  },
  {
    id: 'mercado',
    eyebrow: 'Mercado de la atención',
    title: 'El mercado de la atención',
    subtitle: 'Las empresas compiten contra videos, mensajes, noticias, entretenimiento y cientos de estímulos al mismo tiempo.',
    time: '25–30 min',
    kind: 'statement',
    highlight: 'El primer adversario de tu anuncio es la indiferencia.',
  },
  {
    id: 'pilares',
    eyebrow: 'Los cuatro pilares',
    title: 'Un buen anuncio necesita cumplir cuatro funciones.',
    time: '30–35 min',
    kind: 'pillars',
    pillars,
  },
  {
    id: 'romper',
    eyebrow: 'Pilar 01',
    title: 'Romper el patrón',
    subtitle: 'La persona está desplazándose. El anuncio necesita interrumpir ese movimiento sin depender de exageración vacía.',
    time: '35–40 min',
    kind: 'bullets',
    bullets: [
      'Una imagen inesperada o visualmente fuerte.',
      'Un titular que abra una tensión o una pregunta.',
      'Un contraste claro con lo que aparece alrededor.',
    ],
  },
  {
    id: 'conectar',
    eyebrow: 'Pilar 02',
    title: 'Conectar',
    subtitle: 'Después de mirar, la persona necesita reconocer que el anuncio tiene relación con su realidad.',
    time: '40–45 min',
    kind: 'bullets',
    bullets: ['“Esto es para mí”.', '“Estoy viviendo este problema”.', '“Necesito resolver esto”.'],
  },
  {
    id: 'comunicar',
    eyebrow: 'Pilar 03',
    title: 'Comunicar el resultado',
    subtitle: 'Las personas no compran solamente un producto. Compran la consecuencia que esperan generar en su vida.',
    time: '45–50 min',
    kind: 'statement',
    highlight: 'No vendas el objeto. Haz visible el cambio.',
  },
  {
    id: 'dirigir',
    eyebrow: 'Pilar 04',
    title: 'Dirigir',
    subtitle: 'El anuncio necesita dejar claro qué debe hacer la persona después de entender la propuesta.',
    time: '50–55 min',
    kind: 'bullets',
    bullets: ['Enviar un mensaje.', 'Reservar un horario.', 'Visitar el local o ingresar al sitio.', 'Comprar o solicitar información.'],
    highlight: 'CTA: Call to Action · llamado a la acción.',
  },
  {
    id: 'briefing-intro',
    eyebrow: 'Inicio de la práctica',
    title: 'Vamos a comenzar con un briefing.',
    subtitle: 'Un briefing es un resumen claro de la información esencial del negocio. Nos ayuda a entender qué estamos comunicando, para quién y qué hace diferente a la propuesta.',
    time: '55–65 min',
    kind: 'statement',
    highlight: 'Antes de crear, necesitamos contexto.',
  },
  {
    id: 'briefing-estructura',
    eyebrow: 'Modelo de briefing',
    title: 'Qué información necesitamos.',
    subtitle: 'Vamos a trabajar con cinco campos simples.',
    time: '65–75 min',
    kind: 'bullets',
    bullets: [
      'Datos del negocio.',
      'Localización.',
      'Público objetivo.',
      'Productos y servicios.',
      'Diferencial.',
    ],
    copyLink: {
      label: 'Copiar enlace del briefing',
      hash: '#briefing',
    },
  },
  {
    id: 'case',
    eyebrow: 'Caso guiado',
    title: 'Caso: pet shop con retiro y entrega a domicilio.',
    subtitle: 'Aplicaremos el modelo a un servicio simple y fácil de visualizar.',
    time: '75–85 min',
    kind: 'case',
    bullets: [
      'Para quién: personas con poco tiempo para llevar o buscar a su mascota.',
      'Servicio: baño, peluquería, retiro y entrega.',
      'Resultado: dejar al perro limpio con muy poco esfuerzo.',
    ],
    highlight: 'El dueño resuelve la limpieza sin reorganizar su día.',
  },
  {
    id: 'case-briefing',
    eyebrow: 'Briefing del caso',
    title: 'El briefing del pet shop.',
    subtitle: 'Las mismas cinco preguntas, respondidas con información más concreta.',
    time: '85–95 min',
    kind: 'briefing',
    bullets: [
      'Datos del negocio: pet shop especializado en higiene y estética canina. Resuelve el baño y el cuidado del perro sin que el dueño tenga que dedicar tiempo al proceso ni organizar el traslado.',
      'Localización: zona central de las ciudades de Rivera y Santana do Livramento. El retiro y la entrega a domicilio se realizan dentro de esa área de atención.',
      'Público objetivo: personas con poco tiempo para bañar, peinar o trasladar a su perro, que valoran la comodidad y quieren recibirlo limpio, cuidado y presentable.',
      'Productos y servicios: baño, corte y peinado. Precio: $450 para perros chicos y $800 para perros grandes. Retiro y entrega a domicilio por $100 adicionales. Todos los valores están expresados en pesos uruguayos.',
      'Diferencial: buscamos al perro en su casa y lo devolvemos impecable. El cliente resuelve todo el cuidado con poco esfuerzo y sin alterar su rutina.',
    ],
  },
  {
    id: 'practica',
    eyebrow: 'Práctica individual',
    title: 'Ahora cada persona completa su propio briefing.',
    subtitle: 'Puede trabajar con su negocio actual, uno que quiere abrir o el negocio de un familiar.',
    time: '95–115 min',
    kind: 'practice',
    bullets: [
      'Negocio propio.',
      'Un negocio que quiere abrir.',
      'El negocio de un familiar o conocido.',
      'Completar los cinco campos con información concreta.',
    ],
  },
  {
    id: 'prompt-creativo',
    eyebrow: 'Próximo paso',
    title: 'Copiá el prompt para generar las ideas.',
    subtitle: 'Pegalo en el proyecto de ChatGPT que contiene el briefing del negocio.',
    time: '115–120 min',
    kind: 'statement',
    copyText: {
      label: 'Copiar prompt',
      successLabel: 'Prompt copiado',
      content: CREATIVE_PROMPT,
    },
  },
] satisfies SlideDeck
