import { useState } from 'react';

import styles from "./styles.module.scss";

const DarkMode = () => {
  const [theme, setTheme] = useState(false);

  const changeTheme = () => {
    setTheme(!theme)
    document.body.classList.toggle("dark");
  }
 
  return (
    <div>
      <button onClick={changeTheme} className={styles.__button}>
        <svg className={theme ? styles.__fill : styles.__empty} viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"><rect fill="none" height="256" width="256"/><path d="M216.7,152.6A91.9,91.9,0,0,1,103.4,39.3h0A92,92,0,1,0,216.7,152.6Z" fill="currentColor" stroke="$strokeColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
      </button>
    </div>
  );
}

export default DarkMode;