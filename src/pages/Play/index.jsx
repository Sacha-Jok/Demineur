import Navbar from '../../components/Navbar';
import Game from '../../components/Game';

import styles from "./styles.module.scss";


const Play = () => {
    return (
        <div>
            <Navbar />
            <div className={styles.__gameSection}><Game /></div>
        </div>
    );
};

export default Play;