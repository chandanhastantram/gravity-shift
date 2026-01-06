import { useEffect, useRef } from 'react';
import { Physics, BALL_RADIUS } from '../utils/physics';
import './GameCanvas.css';

const GameCanvas = ({ level, onLevelComplete, onStarCollected, isPaused }) => {
  const canvasRef = useRef(null);
  const ballRef = useRef({
    x: level.ball.x,
    y: level.ball.y,
    velocityX: 0,
    velocityY: 0
  });
  const physicsRef = useRef(new Physics());
  const animationRef = useRef(null);
  const starsRef = useRef([...level.stars]);

  useEffect(() => {
    ballRef.current = {
      x: level.ball.x,
      y: level.ball.y,
      velocityX: 0,
      velocityY: 0
    };
    starsRef.current = level.stars.map(star => ({ ...star, collected: false }));
  }, [level]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = 800;
    const height = 600;

    const gameLoop = () => {
      if (!isPaused) {
        physicsRef.current.updateBallPosition(ballRef.current, width, height);
        physicsRef.current.checkObstacleCollision(ballRef.current, level.obstacles);

        starsRef.current.forEach((star, index) => {
          if (!star.collected && physicsRef.current.checkStarCollision(ballRef.current, star)) {
            star.collected = true;
            onStarCollected();
          }
        });

        if (physicsRef.current.checkGoalCollision(ballRef.current, level.goal)) {
          const collectedStars = starsRef.current.filter(s => s.collected).length;
          onLevelComplete(collectedStars);
          return;
        }
      }

      // Clear canvas
      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(0, 0, width, height);

      // Draw obstacles - simple rectangles
      ctx.fillStyle = '#3d3d3d';
      ctx.strokeStyle = '#5a5a5a';
      ctx.lineWidth = 1;
      level.obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        ctx.strokeRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      });

      // Draw stars - simple shape
      starsRef.current.forEach(star => {
        if (!star.collected) {
          ctx.fillStyle = '#787878';
          ctx.beginPath();
          for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = star.x + Math.cos(angle) * 12;
            const y = star.y + Math.sin(angle) * 12;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
        }
      });

      // Draw goal - simple circle
      ctx.fillStyle = '#5a5a5a';
      ctx.strokeStyle = '#787878';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(level.goal.x, level.goal.y, level.goal.size / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Draw ball - simple circle with slight gradient
      const gradient = ctx.createRadialGradient(
        ballRef.current.x - 3,
        ballRef.current.y - 3,
        0,
        ballRef.current.x,
        ballRef.current.y,
        BALL_RADIUS
      );
      gradient.addColorStop(0, '#787878');
      gradient.addColorStop(1, '#3d3d3d');
      
      ctx.fillStyle = gradient;
      ctx.strokeStyle = '#e8e8e8';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(ballRef.current.x, ballRef.current.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [level, isPaused, onLevelComplete, onStarCollected]);

  const handleGravityChange = (direction) => {
    if (!isPaused) {
      physicsRef.current.setGravityDirection(direction);
    }
  };

  useEffect(() => {
    window.changeGravity = handleGravityChange;
    return () => {
      delete window.changeGravity;
    };
  }, [isPaused]);

  return (
    <div className="game-canvas-container">
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        className="game-canvas"
      />
    </div>
  );
};

export default GameCanvas;
