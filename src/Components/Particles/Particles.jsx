import { useEffect, useState, useRef, useCallback } from "react";
import "./Particles.css";

function Particles() {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Get particle count based on viewport size
  const getParticleCount = useCallback(() => {
    const width = window.innerWidth;

    if (width <= 480) return 15; // Mobile
    if (width <= 768) return 30; // Tablet
    if (width <= 1024) return 50; // Small desktop
    return 80; // Large desktop
  }, []);

  // Create particles with given count
  const createParticles = useCallback((count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.6 + 0.3,
      speed: Math.random() * 0.5 + 0.2,
      vx: (Math.random() - 0.5) * 0.5, // velocity x
      vy: (Math.random() - 0.5) * 0.5, // velocity y
    }));
  }, []);

  // Handle window resize
  const handleResize = useCallback(() => {
    const newCount = getParticleCount();
    const currentCount = particles.length;

    // Only update if count actually changed
    if (newCount !== currentCount) {
      const newParticles = createParticles(newCount);
      setParticles(newParticles);
    }
  }, [getParticleCount, createParticles, particles.length]);

  // Handle visibility change
  const handleVisibilityChange = useCallback(() => {
    const isPageVisible = !document.hidden;
    setIsVisible(isPageVisible);

    if (isPageVisible && !animationIdRef.current) {
      // Resume animation when page becomes visible
      animate();
    } else if (!isPageVisible && animationIdRef.current) {
      // Pause animation when page becomes hidden
      cancelAnimationFrame(animationIdRef.current);
      animationIdRef.current = null;
    }
  }, []);

  // Animation loop
  const animate = useCallback(() => {
    if (!isVisible) return; // Don't animate if not visible

    setParticles((prevParticles) =>
      prevParticles.map((particle) => {
        // Calculate distance from mouse
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Add natural movement with velocity
        let newX = particle.x + particle.vx;
        let newY = particle.y + particle.vy;

        // Subtle attraction to mouse (gentle but visible)
        if (distance < 150) {
          const force = ((150 - distance) / 150) * 0.8;
          newX -= dx * force * 0.05;
          newY -= dy * force * 0.05;
        }

        // Bounce off edges
        if (newX <= 0 || newX >= window.innerWidth) {
          particle.vx *= -0.8;
          newX = Math.max(0, Math.min(window.innerWidth, newX));
        }
        if (newY <= 0 || newY >= window.innerHeight) {
          particle.vy *= -0.8;
          newY = Math.max(0, Math.min(window.innerHeight, newY));
        }

        // Add some random drift
        particle.vx += (Math.random() - 0.5) * 0.01;
        particle.vy += (Math.random() - 0.5) * 0.01;

        // Limit velocity
        particle.vx = Math.max(-1, Math.min(1, particle.vx));
        particle.vy = Math.max(-1, Math.min(1, particle.vy));

        // Calculate new opacity with bounds checking
        let newOpacity = particle.opacity;
        if (distance < 150) {
          newOpacity = particle.opacity * 1.2;
        }

        // Clamp opacity between 0.1 and 1.0 to prevent Infinity
        newOpacity = Math.max(0.1, Math.min(1.0, newOpacity));

        return {
          ...particle,
          x: newX,
          y: newY,
          opacity: newOpacity,
        };
      })
    );

    // Only continue animation if still visible
    if (isVisible) {
      animationIdRef.current = requestAnimationFrame(animate);
    }
  }, [isVisible]);

  useEffect(() => {
    // Create initial particles
    const initialCount = getParticleCount();
    const initialParticles = createParticles(initialCount);
    setParticles(initialParticles);

    // Mouse move handler
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    // Throttled resize handler
    let resizeTimeout;
    const handleThrottledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 250); // 250ms throttle
    };

    // Visibility change handler
    document.addEventListener("visibilitychange", handleVisibilityChange);

    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleThrottledResize);

    // Start animation if page is visible
    if (isVisible) {
      animate();
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleThrottledResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(resizeTimeout);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [
    getParticleCount,
    createParticles,
    handleResize,
    handleVisibilityChange,
    animate,
    isVisible,
  ]);

  return (
    <div className="particles" ref={containerRef}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: particle.opacity,
            animationDelay: `${particle.id * 0.2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default Particles;
