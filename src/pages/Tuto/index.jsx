import Navbar from '../../components/Navbar';
import Step from '../../components/Step';

import styles from "./styles.module.scss";

const Tuto = () => {
    return (
        <div>
            <Navbar />
            <div className={styles.__steps}><Step /></div>
        </div>
    );
};

export default Tuto;