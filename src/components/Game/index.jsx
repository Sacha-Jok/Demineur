import styles from "./styles.module.scss";

const Game = () => {
  let dif = '';

  const handleEasyClick = () => {start({caseNb:9,mineNb:10})};
  const handleMediumClick = () => {start({caseNb:16,mineNb:40})};
  const handleHardClick = () => {start({caseNb:22,mineNb:99})};

  const start = (value) => {
    dif = value
    const caseNb = dif.caseNb,dim = caseNb*caseNb,game = document.getElementById('gameSection');
    game.style.width=caseNb*(24)+'px';
    const mineNb = dif.mineNb,nearMine = [],arr = [];
    game.innerHTML='';
    
    for (let i=0; i<dim;i++){
      arr[i]=i; nearMine[i]=0;
      let Case = document.createElement('div');
      Case.id='case'+i;
      Case.className=styles.__cases;
      game.appendChild(Case);
    }
  };

  return (
    <>
    <div>Je veux jouer</div>
    <div className={styles.__buttons}>
      <button aria-label="Easy" type="button" className={styles.__button} onClick={handleEasyClick}>Facile</button>
      <button aria-label="Medium" type="button" className={styles.__button} onClick={handleMediumClick}>Moyen</button>
      <button aria-label="Hard" type="button" className={styles.__button} onClick={handleHardClick}>Difficile</button>
    </div>
    </>
  );
}

export default Game;