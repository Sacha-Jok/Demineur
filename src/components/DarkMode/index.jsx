import { useEffect, useState } from 'react';

import moon from '../../assets/images/moon.svg';
import sun from '../../assets/images/sun.svg';
import styles from "./styles.module.scss";

const DarkMode = () => {
  const [theme, setTheme] = useState('light');
  
  const changeTheme = () => {
    if (theme === 'dark') {
      localStorage.setItem('theme', 'light');
      setTheme('light');
    } else {
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme) {
      setTheme(localTheme);
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);
 
  return (
  <>
    <div>
      {theme === 'dark' ? (
          <button onClick={changeTheme} className={styles.__button}>
            <img className="logo sun" src={sun} alt="sun logo" />
          </button>
        ) : (
          <button onClick={changeTheme} className={styles.__button}>
            <img className="logo moon" src={moon} alt="moon logo" />
          </button>
        )}
    </div>
  </>
  );
  
}

export default DarkMode;