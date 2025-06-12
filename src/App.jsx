// App.jsx
import { useState, useEffect } from "react";
import getRandomPokemon from "./components/cards";

const initialCards = [
  { id: 1, name: "A" },
  { id: 2, name: "B" },
  { id: 3, name: "C" },
  { id: 4, name: "D" },
  { id: 5, name: "E" },
  { id: 6, name: "F" },
  { id: 7, name: "G" },
  { id: 8, name: "H" },
];

function App() {
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [maxScore, setMaxScore] = useState(0);

  console.log(getRandomPokemon());


  useEffect(() => {
    shuffleCards();
  }, []);

  useEffect(() => {
    if (score > maxScore) {
      setMaxScore(score);
    }
  }, [score])

  function shuffleCards() {
    const shuffled = [...initialCards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
  }

  function handleCardClick(id) {
    if (clicked.includes(id)) {
      alert("Game Over!");
      setClicked([]);
      setScore(0);
    } else {
      setClicked([...clicked, id]);
      setScore(score + 1);
    }
    shuffleCards();
  }

  return (
    <div>
      <h1>Memory Card Game</h1>
      <p>Score: {score}</p>
      <p>Max Score: {maxScore}</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        {cards.map((card) => (
          <button key={card.id} onClick={() => handleCardClick(card.id)}>
            {card.name}
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
