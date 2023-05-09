import logo from '../../assets/images/bomb.svg';
import { Link } from 'react-router-dom';

import styles from "./styles.module.scss";
import DarkMode from '../DarkMode';

const Navbar = () => (
    <nav className={styles.__navbar}>
      <div></div>
      <Link to="/tuto" className={styles.__link}><h2 className={styles.__subtitle}>Comment jouer ?</h2></Link>
      <Link to="/"><div className={styles.__logo}><img className={`logo ${styles.__bomb}`} src={logo} alt="bomb logo" /><h1 className={styles.__title}>DEMINEUR</h1></div></Link>
      <Link to="/leaderboard" className={styles.__link}><h2 className={styles.__subtitle}>Classement</h2></Link>
      <DarkMode className={styles.__darkLogo} />
    </nav>
);

export default Navbar;