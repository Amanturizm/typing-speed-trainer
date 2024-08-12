import React, { useCallback, useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsFocused, setIsTyping, setTypedText } from '../../store/mainSlice';
import { nanoid } from 'nanoid';
import { TEXTAREA_PLACEHOLDER } from '../../constants';
import Word from '../Word/Word';
import styles from './Textarea.module.css';

const Textarea = () => {
  const dispatch = useAppDispatch();
  const { typedText, isTyping, isFocused } = useAppSelector((state) => state.main);

  const textareaRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const setFocus = (e: Event) => {
      if (textareaRef.current && textareaRef.current.contains(e.target as Node)) {
        inputRef.current?.focus();
      } else {
        dispatch(setIsFocused(false));
      }
    };

    document.body.addEventListener('click', setFocus);

    return () => {
      document.body.removeEventListener('click', setFocus);
    };
  }, [dispatch]);

  const handleTyping = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isFocused) return;

      if (!isTyping) dispatch(setIsTyping(true));

      const value = e.target.value;

      const result = value.trim().length ? value.split(/\s+/) : [];

      if (result.length && result[result.length - 1].length > 20) return;

      dispatch(setTypedText(result));
    },
    [isFocused, isTyping, dispatch],
  );

  // Prohibition of moving the input cursor and ctrl + a/c/v
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      ['ArrowLeft', 'ArrowRight'].includes(e.key) ||
      (e.ctrlKey && ['a', 'c', 'v'].includes(e.key.toLowerCase()))
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.textarea} ref={textareaRef}>
      <div className={styles.words}>
        {TEXTAREA_PLACEHOLDER.map((initialWord, index) => {
          let word = initialWord;

          if (typedText.length && typedText[index]?.length > initialWord.length) {
            word = initialWord + typedText[index].substring(initialWord.length);
          }

          return <Word word={word} index={index} key={'word-' + nanoid()} />;
        })}
      </div>

      <div className={styles.typing_words}>
        <input
          className={styles.input}
          ref={inputRef}
          value={typedText.join(' ')}
          onChange={handleTyping}
          onFocus={() => dispatch(setIsFocused(true))}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      </div>
    </div>
  );
};

export default Textarea;
