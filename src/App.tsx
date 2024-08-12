import Stopwatch from './components/Stopwatch/Stopwatch';
import Textarea from './components/Textarea/Textarea';
import styles from './App.module.css';

const App = () => (
  <div className={styles.wrapper}>
    <Stopwatch />
    <Textarea />
  </div>
);

export default App;
