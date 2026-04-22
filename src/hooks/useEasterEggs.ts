import { useEffect } from 'react';
import { useSecretCode } from './useKonami';

const CONFIG = {
  RAGE_CLICK: { THRESHOLD: 10, WINDOW_MS: 2000 },
  TOAST_DURATION: 2600,
  BSOD_DURATION: 2800,
};

const TRIGGER_RESPONSES: Record<string, string> = {
  'hello':       '> hello there, human.',
  'sudo rm -rf': '> absolutely not.',
  'sudo':        '> nice try. permission denied.',
  'hack':        '> accessing mainframe...\n> just kidding.',
  'vim':         '> good luck getting out of here.',
  'git blame':   '> it was definitely not me.',
  'npm install': '> node_modules will take a moment.\n> or a lifetime.',
};

const BSOD_STYLE = `
  position: fixed; inset: 0; background: #0000AA; color: #fff;
  font-family: "Courier New", monospace; fontSize: 14px; z-index: 999999;
  display: flex; flex-direction: column; justify-content: center;
  padding: 60px; line-height: 2; transition: opacity 0.5s;
`;

const TOAST_STYLE = `
  position: fixed; bottom: 80px; left: 50%; transform: translateX(-50%);
  background: rgba(4, 4, 13, 0.97); border: 1px solid rgba(147, 51, 234, 0.55);
  border-radius: 8px; padding: 12px 22px; color: #A855F7; z-index: 99999;
  font-family: "JetBrains Mono", monospace; font-size: 13px;
  white-space: pre-line; box-shadow: 0 0 28px rgba(147, 51, 234, 0.4);
  animation: __toastIn 0.3s ease; pointer-events: none;
`;

function createStyledElement(tag: string, css: string, id?: string) {
  const el = document.createElement(tag);
  if (id) el.id = id;
  el.style.cssText = css;
  return el;
}

function triggerBSOD() {
  if (document.getElementById('__bsod')) return;

  const el = createStyledElement('div', BSOD_STYLE, '__bsod');
  el.innerHTML = `
    <div style="font-size:64px; margin-bottom:24px">:(</div>
    <div style="font-size:20px; margin-bottom:20px; max-width:540px">
      Your PC ran into a problem and needs to restart.
    </div>
    <div style="opacity:0.75; font-size:12px; line-height:2.2">
      Stop code: RAGE_CLICK_OVERFLOW<br/>
      What failed: user.patience<br/>
      Collecting error info...&nbsp;&nbsp;100%
    </div>
    <div style="margin-top:40px;font-size:11px;opacity:0.5">

      For more information about this issue and possible fixes, visit<br/>

      https://lshanterl.github.io/touch-grass

    </div>
  `;

  document.body.appendChild(el);

  setTimeout(() => (el.style.opacity = '0'), CONFIG.BSOD_DURATION - 600);
  setTimeout(() => el.remove(), CONFIG.BSOD_DURATION);
}

let isToastActive = false;
function showToast(text: string) {
  if (isToastActive) return;
  isToastActive = true;

  if (!document.getElementById('__easter-egg-styles')) {
    const s = document.createElement('style');
    s.id = '__easter-egg-styles';
    s.textContent = `@keyframes __toastIn { 
      from { opacity:0; transform:translateX(-50%) translateY(14px); } 
      to { opacity:1; transform:translateX(-50%) translateY(0); } 
    }`;
    document.head.appendChild(s);
  }

  const el = createStyledElement('div', TOAST_STYLE);
  el.textContent = text;
  document.body.appendChild(el);

  setTimeout(() => {
    el.style.transition = 'opacity 0.5s';
    el.style.opacity = '0';
    setTimeout(() => {
      el.remove();
      isToastActive = false;
    }, 550);
  }, CONFIG.TOAST_DURATION);
}

function useRageClick() {
  useEffect(() => {
    let clicks: number[] = [];

    const handler = () => {
      const now = Date.now();
      clicks.push(now);
      clicks = clicks.filter(t => now - t < CONFIG.RAGE_CLICK.WINDOW_MS);

      if (clicks.length >= CONFIG.RAGE_CLICK.THRESHOLD) {
        clicks = [];
        triggerBSOD();
      }
    };

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);
}

function useMidnightFavicon() {
  useEffect(() => {
    const updateFavicon = () => {
      const hour = new Date().getHours();
      const isWitchingHour = hour >= 0 && hour < 6;
      
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }

      if (isWitchingHour) {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 32;
        const ctx = canvas.getContext('2d')!;
        ctx.font = '26px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💀', 16, 18);
        link.href = canvas.toDataURL();
      }
    };

    updateFavicon();
    const interval = setInterval(updateFavicon, 60000);
    return () => clearInterval(interval);
  }, []);
}

function useTypeAnywhere() {
  useEffect(() => {
    let buffer = '';
    const keys = Object.keys(TRIGGER_RESPONSES);
    const maxBuffer = Math.max(...keys.map(k => k.length));

    const handler = (e: KeyboardEvent) => {
      const isInput = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;
      if (isInput) return;

      //basically a sliding window of the n most recent characters
      buffer = (buffer + e.key).slice(-maxBuffer);

      for (const trigger of keys) {
        if (buffer.endsWith(trigger)) {
          showToast(TRIGGER_RESPONSES[trigger]);
          buffer = '';
          break;
        }
      }
    };

    window.addEventListener('keypress', handler);
    return () => window.removeEventListener('keypress', handler);
  }, []);
}

export function useEasterEggs() {
  useRageClick();
  useMidnightFavicon();
  useTypeAnywhere();

  useSecretCode('rust', () => {
    const isActive = document.body.classList.toggle('rust-mode');
    showToast(`Rust mode ${isActive ? 'activated' : 'deactivated'}!`);
  });
}