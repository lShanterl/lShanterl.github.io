import {useEffect, useState} from 'react';

export function useSecretCode(targetCode: string, callback: () => void) {
    const [input, setInput] = useState('');

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const newInput = (input + key).slice(-targetCode.length);
      setInput(newInput);

      if (newInput === targetCode.toLowerCase()) {
        callback();
        setInput('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input, targetCode, callback]);

}