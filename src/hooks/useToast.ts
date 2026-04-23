import { useEffect } from 'react';

export function showToast(text: string) {
  window.dispatchEvent(new CustomEvent('toast', { detail: text }))
}