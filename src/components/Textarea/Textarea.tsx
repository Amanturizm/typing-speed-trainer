import React, { useEffect, useRef, useState } from 'react';
import { nanoid } from 'nanoid';
import styles from './Textarea.module.css';

interface Props {
  placeholder: string[];
}

const Textarea: React.FC<Props> = ({ placeholder }) => {
  const [value, setValue] = useState<string[]>([]);

  const [isFocused, setIsFocused] = useState<boolean>(false);
  const textareaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const setFocus = (e: Event) => {
      if (textareaRef.current && textareaRef.current.contains(e.target as Node)) {
        inputRef.current?.focus();
      } else {
        setIsFocused(false);
      }
    };
    document.body.addEventListener('click', setFocus);

    return () => {
      document.body.removeEventListener('click', setFocus);
    };
  }, []);

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isFocused) {
      const val = e.target.value.trim().length ? e.target.value.split(/\s+/) : [];
      setValue(val);
    }
  };

  // Prohibition of moving the input cursor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const checkCorrectnessAndReturnColor = (firstIndex: number, secondIndex: number): string => {
    if (!value.length || !value[firstIndex] || !value[firstIndex][secondIndex]) return '#646669';

    if (placeholder[firstIndex][secondIndex] !== value[firstIndex][secondIndex]) {
      return '#D22B2B';
    } else {
      return '#fff';
    }
  };

  return (
    <div className={styles.textarea} ref={textareaRef}>
      <div className={styles.words}>
        {placeholder.map((initialWord, wordIndex) => {
          let word = initialWord;

          if (value.length && value[wordIndex]?.length > initialWord.length) {
            word = initialWord + value[wordIndex].substring(initialWord.length);
          }

          return (
            <span className={styles.word} key={'word' + nanoid()}>
              {word.split('').map((letter, letterIndex) => (
                <span
                  className={styles.letter}
                  style={{ color: checkCorrectnessAndReturnColor(wordIndex, letterIndex) }}
                  key={'letter' + nanoid()}
                >
                  {isFocused &&
                    ((!value.length && wordIndex === 0) ||
                      (value[wordIndex] === '' && letterIndex === 0) ||
                      (wordIndex === value.length - 1 &&
                        letterIndex === value[wordIndex].length - 1)) && (
                      <div
                        className={styles.caret}
                        style={{
                          left:
                            !value.length || (value[wordIndex] === '' && letterIndex === 0)
                              ? '0'
                              : 'none',
                          right: value.length ? '0' : 'none',
                        }}
                      ></div>
                    )}

                  {letter}
                </span>
              ))}
            </span>
          );
        })}
      </div>

      <div className={styles.typing_words}>
        <input
          className={styles.input}
          ref={inputRef}
          value={value.join(' ')}
          onChange={handleTyping}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Textarea;
