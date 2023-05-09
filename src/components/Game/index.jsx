import styles from "./styles.module.scss";

const Game = () => {
  let lvl = '';

  const handleEasyClick = () => {start({caseNb:9,mineNb:10})};
  const handleMediumClick = () => {start({caseNb:16,mineNb:40})};
  const handleHardClick = () => {start({caseNb:22,mineNb:99})};

  const start = (value) => {
    lvl = value
    const caseNb = lvl.caseNb,dim = caseNb*caseNb,game = document.getElementById('gameSection');
    game.style.width=caseNb*25+'px';
    const mineNb = lvl.mineNb,nearMine = [], randoms = [];
    game.innerHTML='';
    
    /*Création des grilles en fonction de la difficulté sélectionnée*/ 
    for (let i=0;i<dim;i++){
      let Case = document.createElement('div');
      Case.id='case'+i;
      Case.className=styles.__cases;
      game.appendChild(Case);
    }

    /*Ajout des mines de manière aléatoire*/
    while (randoms.length<mineNb) {
      const random = Math.floor(Math.random() * dim);
      if (!randoms.includes(random)){
        randoms.push(random)
      }
    }
    randoms.map((e,i) => {
      game.children[e].innerHTML = 'X'
    })
    console.log(randoms)
   
  };

  return (
    <>
    <div className={styles.__buttons}>
      <button aria-label="Easy" type="button" className={styles.__button} onClick={handleEasyClick}>Facile</button>
      <button aria-label="Medium" type="button" className={styles.__button} onClick={handleMediumClick}>Intermédiaire</button>
      <button aria-label="Hard" type="button" className={styles.__button} onClick={handleHardClick}>Difficile</button>
    </div>
    <div></div>
    <div className={styles.__game} id="gameSection"></div>
    </>
  );
}

export default Game;