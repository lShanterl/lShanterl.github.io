export function triggerBSOD() {
  window.dispatchEvent(new CustomEvent('bsod'))
}