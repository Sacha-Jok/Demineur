import styles from "./styles.module.scss";

const Game = () => {

  const handleEasyClick = () => {start({caseNb:9,mineNb:10})};
  const handleMediumClick = () => {start({caseNb:16,mineNb:40})};
  const handleHardClick = () => {start({caseNb:22,mineNb:99})};

  const start = (value) => {
    let lvl = value
    const caseNb = lvl.caseNb,dim = caseNb*caseNb,game = document.getElementById('gameSection');
    game.style.width=caseNb*27+'px';
    const mineNb = lvl.mineNb, randoms = [];
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
    
    /*randoms.map((e) => (
      game.children[e].innerHTML = '💣'
    ));*/

    document.onclick = (e) => {
      if (!e.target.id.startsWith('case')) return;
      const divNumber = parseInt(e.target.id.substring(4));
      
      // Vérifier les 8 cases autour de la case cliquée
      const indices = [-caseNb-1,-caseNb,-caseNb+1,-1,+1,+caseNb-1,+caseNb,+caseNb+1];
      let count = 0;
      for (let i = 0; i < indices.length; i++) {
        const index = divNumber + indices[i];
        // Vérifier que la case est valide (dans les limites de la grille)
        if (index >= 0 && index < dim && Math.abs(divNumber%caseNb-index%caseNb)<2) {
          // Vérifier si la case contient une mine
          if (randoms.includes(index)) {
            count++;
          }
        }
      }

      if (randoms.includes(divNumber)){
        randoms.map((e) => (
          game.children[e].innerHTML = '💣'
        ));
        document.getElementById(e.target.id).style.backgroundColor = "red";
        //alert('Vous avez perdu');
      } else if (count === 0) {
          document.getElementById(e.target.id).style.backgroundColor = "white"

      } else {
        document.getElementById(e.target.id).innerHTML = count
      };
    } 
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