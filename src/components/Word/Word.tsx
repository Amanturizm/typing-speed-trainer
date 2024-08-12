import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { nanoid } from 'nanoid';
import { TEXTAREA_PLACEHOLDER } from '../../constants';
import styles from './Word.module.css';

interface Props {
  word: string;
  index: number;
}

const Word: React.FC<Props> = ({ word, index }) => {
  const { typedText, isFocused } = useAppSelector((state) => state.main);

  const checkCorrectnessAndReturnColor = (firstIndex: number, secondIndex: number): string => {
    if (!typedText.length || !typedText[firstIndex] || !typedText[firstIndex][secondIndex])
      return '#646669';

    if (TEXTAREA_PLACEHOLDER[firstIndex][secondIndex] !== typedText[firstIndex][secondIndex]) {
      return '#D22B2B';
    } else {
      return '#fff';
    }
  };

  const isIncorrectWord =
    typedText.length &&
    typedText[index] &&
    typedText.length - 1 > index &&
    (typedText[index].length < TEXTAREA_PLACEHOLDER[index].length ||
      TEXTAREA_PLACEHOLDER[index] !== typedText[index]);

  return (
    <span
      className={styles.word}
      style={{
        borderBottom: isIncorrectWord ? '0.2vw solid #D22B2B' : 'none',
        marginBottom: isIncorrectWord ? '4px' : '7px',
      }}
    >
      {word.split('').map((letter, letterIndex) => (
        <span
          className={styles.letter}
          style={{ color: checkCorrectnessAndReturnColor(index, letterIndex) }}
          key={'letter-' + nanoid()}
        >
          {isFocused &&
            ((!typedText.length && index === 0) ||
              (typedText[index] === '' && letterIndex === 0) ||
              (index === typedText.length - 1 && letterIndex === typedText[index].length - 1)) && (
              <div
                className={styles.caret}
                style={{
                  left:
                    !typedText.length || (typedText[index] === '' && letterIndex === 0)
                      ? '0'
                      : 'none',
                  right: typedText.length ? '0' : 'none',
                }}
              ></div>
            )}

          {letter}
        </span>
      ))}
    </span>
  );
};

export default React.memo(Word);
