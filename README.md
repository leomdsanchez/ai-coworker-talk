# Inteligencia Artificial aplicada al trabajo

Presentación web para la charla de la Facultad de Economía. La interfaz usa una estética editorial inspirada en distill.pub, navegación vertical por scroll, teclado y controles en pantalla, con adaptación para móviles.

Contenido actual: las 42 pantallas de la estructura definida en Notion, desde la apertura y la secuencia progresiva de doce noticias hasta la evolución conversacional, delegada, agéntica e integrada, la arquitectura técnica, la demo y el cierre. Cuando una fuente, un gráfico, un video o una demostración todavía no están definidos, la pantalla correspondiente conserva su lugar mediante un placeholder explícito.

La arquitectura narrativa completa, desde el boom conversacional hasta la integración de agentes en el trabajo, está documentada en [`CONTENT_STRUCTURE.md`](./CONTENT_STRUCTURE.md).

Fuentes de los recortes: Reuters, Nous Research, Anthropic, OpenAI, Paperclip, GitHub y Gartner.

## Controles

- `↓`, `→`, `Espacio`, `Enter` o scroll: avanzar; dentro de la diapositiva de noticias, revela la siguiente noticia sin hacer scroll. Después de `12/12`, un avance adicional inicia la ráfaga y conduce a «¡Calma!».
- `↑`, `←`, `Backspace` o scroll: volver; dentro de la diapositiva de noticias, oculta la última noticia revelada.
- `Home` / `End`: primera o última diapositiva.
- Controles laterales e inferiores: navegación directa.

## Desarrollo

```bash
npm install
npm run dev
npm run build
```

## Publicación

Cada actualización de `main` publica automáticamente en GitHub Pages:

`https://leomdsanchez.github.io/ai-coworker-talk/`
