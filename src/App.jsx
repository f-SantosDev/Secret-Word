//CSS
import './App.css';

//React
import { useCallback, useEffect, useState } from 'react';

//Data
import { wordList } from './data/wordsList';

//Components
import StartScreen from './components/StartScreen';
import Game from './components/Game';
import GameOver from './components/GameOver';

const stages = [
  {id: 1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
];

const guessesQty = 3;

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordList);

  const [pickedWord, setPickedWord] = useState('');
  const [pickedCategory, setPickedCategory] = useState('');
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([]);
  const [wrongLetters, setWorngLetters] = useState([]);
  const [guesses, setGuesses] = useState(guessesQty);
  const [score, setScore] = useState(0);

  const pickWordAndCategory = useCallback(()=>{
    //Pick a random category
    const categories = Object.keys(words);
    //const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]; alterei a linha para a de baixo pois precisava apenas do tamanho do array
    const category = categories[Math.floor(Math.random() * categories.length)];

    const word = words[category][Math.floor(Math.random() * words[category].length)];

    return {word, category};
  }, [words]);

  // Starts the secret word game
  const startGame = useCallback(()=>{
    //reset all states
    clearLetterStates();

    //Pick word and pick category
    const {word, category} = pickWordAndCategory();

    //Create an array of letters
    let wordLetters = word.split('');
    wordLetters = wordLetters.map((letter)=>letter.toLowerCase());

    //Fill states
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);

    //Start the Game
    setGameStage(stages[1].name);
  }, [pickWordAndCategory]);

  // Process the letter input
  const verifyLetter = (letter)=>{
    //normalize the size of the letter
    const normalizedLetter = letter.toLowerCase();
    
    //check if letter has already been utilized
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    };

    //push guessed letter or remove a guess
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessLetters)=>[
        ...actualGuessLetters, 
        normalizedLetter
      ]);
    }else{
      setWorngLetters((actualWrongLetters)=>[
        ...actualWrongLetters, 
        normalizedLetter
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    };
  };

  const clearLetterStates = ()=>{
    setGuessedLetters([]);
    setWorngLetters([]);
  };

  // check if guesses ended
  useEffect(()=>{
   
    if (guesses <= 0){
      //reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    };
  }, [guesses]);

  // check win condition
  useEffect(()=>{
    const uniqueLetters = [...new Set(letters)]; // command exclude all repeted letter
    
    //win condition
    if(guessedLetters.length === uniqueLetters.length && gameStage != 'start'){
      //add score
      setScore((actualScore) => (actualScore += 100));

      //restart game with new word
      startGame();
    };
  }, [guessedLetters, letters, startGame]);

  //Restarts the game
  const retry = ()=>{
    // reset score and values after display the values on the game
    setScore(0);
    setGuesses(guessesQty);

    // restart the game - call the start screen
    setGameStage(stages[0].name);
  };


  return (
    <div className ="App">
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' && 
        <Game 
        verifyLetter={verifyLetter} 
        pickedWord={pickedWord} 
        pickedCategory={pickedCategory} 
        letters={letters} 
        guessedLetters={guessedLetters}
        wrongLetters={wrongLetters}
        guesses={guesses}
        score={score}
        />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  );
};

export default App;
