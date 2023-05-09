import styles from "./styles.module.scss";
import steps from "../../datas/tuto.json";

const Step = () => {
  
  return (
    steps.map(stepInfo =>
        <p key={stepInfo.id} className={styles.__step}>{stepInfo.text}</p>
    )
  );
}

export default Step;