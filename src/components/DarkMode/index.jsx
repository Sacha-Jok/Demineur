import { useState } from 'react';

import moon from '../../assets/images/moon.svg';
import styles from "./styles.module.scss";

const DarkMode = () => {
  const [theme, setTheme] = useState(false);

  const changeTheme = () => {
    setTheme(!theme)
    document.body.classList.toggle("dark");
  }
 
  return (
    <div>
      <button onClick={changeTheme} className={styles.__button}><img className='logo' src={moon} alt="moon logo" /></button>
    </div>
  );
}

export default DarkMode;