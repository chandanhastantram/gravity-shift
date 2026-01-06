import './HUD.css';

const HUD = ({ score, lives, level, stars, totalStars }) => {
  return (
    <div className="hud-container">
      <div className="hud-item">
        <div className="hud-label">Level</div>
        <div className="hud-value">{level.id}</div>
        <div className="hud-sublabel">{level.name}</div>
      </div>

      <div className="hud-item">
        <div className="hud-label">Score</div>
        <div className="hud-value">{score}</div>
      </div>

      <div className="hud-item">
        <div className="hud-label">Stars</div>
        <div className="hud-value">
          {stars} / {totalStars}
        </div>
        <div className="star-display">
          {[...Array(totalStars)].map((_, i) => (
            <svg
              key={i}
              viewBox="0 0 24 24"
              className={`star-icon ${i < stars ? 'collected' : ''}`}
            >
              <path
                d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                fill={i < stars ? '#6a6a6a' : 'none'}
                stroke="#6a6a6a"
                strokeWidth="2"
              />
            </svg>
          ))}
        </div>
      </div>

      <div className="hud-item">
        <div className="hud-label">Lives</div>
        <div className="hud-value">{lives}</div>
        <div className="lives-display">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={`life-indicator ${i < lives ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <div className="difficulty-badge" data-difficulty={level.difficulty.toLowerCase()}>
        {level.difficulty}
      </div>
    </div>
  );
};

export default HUD;
