import './GameOver.css'

 const GameOver = ({retry, score, guesses})=>{
    return(
        <div className='game__over'>
            <h1>Game Over</h1>
            <h2>Your Score: <span>{score}</span></h2>
            <button onClick={retry}>Retry</button>
        </div>
    );
};

export default GameOver;