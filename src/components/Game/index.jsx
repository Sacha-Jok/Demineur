import styles from "./styles.module.scss";
import { useEffect, useState } from "react";


const Game = () => {

  const [difficulty, setDifficulty] = useState('');
  const [visibility, setVisibility] = useState(false);
  //const [flag, setFlag] = useState('');

  const game = document.getElementById(styles.__gameSection);

  const handleEasyClick = () => {setDifficulty({caseNb:9,mineNb:10})};
  const handleMediumClick = () => {setDifficulty({caseNb:16,mineNb:40})};
  const handleHardClick = () => {setDifficulty({caseNb:22,mineNb:99})};
  const handleReplayClick = () => {start(); setVisibility(false)};
  const handleContextMenu = (e) => {
    e.preventDefault();
    if (document.getElementById(e.target.id).innerHTML === "") {
      document.getElementById(e.target.id).innerHTML = "🚩";
    }
  };

  const start = () => {
    let lvl = difficulty;
    const caseNb = lvl.caseNb, dim = caseNb * caseNb;
    game.style.width = caseNb * 27 + 'px';
    const mineNb = lvl.mineNb, randoms = [];
    game.innerHTML = '';
    game.addEventListener("contextmenu", handleContextMenu);

    /*Création des grilles en fonction de la difficulté sélectionnée*/
    for (let i = 0; i < dim; i++) {
      let Case = document.createElement('div');
      Case.id = 'case' + i;
      Case.className = styles.__cases;
      game.appendChild(Case);
    }

    /*Ajout des mines de manière aléatoire*/
    while (randoms.length < mineNb) {
      const random = Math.floor(Math.random() * dim);
      if (!randoms.includes(random)){
        randoms.push(random);
      }
    }

    /*Ecoute du clic de l'utilisateur*/
    document.onclick = (e) => {
      if (!e.target.id.startsWith('case')) return;
      const divNumber = parseInt(e.target.id.substring(4));
      revealCase(divNumber, randoms, caseNb, dim);
    };
  };

  const revealCase = (divNumber, randoms, caseNb, dim) => {
    const indices = [-caseNb - 1, -caseNb, -caseNb + 1, -1, +1, +caseNb - 1, +caseNb, +caseNb + 1];
    let count = 0;

    if (randoms.includes(divNumber)) {
      randoms.map((e) => (
        game.children[e].innerHTML = '💣'
      ));
      document.getElementById('case' + divNumber).style.backgroundColor = "red";
      setVisibility(true);
    } else {
      for (let i = 0; i < indices.length; i++) {
        const index = divNumber + indices[i];
        if (index >= 0 && index < dim && Math.abs(divNumber % caseNb - index % caseNb) < 2) {
          if (randoms.includes(index)) {
            count++;
          }
        }
      }
      if (count === 0) {
        const caseElement = document.getElementById('case' + divNumber);
        caseElement.style.innerHTML = '';
        revealAdjacentEmptyCases(divNumber, randoms, caseNb, dim);
      } else if (count > 0) {
        document.getElementById('case' + divNumber).innerHTML = count;
      }
    }
  };

  const revealAdjacentEmptyCases = (index, randoms, caseNb, dim) => {
    const indices = [-caseNb - 1, -caseNb, -caseNb + 1, -1, +1, +caseNb - 1, +caseNb, +caseNb + 1];

    for (let i = 0; i < indices.length; i++) {
      const adjacentIndex = index + indices[i];
      if (adjacentIndex >= 0 && adjacentIndex < dim && Math.abs(index % caseNb - adjacentIndex % caseNb) < 2) {
        const adjacentCase = document.getElementById('case' + adjacentIndex);
        if (adjacentCase.innerHTML === '') {
          const adjacentCount = revealAdjacentCount(adjacentIndex, randoms, caseNb, dim);
          if (adjacentCount === 0) {
            revealAdjacentEmptyCases(adjacentIndex, randoms, caseNb, dim);
          }
        }
      }
    }
    revealAdjacentCount(index, randoms, caseNb, dim)
  };

  const revealAdjacentCount = (index, randoms, caseNb, dim) => {
    const indices = [-caseNb - 1, -caseNb, -caseNb + 1, -1, +1, +caseNb - 1, +caseNb, +caseNb + 1];
    let count = 0;
    for (let i = 0; i < indices.length; i++) {
      const adjacentIndex = index + indices[i];
      if (adjacentIndex >= 0 && adjacentIndex < dim && Math.abs(index % caseNb - adjacentIndex % caseNb) < 2) {
        if (randoms.includes(adjacentIndex)) {
          count++;
        }
      }
    }
    document.getElementById('case' + index).innerHTML = count;
    return count;
  };

  useEffect(() => {
    if (difficulty) {
      start();
    }
  }, [difficulty]);
  
  return (
    <>
    <div className={styles.__container}>
      <div className={styles.__buttons}>
        <button aria-label="Easy" type="button" className={styles.__button} onClick={handleEasyClick}>Facile</button>
        <button aria-label="Medium" type="button" className={styles.__button} onClick={handleMediumClick}>Intermédiaire</button>
        <button aria-label="Hard" type="button" className={styles.__button} onClick={handleHardClick}>Difficile</button>
      </div>
      <div className={styles.__gameSection}>
        <div id={styles.__gameSection}></div>
        {visibility && <button aria-label="Rejouer" type="button" id={styles.__replay} className={styles.__button} onClick={handleReplayClick}>Rejouer</button>}
      </div>
    </div>
    </>
  );
}

export default Game;