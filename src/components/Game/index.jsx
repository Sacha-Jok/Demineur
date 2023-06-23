import styles from "./styles.module.scss";
import { useEffect, useState } from "react";


const Game = () => {

  const [difficulty, setDifficulty] = useState();
  const [visibility, setVisibility] = useState(false);
  const [win, setWin] = useState(false);
  const [mine, setMine] = useState('');

  const game = document.getElementById(styles.__gameSection);

  const handleEasyClick = () => {
    setDifficulty({caseNb:9,mineNb:2});
  };
  const handleMediumClick = () => {
    setDifficulty({caseNb:16,mineNb:40});
  };
  const handleHardClick = () => {
    setDifficulty({caseNb:22,mineNb:99});
  };
  const handleReplayClick = () => {start(); setVisibility(false)};

  

  let randoms = [];
    
  const start = () => {
    setVisibility(false);
    setWin(false);
    stopTime();
    setTime(0)
    
    let lvl = difficulty;
    const caseNb = lvl.caseNb, dim = caseNb * caseNb;
    game.style.width = caseNb * 27 + 'px';
    document.getElementById("gameContainer").style.width = caseNb * 27 + 'px';

    const mineNb = lvl.mineNb;
    game.innerHTML = '';
    setMine("💣 " + mineNb);
    //setTime("0 🕑");

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
      game.onclick = (e, props) => {
        if (!e.target.id.startsWith('case')) return;
        if (!isRunning) {startTime()};
        const divNumber = parseInt(e.target.id.substring(4));
        revealCase(divNumber, randoms, caseNb, dim);
      };

      /* Detection clic droit pour ajouter le drapeau */
      game.oncontextmenu = (e, props) => {
        if (!e.target.id.startsWith('case')) return;
        if (!isRunning) {startTime()};
        e.preventDefault();
        setFlag(e);
    }
  }

  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 1000)
      console.log(time)
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const startTime = () => {
    setIsRunning(true);
  }
  const stopTime = () => {
    setIsRunning(false);
  }
  
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  /*let sec = 0;
  let min = 0;
  const [inter, setInter] = useState(null);
  
  const chrono = () => {
    sec++;
    if (sec === 60) {
      min++;
      sec=0;
    };
    setTime((min ? (min + " : ") : "") + (sec < 10 && min ? "0" : "") + sec + " 🕑");
  };
  
  const startTime = () => {
    if (!inter) {
      const interId = setInterval(chrono, 1000);
      setInter(interId);
    }
    console.log(inter)
  };

  const stopTime = () => {
    console.log("stoptime")
    clearInterval(inter);
    setInter(null);
  };*/

  /*Ajout des drapeaux au clic */
  let flagNb = 0;
  let flags = []
  const setFlag = (e) => {
    const targetElement = document.getElementById(e.target.id);
    const flagDiv = parseInt(e.target.id.substring(4));
    const currentContent = targetElement.innerHTML;
    if (!currentContent.includes("🚩")) {
      if (!currentContent) {
        flagNb++;
        flags.push(flagDiv);
        checkWin();
        targetElement.innerHTML = "🚩";
      } else {targetElement.innerHTML = currentContent}
    } else {
      flagNb--;
      flags.splice(flags.indexOf(flagDiv),1);
      targetElement.innerHTML = "";
    }
    setMine("💣 " + Math.max(difficulty.mineNb - flagNb, 0));
  };

  const checkWin = () => {
    if (randoms.every(e => {return flags.includes(e)})) {
      setWin(true);
    }
  }

  const revealCase = (divNumber, randoms, caseNb, dim) => {
    const indices = [-caseNb - 1, -caseNb, -caseNb + 1, -1, +1, +caseNb - 1, +caseNb, +caseNb + 1];
    let count = 0;

    if (randoms.includes(divNumber)) {
      randoms.map((e) => (game.children[e].innerHTML = '💣'));
      document.getElementById('case' + divNumber).style.backgroundColor = "red";
      stopTime();
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
      (count === 0) ? revealAdjacentEmptyCases(divNumber, randoms, caseNb, dim) : document.getElementById('case' + divNumber).innerHTML = count;
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
  // eslint-disable-next-line
  }, [difficulty]);
  
  return (
    <>
     <div className={styles.__gameSection}>
        <div className={styles.__buttons}>
          <button aria-label="Easy" type="button" className={styles.__button} onClick={handleEasyClick}>Facile</button>
          <button aria-label="Medium" type="button" className={styles.__button} onClick={handleMediumClick}>Intermédiaire</button>
          <button aria-label="Hard" type="button" className={styles.__button} onClick={handleHardClick}>Difficile</button>
        </div>
        {win && <div className={styles.__winBar}>
            <p>Vous avez gagné !</p>
            <button aria-label="Rejouer" type="button" id={styles.__winReplay} className={styles.__button} onClick={handleReplayClick}>Rejouer</button>
        </div>}
        <div id="gameContainer">
          <div className={styles.__gameData}>
            <div className={styles.__mineNb}>{mine}</div>
            <div className={styles.__time}>{minutes ? `${minutes} : ` : ""}{seconds ? `${seconds.toString().padStart(2, "0")} 🕑` : ""}</div>          
          </div>
          <div className={styles.__gameSection}>
            <div id={styles.__gameSection}></div>
            {visibility && <div className={styles.__buttonOverlay}>
              <button aria-label="Rejouer" type="button" id={styles.__replay} className={styles.__button} onClick={handleReplayClick}>Rejouer</button>
            </div>}
          </div>
        </div>
    </div>
    </>
  );
}

export default Game;