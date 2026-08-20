# Inteligencia Artificial aplicada al trabajo

Presentación web para la charla de la Facultad de Economía. La interfaz usa una estética editorial inspirada en distill.pub, navegación vertical por scroll, teclado y controles en pantalla, con adaptación para móviles.

Contenido actual: diapositivas 1, 2.1, 2.2, una única diapositiva 3 con doce noticias en español que aparecen progresivamente sin desplazar el viewport, una ráfaga acelerada de noticias y una diapositiva final «¡Calma!».

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
