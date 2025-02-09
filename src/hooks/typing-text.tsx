import { useEffect, useState } from 'react';

interface TypingTextProps {
  text: string;
  delay?: number;
}

export const TypingText = ({ text, delay = 100 }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[index]);
        setIndex((prevIndex) => prevIndex + 1);
      }, delay);

      return () => clearTimeout(timeoutId); // Clear timeout on unmount or re-render
    }
  }, [index, text, delay]);

  return <span>{displayedText}</span>;
};
