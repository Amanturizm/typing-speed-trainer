import Stopwatch from './components/Stopwatch/Stopwatch';
import Textarea from './components/Textarea/Textarea';
import ResultModal from './components/ResultModal/ResultModal';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Stopwatch />
      <Textarea />
      <ResultModal />
    </div>
  );
};

export default App;
