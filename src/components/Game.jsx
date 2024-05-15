import { useState, useRef } from 'react';
import './Game.css';

 const Game = ({verifyLetter, pickedWord, pickedCategory, letters, guessedLetters, wrongLetters, guesses, score })=>{

    const [letter, setLetter] = useState('');
    const letterInputRef = useRef(null); // the current command uses the reference as it was in the DOM

    const handleSubmit = (e) => {
        e.preventDefault();
        verifyLetter(letter);
        setLetter('');
        letterInputRef.current.focus(); // the current command uses the reference as it was in the DOM 
    }

    return(
        <div className='game'>
            <p className='points'>
                <span>Points: {score}</span>
            </p>
            <h1>Guess the Word</h1>
            <h3 className='tip'>
                Word Tip: <span>{pickedCategory}</span>
            </h3>
            <p className='remainig__guesses'>You still have {guesses} guess(es).</p>
            <div className='wordContainer'>
                {letters.map((letter, i)=>(
                    guessedLetters.includes(letter) ? (
                        <span key={i} className='letter'> {letter} </span>
                    ) : (
                        <span key={i} className='blank__square'></span>
                    )
                ))}
            </div>
            <div className='letterContainer'>
                <p>Guess a letter of the word:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text" name='letter' maxLength={1} required 
                        onChange={(e)=>setLetter(e.target.value)} 
                        value={letter} 
                        ref={letterInputRef} 
                    />
                    <button>Play!</button>
                </form>
            </div>
            <div className="wrong__letters_container">
                <p>Letters already used:</p>
                {wrongLetters.map((letter, i)=>(
                    <span key={i}>{letter}, </span>
                ))}
            </div>
        </div>
    );
};

export default Game;