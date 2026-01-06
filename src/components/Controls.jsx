import './Controls.css';

const Controls = ({ onGravityChange, onPause, onRestart, isPaused, disabled }) => {
  const handleGravityClick = (direction) => {
    if (!disabled) {
      onGravityChange(direction);
      if (window.changeGravity) {
        window.changeGravity(direction);
      }
    }
  };

  return (
    <div className="controls-container">
      <div className="gravity-controls">
        <div className="control-label">Gravity Direction</div>
        <div className="gravity-grid">
          <div className="grid-spacer"></div>
          <button
            className="gravity-btn up"
            onClick={() => handleGravityClick('up')}
            disabled={disabled}
            aria-label="Gravity Up"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
          <div className="grid-spacer"></div>
          
          <button
            className="gravity-btn left"
            onClick={() => handleGravityClick('left')}
            disabled={disabled}
            aria-label="Gravity Left"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="grid-center"></div>
          <button
            className="gravity-btn right"
            onClick={() => handleGravityClick('right')}
            disabled={disabled}
            aria-label="Gravity Right"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="grid-spacer"></div>
          <button
            className="gravity-btn down"
            onClick={() => handleGravityClick('down')}
            disabled={disabled}
            aria-label="Gravity Down"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </button>
          <div className="grid-spacer"></div>
        </div>
      </div>

      <div className="action-controls">
        <button
          className="action-btn pause-btn"
          onClick={onPause}
          disabled={disabled}
        >
          {isPaused ? (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Resume
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
              </svg>
              Pause
            </>
          )}
        </button>
        
        <button
          className="action-btn restart-btn"
          onClick={onRestart}
          disabled={disabled}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 4v6h6M23 20v-6h-6" />
            <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
          </svg>
          Restart
        </button>
      </div>
    </div>
  );
};

export default Controls;
