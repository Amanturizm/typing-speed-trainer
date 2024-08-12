import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { resetProgress, setMinutes, setSeconds } from '../../store/mainSlice';
import styles from './Stopwatch.module.css';

const Stopwatch = () => {
  const dispatch = useAppDispatch();
  const { isTyping, minutes, seconds } = useAppSelector((state) => state.main);

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      if (seconds === 59) {
        dispatch(setMinutes(minutes + 1));
        dispatch(setSeconds(0));
      } else {
        dispatch(setSeconds(seconds + 1));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isTyping, dispatch, minutes, seconds]);

  const timer =
    (minutes < 10 ? `0${minutes}` : minutes) + ':' + (seconds < 10 ? `0${seconds}` : seconds);

  return (
    <div className={styles.timer_wrapper}>
      <div className={styles.timer} style={{ color: isTyping ? '#fff' : '#646669' }}>
        {timer}
      </div>

      <button
        className={styles.reload}
        style={{ transform: `scale(${isTyping ? 1 : 0})` }}
        onClick={() => dispatch(resetProgress())}
      >
        <span></span>
        Reset
      </button>
    </div>
  );
};

export default React.memo(Stopwatch);
