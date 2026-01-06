export const GRAVITY_FORCE = 0.5;
export const MAX_VELOCITY = 8;
export const BALL_RADIUS = 15;
export const FRICTION = 0.98;

export class Physics {
  constructor() {
    this.gravity = { x: 0, y: GRAVITY_FORCE };
  }

  setGravityDirection(direction) {
    switch (direction) {
      case 'down':
        this.gravity = { x: 0, y: GRAVITY_FORCE };
        break;
      case 'up':
        this.gravity = { x: 0, y: -GRAVITY_FORCE };
        break;
      case 'left':
        this.gravity = { x: -GRAVITY_FORCE, y: 0 };
        break;
      case 'right':
        this.gravity = { x: GRAVITY_FORCE, y: 0 };
        break;
      default:
        this.gravity = { x: 0, y: 0 };
    }
  }

  updateBallPosition(ball, canvasWidth, canvasHeight) {
    // Apply gravity
    ball.velocityX += this.gravity.x;
    ball.velocityY += this.gravity.y;

    // Limit velocity
    ball.velocityX = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, ball.velocityX));
    ball.velocityY = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, ball.velocityY));

    // Apply friction
    ball.velocityX *= FRICTION;
    ball.velocityY *= FRICTION;

    // Update position
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Boundary collision
    if (ball.x - BALL_RADIUS < 0) {
      ball.x = BALL_RADIUS;
      ball.velocityX = -ball.velocityX * 0.7;
    }
    if (ball.x + BALL_RADIUS > canvasWidth) {
      ball.x = canvasWidth - BALL_RADIUS;
      ball.velocityX = -ball.velocityX * 0.7;
    }
    if (ball.y - BALL_RADIUS < 0) {
      ball.y = BALL_RADIUS;
      ball.velocityY = -ball.velocityY * 0.7;
    }
    if (ball.y + BALL_RADIUS > canvasHeight) {
      ball.y = canvasHeight - BALL_RADIUS;
      ball.velocityY = -ball.velocityY * 0.7;
    }

    return ball;
  }

  checkObstacleCollision(ball, obstacles) {
    for (let obstacle of obstacles) {
      const closestX = Math.max(obstacle.x, Math.min(ball.x, obstacle.x + obstacle.width));
      const closestY = Math.max(obstacle.y, Math.min(ball.y, obstacle.y + obstacle.height));

      const distanceX = ball.x - closestX;
      const distanceY = ball.y - closestY;
      const distanceSquared = distanceX * distanceX + distanceY * distanceY;

      if (distanceSquared < BALL_RADIUS * BALL_RADIUS) {
        // Collision detected
        const distance = Math.sqrt(distanceSquared);
        const normalX = distanceX / distance;
        const normalY = distanceY / distance;

        // Move ball out of obstacle
        const overlap = BALL_RADIUS - distance;
        ball.x += normalX * overlap;
        ball.y += normalY * overlap;

        // Reflect velocity
        const dotProduct = ball.velocityX * normalX + ball.velocityY * normalY;
        ball.velocityX = (ball.velocityX - 2 * dotProduct * normalX) * 0.7;
        ball.velocityY = (ball.velocityY - 2 * dotProduct * normalY) * 0.7;
      }
    }
    return ball;
  }

  checkGoalCollision(ball, goal) {
    const dx = ball.x - goal.x;
    const dy = ball.y - goal.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < BALL_RADIUS + goal.size / 2;
  }

  checkStarCollision(ball, star) {
    const dx = ball.x - star.x;
    const dy = ball.y - star.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < BALL_RADIUS + 15;
  }
}
