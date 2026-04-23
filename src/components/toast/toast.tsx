import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import './toast.css'


export default function Toast() {
  const [toasts, setToasts] = useState<{ id: number; text: string }[]>([]);

  const addToast = useCallback((text: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, text }]);
    
    //reomve after 3s
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  }, []);

  useEffect(() => {
    const handler = (e: any) => addToast(e.detail);
    window.addEventListener('toast_notify', handler);
    return () => window.removeEventListener('toast_notify', handler);
  }, [addToast]);

  if (toasts.length === 0) return null;

    return createPortal(
    <div className="toast">
      {toasts.map((toast) => (
        <div key={toast.id} className="toast-item animate-in">
          {toast.text}
        </div>
      ))}
    </div>,
    document.body
  );
}