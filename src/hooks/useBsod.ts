export function triggerBSOD() {
  window.dispatchEvent(new CustomEvent('trigger_bsod'))
}