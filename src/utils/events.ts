export function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false

  return Boolean(target.closest('a, button, input, select, textarea, [contenteditable="true"]'))
}
