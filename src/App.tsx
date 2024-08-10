import Textarea from './components/Textarea/Textarea';
import { TEXTAREA_PLACEHOLDER } from './constants';
import styles from './App.module.css';

const App = () => {
  return (
    <div className={styles.wrapper}>
      <Textarea placeholder={TEXTAREA_PLACEHOLDER} />
    </div>
  );
};

export default App;
