import { useEffect, useRef } from 'react';

export default function BuildAgentBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let bubbles: ChatBubble[] = [];
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      opacity: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;

        const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }

    class ChatBubble {
      x: number;
      y: number;
      size: number;
      speed: number;
      opacity: number;
      fadeDirection: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 50;
        this.size = Math.random() * 40 + 30;
        this.speed = Math.random() * 0.5 + 0.3;
        this.opacity = 0;
        this.fadeDirection = 1;
      }

      update() {
        this.y -= this.speed;

        if (this.y > canvas.height - 200) {
          this.opacity += 0.01 * this.fadeDirection;
        } else if (this.y < 100) {
          this.opacity -= 0.02;
        }

        this.opacity = Math.max(0, Math.min(0.15, this.opacity));

        if (this.y < -50) {
          this.y = canvas.height + 50;
          this.x = Math.random() * canvas.width;
          this.opacity = 0;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.opacity;

        ctx.fillStyle = '#06b6d4';
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.size * 2, this.size, 12);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x + 15, this.y + this.size);
        ctx.lineTo(this.x + 5, this.y + this.size + 10);
        ctx.lineTo(this.x + 20, this.y + this.size);
        ctx.fill();

        ctx.restore();
      }
    }

    class GeometricShape {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      vx: number;
      vy: number;
      type: string;
      color: string;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 60 + 40;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.01;
        this.vx = (Math.random() - 0.5) * 0.2;
        this.vy = (Math.random() - 0.5) * 0.2;
        this.type = ['triangle', 'square', 'hexagon'][Math.floor(Math.random() * 3)];

        const colors = ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.x < -this.size) this.x = canvas.width + this.size;
        if (this.x > canvas.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas.height + this.size;
        if (this.y > canvas.height + this.size) this.y = -this.size;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.1;

        ctx.beginPath();
        if (this.type === 'triangle') {
          ctx.moveTo(0, -this.size / 2);
          ctx.lineTo(this.size / 2, this.size / 2);
          ctx.lineTo(-this.size / 2, this.size / 2);
          ctx.closePath();
        } else if (this.type === 'square') {
          ctx.rect(-this.size / 2, -this.size / 2, this.size, this.size);
        } else {
          const sides = 6;
          for (let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides;
            const x = Math.cos(angle) * this.size / 2;
            const y = Math.sin(angle) * this.size / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        }
        ctx.stroke();

        ctx.restore();
      }
    }

    const shapes: GeometricShape[] = [];

    for (let i = 0; i < 100; i++) {
      particles.push(new Particle());
    }

    for (let i = 0; i < 6; i++) {
      bubbles.push(new ChatBubble());
    }

    for (let i = 0; i < 8; i++) {
      shapes.push(new GeometricShape());
    }

    const drawGradient = () => {
      if (!ctx) return;

      const gradient1 = ctx.createRadialGradient(
        canvas.width * 0.3 + Math.sin(time * 0.001) * 100,
        canvas.height * 0.3 + Math.cos(time * 0.001) * 100,
        0,
        canvas.width * 0.3,
        canvas.height * 0.3,
        canvas.width * 0.6
      );
      gradient1.addColorStop(0, 'rgba(6, 182, 212, 0.15)');
      gradient1.addColorStop(1, 'rgba(6, 182, 212, 0)');

      const gradient2 = ctx.createRadialGradient(
        canvas.width * 0.7 + Math.cos(time * 0.0015) * 150,
        canvas.height * 0.6 + Math.sin(time * 0.0015) * 150,
        0,
        canvas.width * 0.7,
        canvas.height * 0.6,
        canvas.width * 0.5
      );
      gradient2.addColorStop(0, 'rgba(139, 92, 246, 0.15)');
      gradient2.addColorStop(1, 'rgba(139, 92, 246, 0)');

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = gradient2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const animate = () => {
      if (!ctx) return;

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGradient();

      shapes.forEach(shape => {
        shape.update();
        shape.draw();
      });

      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });

      bubbles.forEach(bubble => {
        bubble.update();
        bubble.draw();
      });

      time++;
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: '#0f172a' }}
    />
  );
}
