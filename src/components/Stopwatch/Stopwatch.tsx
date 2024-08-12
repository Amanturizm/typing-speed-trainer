import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setIsTyping, setTypedText } from '../../store/mainSlice';
import styles from './Stopwatch.module.css';

const Stopwatch = () => {
  const dispatch = useAppDispatch();
  const { isTyping } = useAppSelector((state) => state.main);

  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);

  const clearTimer = () => {
    setSeconds(0);
    setMinutes(0);

    dispatch(setIsTyping(false));
    dispatch(setTypedText([]));
  };

  useEffect(() => {
    if (!isTyping) return;

    const interval = setInterval(() => {
      if (seconds === 59) {
        setMinutes(minutes + 1);
        setSeconds(0);
      } else {
        setSeconds(seconds + 1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isTyping, seconds, minutes]);

  return (
    <div className={styles.timer_wrapper}>
      <div className={styles.timer} style={{ color: isTyping ? '#fff' : '#646669' }}>
        {(minutes < 10 ? `0${minutes}` : minutes) + ':' + (seconds < 10 ? `0${seconds}` : seconds)}
      </div>

      <button className={styles.reload} style={{ opacity: isTyping ? 1 : 0 }} onClick={clearTimer}>
        <span></span>
        Reset
      </button>
    </div>
  );
};

export default Stopwatch;
