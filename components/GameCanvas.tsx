import React, { useRef, useEffect } from 'react';
import { Ball, Peg, RiskLevel, PlinkoSettings } from '../types';
import { CANVAS_WIDTH, CANVAS_HEIGHT, MULTIPLIERS, GRAVITY, FRICTION, BALL_RADIUS, PEG_RADIUS, COLOR_MULTIPLIER_BG } from '../constants';

interface GameCanvasProps {
  balls: Ball[];
  setBalls: React.Dispatch<React.SetStateAction<Ball[]>>;
  settings: PlinkoSettings;
  onBallFinish: (ball: Ball, multiplier: number) => void;
}

const GameCanvas: React.FC<GameCanvasProps> = ({ balls, setBalls, settings, onBallFinish }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const pegsRef = useRef<Peg[]>([]);

  // Generate Pegs based on rows
  useEffect(() => {
    const newPegs: Peg[] = [];
    const rows = settings.rows;
    // Calculate spacing to fit canvas
    const spacing = Math.min(CANVAS_WIDTH / (rows + 2), 50); 
    const startY = 100;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col <= row; col++) {
        const x = CANVAS_WIDTH / 2 + (col - row / 2) * spacing;
        const y = startY + row * spacing;
        newPegs.push({ x, y, radius: PEG_RADIUS });
      }
    }
    pegsRef.current = newPegs;
  }, [settings.rows]);

  // Main Game Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = () => {
      // Clear Canvas
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw Multipliers (Buckets)
      const currentMultipliers = MULTIPLIERS[settings.risk][settings.rows];
      const spacing = Math.min(CANVAS_WIDTH / (settings.rows + 2), 50);
      const startY = 100;
      const lastRowY = startY + (settings.rows - 1) * spacing;
      const bucketY = lastRowY + spacing; // Where multipliers sit

      currentMultipliers.forEach((mult, index) => {
        const x = CANVAS_WIDTH / 2 + (index - settings.rows / 2) * spacing;
        const width = spacing - 4;
        const height = 30;
        
        // Dynamic color based on multiplier value
        let color = '#334155'; // default slate-700
        if (mult >= 10) color = '#db2777'; // pink
        else if (mult >= 2) color = '#9333ea'; // purple
        else if (mult < 1) color = '#475569'; // darker slate

        // Draw Bucket Background
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.roundRect(x - width / 2, bucketY, width, height, 4);
        ctx.fill();

        // Draw Text
        ctx.fillStyle = 'white';
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${mult}x`, x, bucketY + height / 2);
      });

      // Draw Pegs
      ctx.fillStyle = 'white';
      pegsRef.current.forEach(peg => {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, peg.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(255,255,255,0.5)';
      });
      ctx.shadowBlur = 0;

      // Update and Draw Balls
      setBalls(prevBalls => {
        const nextBalls = prevBalls.map(ball => {
          if (!ball.active) return ball;

          // Physics Update
          let { x, y, vx, vy } = ball;

          vy += GRAVITY;
          vx *= FRICTION; // Air resistance
          // vy *= FRICTION; 

          x += vx;
          y += vy;

          // Peg Collision
          let collided = false;
          for (const peg of pegsRef.current) {
            const dx = x - peg.x;
            const dy = y - peg.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const minDistance = ball.radius + peg.radius;

            if (distance < minDistance) {
              collided = true;
              // Simple resolve: push out and reflect
              const angle = Math.atan2(dy, dx);
              
              // Move ball out of collision
              x = peg.x + Math.cos(angle) * minDistance;
              y = peg.y + Math.sin(angle) * minDistance;

              // Randomize bounce slightly to create Plinko chaos
              const noise = (Math.random() - 0.5) * 0.5; 
              
              // Reflect velocity
              // This is a simplified elastic collision
              vx = Math.cos(angle + noise) * 2.5; // Add energy back horizontally
              vy = Math.abs(vy) * 0.4; // Lose energy vertically but keep falling eventually
              
              // Ensure it doesn't get stuck on top
              if (y < peg.y) y += 1;
            }
          }

          // Check for floor/Bucket hit
          if (y > bucketY) {
            // Determine bucket index
            const bucketIndex = Math.round(((x - CANVAS_WIDTH / 2) / spacing) + settings.rows / 2);
            
            if (ball.active) {
                // Bounds check
                let finalIndex = bucketIndex;
                if (finalIndex < 0) finalIndex = 0;
                if (finalIndex >= currentMultipliers.length) finalIndex = currentMultipliers.length - 1;

                const multiplier = currentMultipliers[finalIndex];
                onBallFinish(ball, multiplier);
            }
            return { ...ball, x, y, vx, vy, active: false };
          }

          return { ...ball, x, y, vx, vy };
        });
        
        // Filter out old inactive balls to save memory eventually, but for now keep them for visual fading or just remove
        return nextBalls.filter(b => b.y < CANVAS_HEIGHT + 50);
      });

      // Draw Balls
      balls.forEach(ball => {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.fill();
        ctx.shadowBlur = 10;
        ctx.shadowColor = ball.color;
      });
      ctx.shadowBlur = 0;

      animationRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [balls, settings, onBallFinish]);

  return (
    <canvas 
      ref={canvasRef} 
      width={CANVAS_WIDTH} 
      height={CANVAS_HEIGHT}
      className="w-full h-full object-contain"
    />
  );
};

export default GameCanvas;