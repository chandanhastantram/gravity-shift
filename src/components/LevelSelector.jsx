import './LevelSelector.css';

const LevelSelector = ({ levels, currentLevel, completedLevels, onSelectLevel, onClose }) => {
  return (
    <div className="level-selector-overlay">
      <div className="level-selector-container glass">
        <div className="selector-header">
          <h2>Select Level</h2>
          <button className="close-btn" onClick={onClose}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="levels-grid">
          {levels.map((level) => {
            const isCompleted = completedLevels.includes(level.id);
            const isLocked = level.id > 1 && !completedLevels.includes(level.id - 1);
            const isCurrent = currentLevel === level.id;

            return (
              <button
                key={level.id}
                className={`level-card ${isCompleted ? 'completed' : ''} ${
                  isLocked ? 'locked' : ''
                } ${isCurrent ? 'current' : ''}`}
                onClick={() => !isLocked && onSelectLevel(level.id)}
                disabled={isLocked}
              >
                {isLocked ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="lock-icon">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM9 6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9V6z" />
                  </svg>
                ) : (
                  <>
                    <div className="level-number">{level.id}</div>
                    <div className="level-name">{level.name}</div>
                    <div className="level-difficulty" data-difficulty={level.difficulty.toLowerCase()}>
                      {level.difficulty}
                    </div>
                    {isCompleted && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="check-icon">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                      </svg>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LevelSelector;
