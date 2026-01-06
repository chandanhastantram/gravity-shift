import { useState, useEffect } from 'react';
import GameCanvas from './components/GameCanvas';
import Controls from './components/Controls';
import HUD from './components/HUD';
import LevelSelector from './components/LevelSelector';
import { levels } from './data/levels';
import './App.css';

function App() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, paused, levelComplete, gameOver
  const [currentLevelId, setCurrentLevelId] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [completedLevels, setCompletedLevels] = useState([]);
  const [collectedStars, setCollectedStars] = useState(0);
  const [showLevelSelector, setShowLevelSelector] = useState(false);

  const currentLevel = levels.find(l => l.id === currentLevelId);

  const handleStartGame = () => {
    setGameState('playing');
    setScore(0);
    setLives(3);
    setCompletedLevels([]);
    setCurrentLevelId(1);
    setCollectedStars(0);
  };

  const handleLevelComplete = (stars) => {
    const levelScore = 100 + (stars * 50);
    setScore(prev => prev + levelScore);
    
    if (!completedLevels.includes(currentLevelId)) {
      setCompletedLevels(prev => [...prev, currentLevelId]);
    }
    
    setGameState('levelComplete');
  };

  const handleNextLevel = () => {
    if (currentLevelId < levels.length) {
      setCurrentLevelId(prev => prev + 1);
      setCollectedStars(0);
      setGameState('playing');
    } else {
      setGameState('gameComplete');
    }
  };

  const handleRestartLevel = () => {
    setCollectedStars(0);
    setGameState('playing');
  };

  const handlePause = () => {
    setGameState(prev => prev === 'paused' ? 'playing' : 'paused');
  };

  const handleStarCollected = () => {
    setCollectedStars(prev => prev + 1);
    setScore(prev => prev + 10);
  };

  const handleSelectLevel = (levelId) => {
    setCurrentLevelId(levelId);
    setCollectedStars(0);
    setShowLevelSelector(false);
    setGameState('playing');
  };

  const handleMainMenu = () => {
    setGameState('menu');
    setShowLevelSelector(false);
  };

  return (
    <div className="app">
      {gameState === 'menu' && (
        <div className="menu-screen">
          <div className="menu-container glass">
            <h1 className="game-title">
              <span className="title-gravity">GRAVITY</span>
              <span className="title-shift">SHIFT</span>
            </h1>
            <p className="game-subtitle">Control gravity. Navigate the maze. Reach the goal.</p>
            
            <div className="menu-buttons">
              <button className="menu-btn primary" onClick={handleStartGame}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Start Game
              </button>
              
              <button className="menu-btn secondary" onClick={() => setShowLevelSelector(true)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                </svg>
                Level Select
              </button>
            </div>

            <div className="instructions">
              <h3>How to Play</h3>
              <ul>
                <li>Use arrow buttons to change gravity direction</li>
                <li>Guide the ball to the goal</li>
                <li>Collect stars for bonus points</li>
                <li>Avoid running out of lives</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {(gameState === 'playing' || gameState === 'paused') && (
        <>
          <HUD
            score={score}
            lives={lives}
            level={currentLevel}
            stars={collectedStars}
            totalStars={currentLevel.stars.length}
          />
          
          <div className="game-layout">
            <GameCanvas
              level={currentLevel}
              onLevelComplete={handleLevelComplete}
              onStarCollected={handleStarCollected}
              isPaused={gameState === 'paused'}
            />
            
            <Controls
              onGravityChange={() => {}}
              onPause={handlePause}
              onRestart={handleRestartLevel}
              isPaused={gameState === 'paused'}
              disabled={false}
            />
          </div>

          <div className="bottom-actions">
            <button className="bottom-btn" onClick={handleMainMenu}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              </svg>
              Main Menu
            </button>
            <button className="bottom-btn" onClick={() => setShowLevelSelector(true)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
              Levels
            </button>
          </div>
        </>
      )}

      {gameState === 'levelComplete' && (
        <div className="overlay-screen">
          <div className="result-container glass">
            <h2 className="result-title">Level Complete!</h2>
            <div className="result-stats">
              <div className="stat-item">
                <div className="stat-label">Stars Collected</div>
                <div className="stat-value">{collectedStars} / {currentLevel.stars.length}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Score</div>
                <div className="stat-value">{score}</div>
              </div>
            </div>
            <div className="result-buttons">
              <button className="result-btn primary" onClick={handleNextLevel}>
                {currentLevelId < levels.length ? 'Next Level' : 'View Results'}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
              <button className="result-btn secondary" onClick={handleRestartLevel}>
                Retry Level
              </button>
              <button className="result-btn secondary" onClick={handleMainMenu}>
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'gameComplete' && (
        <div className="overlay-screen">
          <div className="result-container glass">
            <h2 className="result-title">Congratulations!</h2>
            <p className="result-message">You've completed all levels!</p>
            <div className="result-stats">
              <div className="stat-item">
                <div className="stat-label">Final Score</div>
                <div className="stat-value">{score}</div>
              </div>
              <div className="stat-item">
                <div className="stat-label">Levels Completed</div>
                <div className="stat-value">{completedLevels.length} / {levels.length}</div>
              </div>
            </div>
            <div className="result-buttons">
              <button className="result-btn primary" onClick={handleStartGame}>
                Play Again
              </button>
              <button className="result-btn secondary" onClick={handleMainMenu}>
                Main Menu
              </button>
            </div>
          </div>
        </div>
      )}

      {showLevelSelector && (
        <LevelSelector
          levels={levels}
          currentLevel={currentLevelId}
          completedLevels={completedLevels}
          onSelectLevel={handleSelectLevel}
          onClose={() => setShowLevelSelector(false)}
        />
      )}
    </div>
  );
}

export default App;
