import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import styles from "./styles.module.scss";

const ErrorPage = () => {
    return (
        <div className={styles.__errorPage}>
            <Navbar />
            <div className={styles.__errorSection}>
                <p className={styles.__number}>404</p>
                <p className={styles.__message}>Il n'y a pas de mine à désamorcer ici !</p>
                <p className={styles.__link}><Link to="/play">Retourner sur la page d'accueil</Link></p>
            </div>
        </div>
    );
};

export default ErrorPage;