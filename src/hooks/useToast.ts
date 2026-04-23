export const showToast = (text: string) => {
  window.dispatchEvent(new CustomEvent('toast_notify', { detail: text }));
};