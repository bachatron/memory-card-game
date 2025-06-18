import { useState, useEffect } from "react";
import createNumberOfCards from "./components/cards"; // Your existing function
import "./App.css"; // Modern clean CSS

function getCardCountForDifficulty(level) {
  switch (level) {
    case "easy":
      return 8;
    case "medium":
      return 12;
    case "hard":
      return 20;
    case "vHard":
      return 40;
    default:
      return 12;
  }
}

function getShuffledCards(level) {
  const count = getCardCountForDifficulty(level);
  return createNumberOfCards(count).sort(() => Math.random() - 0.5);
}

function App() {
  const [difficulty, setDifficulty] = useState("medium");
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [showGameOver, setShowGameOver] = useState(false);
  const [showWinModal, setShowWinModal] = useState(false);


  useEffect(() => {
    setCards(getShuffledCards(difficulty));
    setClicked([]);
    setScore(0);
    setShowGameOver(false);
  }, [difficulty]);

  useEffect(() => {
    if (score > maxScore) {
      setMaxScore(score);
    }

    const cardCount = getCardCountForDifficulty(difficulty);
    if (score === cardCount) {
      setShowWinModal(true);
    }
  }, [score, difficulty, maxScore]);

  function handleCardClick(id) {
    if (clicked.includes(id)) {
      setShowGameOver(true);
    } else {
      setClicked([...clicked, id]);
      setScore(score + 1);
    }
    shuffleCards();
  }

  function shuffleCards() {
    setCards(prev => [...prev].sort(() => Math.random() - 0.5));
  }

  function resetGame() {
    setClicked([]);
    setScore(0);
    setShowGameOver(false);
    setCards(getShuffledCards(difficulty));
  }

  function continueAfterWin() {
    setClicked([]);
    setScore(0);
    setShowWinModal(false);
    setCards(getShuffledCards(difficulty));
  }


  return (
    <div className="app-container">
      <h1>Pokemon Memory Game</h1>

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="difficulty">Difficulty: </label>
        <select
          id="difficulty"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy (8)</option>
          <option value="medium">Medium (12)</option>
          <option value="hard">Hard (20)</option>
          <option value="vHard">Very Hard(40)</option>
          
        </select>
      </div>

      <div className="scoreboard">
        <p>Score: {score} | Max Score: {maxScore}</p>
      </div>

      <div className="cards-container">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            className="card-button"
          >
            <img
              src={card.url}
              alt={`Artwork for ID ${card.id}`}
            />
          </button>
        ))}
      </div>

      {showGameOver && (
        <div className="game-over-modal">
          <div className="modal-content">
            <h2>Game Over!</h2>
            <p>Your score was {score}.</p>
            <button onClick={resetGame}>Play Again</button>
          </div>
        </div>
      )}

      {showWinModal && (
        <div className="game-over-modal">
          <div className="modal-content">
            <h2>🎉 You Win!</h2>
            <p>You cleared all {getCardCountForDifficulty(difficulty)} cards!</p>
            <button onClick={continueAfterWin}>Play Again</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
