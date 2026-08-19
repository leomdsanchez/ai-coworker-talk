# Encuesta final · Clases 1–3

La encuesta se responde dentro del sitio: cada alumno informa su nombre y avanza una pregunta por vez. Al finalizar, el sitio registra las respuestas y la puntuación en la planilla conectada.

## Campo obligatorio

- **Nombre y apellido**

## Criterio de las preguntas

Son 20 preguntas objetivas y simples de opción múltiple. Evalúan:

- briefing, prompt y función del anuncio;
- flujo de Copy y Diseño;
- referencias, formatos y carruseles;
- diferencia entre inteligencia artificial y agente;
- autonomía, MCP, Skill y Plugin;
- Todoist, agendamientos y montaje de la máquina.

La respuesta correcta está distribuida de forma equilibrada: cinco preguntas por cada letra A, B, C y D. La secuencia de letras se mantiene estable para conservar la compatibilidad con la corrección externa. La fuente única de preguntas y clave de corrección del sitio está en `src/data/survey.ts`.

## Enlaces configurados

- `formUrl`: abre la interfaz de encuesta dentro del sitio.
- `appScriptUrl`: registra las respuestas y permite cargarlas en `/admin/`.
- `sheetUrl`: abre la pestaña **Respuestas** como respaldo.
