import { Link } from 'react-router-dom';
import logo from '../../assets/images/bombIcon.svg';

import styles from "./styles.module.scss";

const Navbar = () => (
    <nav className={styles.__navbar}>
      <img className={styles.__logo} src={logo} alt="bomb logo" />
      <div className={styles.__link}>
        <Link to="/tuto">Comment jouer ?</Link>
        <Link to="/leaderboard">Classement</Link>
      </div>
    </nav>
);

export default Navbar;