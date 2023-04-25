import { Link } from 'react-router-dom';
import logo from '../../assets/images/bombIcon.svg';

import styles from "./styles.module.scss";

const Navbar = () => (
    <nav className={styles.__navbar}>
      <div className={styles.__link}>
        <Link to="/tuto">Comment jouer ?</Link>
      </div>
      <a href="/play">
        <div className={styles.__logo}>
            <img className={styles.__bomb} src={logo} alt="bomb logo" />
            <h1 className={styles.__title}>DEMINEUR</h1>
        </div>
      </a>
      <div className={styles.__link}>
        <Link to="/leaderboard">Classement</Link>
      </div>
    </nav>
);

export default Navbar;