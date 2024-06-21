import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import Header from './components/Header';

function App() {
  const [cards, setCards] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=8');
        const data = await response.json();
        const cardsWithClicked = data.cards.map(card => ({ ...card, clicked: false }));
        setCards(cardsWithClicked);
      } catch (error) {
        console.error('Error fetching cards:', error);
      }
    };
    fetchCards();
  }, []); 

  const handleCardClick = (cardCode) => {
    const wasAlreadyClicked = cards.some(card => card.code === cardCode && card.clicked);

    if (wasAlreadyClicked) {
      console.log("Game Over - Card already clicked");
      setGameOver(true);
      return;
    }

    setCards(prevCards => prevCards.map(card => 
      card.code === cardCode ? { ...card, clicked: true } : card
    ));
    addToScore(); 
    shuffleCards();
  };

  useEffect(() => {
    if (gameOver) { 


      const resetGame = async () => {
        try {
          const response = await fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=8');
          const data = await response.json();
          const cardsWithClicked = data.cards.map(card => ({ ...card, clicked: false }));
          setCards(cardsWithClicked);
        } catch (error) {
          console.error('Error fetching cards:', error);
        }
      };
      resetGame();
      setCurrentScore(0);
      setGameOver(false); 
    }
  }, [gameOver]);

  const addToScore = () => {
    setCurrentScore(prevScore => {
      const newScore = prevScore + 1;
      if (newScore > highScore) {
        setHighScore(newScore);
      }
      return newScore;
    });
  };

  const shuffleCards = () => {
    setCards(prevCards => {
      const cardsToShuffle = [...prevCards];
      for (let i = cardsToShuffle.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cardsToShuffle[i], cardsToShuffle[j]] = [cardsToShuffle[j], cardsToShuffle[i]];
      }
      return cardsToShuffle;
    });
  };
  
  return (
    <>
      <Header highScore={highScore} currentScore={currentScore} />
      <div className="cardDiv">
        {cards.map((card) => (
          <Card
            key={card.code}
            cardData={card}
            onCardClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
}

export default App;
