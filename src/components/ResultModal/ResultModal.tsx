import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetProgress } from '../../store/mainSlice';
import { TEXTAREA_PLACEHOLDER } from '../../constants';
import { ErrorsInText, Result } from '../../typed';
import xmarkIcon from '../../assets/images/xmark.svg';
import styles from './ResultModal.module.css';

const initialState: Result = {
  typedText: [],
  wordPerMinutes: null,
  errorsInText: {
    incorrect: 0,
    extra: 0,
    missed: 0,
  },
};

const ResultModal = () => {
  const dispatch = useAppDispatch();
  const { typedText, minutes, seconds } = useAppSelector((state) => state.main);

  const [result, setResult] = useState<Result>(initialState);

  const isTyped = useMemo(
    () =>
      typedText.length !== 0 &&
      typedText.length === TEXTAREA_PLACEHOLDER.length &&
      typedText[typedText.length - 1].length ===
        TEXTAREA_PLACEHOLDER[TEXTAREA_PLACEHOLDER.length - 1].length,
    [typedText],
  );

  const calculateWPM = useCallback((): number => {
    const wordCount = typedText.length;
    const totalMinutes = minutes + seconds / 60;

    const minTime = 0.01;
    const effectiveMinutes = Math.max(totalMinutes, minTime);
    const wpm = wordCount / effectiveMinutes;

    return wpm;
  }, [typedText.length, minutes, seconds]);

  const calculateErrorsInText = useCallback((): ErrorsInText => {
    const errorsInText: ErrorsInText = {
      incorrect: 0,
      extra: 0,
      missed: 0,
    };

    if (typedText.length === 0) return errorsInText;

    const placeholder = TEXTAREA_PLACEHOLDER;

    typedText.forEach((word, index) => {
      word.split('').forEach((letter, letterIndex) => {
        if (
          word.length > placeholder[index].length &&
          letterIndex > placeholder[index].length - 1
        ) {
          errorsInText.extra++;
        } else if (word.length < placeholder[index].length && letterIndex === word.length - 1) {
          errorsInText.missed += placeholder[index].length - word.length;
        } else if (letter !== placeholder[index][letterIndex]) {
          errorsInText.incorrect++;
        }
      });
    });

    return errorsInText;
  }, [typedText]);

  useEffect(() => {
    if (!isTyped) return;

    if (!result.typedText.length) {
      setResult((prevState) => ({
        ...prevState,
        typedText,
        wordPerMinutes: Math.round(calculateWPM()),
        errorsInText: calculateErrorsInText(),
      }));

      dispatch(resetProgress());
    }
  }, [isTyped, result.typedText.length, typedText, calculateWPM, calculateErrorsInText, dispatch]);

  if (!result.typedText.length && !isTyped) return null;

  return (
    <>
      <div className={styles.backdrop} onClick={() => setResult(initialState)}></div>

      <div className={styles.modal}>
        <img
          className={styles.close}
          src={xmarkIcon}
          alt="xmark-icon"
          onClick={() => setResult(initialState)}
        />

        <h3 className={styles.title}>Test Completed</h3>

        <div className={styles.result}>
          <h4>
            <span title="Word Per Second">WPM</span>
            <span>{result.wordPerMinutes}</span>
          </h4>

          <div>
            <h4>
              <span>Errors in text</span>

              <span>
                {result.errorsInText.incorrect +
                  result.errorsInText.extra +
                  result.errorsInText.missed}
              </span>
            </h4>

            <div className={styles.errors_info}>
              {result.errorsInText.incorrect > 0 && (
                <h4>
                  <span>Incorrect</span>
                  <span>{result.errorsInText.incorrect}</span>
                </h4>
              )}

              {result.errorsInText.extra > 0 && (
                <h4>
                  <span>Extra</span>
                  <span>{result.errorsInText.extra}</span>
                </h4>
              )}

              {result.errorsInText.missed > 0 && (
                <h4>
                  <span>Missed</span>
                  <span>{result.errorsInText.missed}</span>
                </h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ResultModal);
