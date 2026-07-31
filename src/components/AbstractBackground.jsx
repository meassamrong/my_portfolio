import { useEffect, useRef } from "react";

const PALETTE = [
  { stroke: "rgba(34, 211, 238, 0.56)", fill: "rgba(34, 211, 238, 0.9)" },
  { stroke: "rgba(96, 165, 250, 0.5)", fill: "rgba(96, 165, 250, 0.86)" },
  { stroke: "rgba(45, 212, 191, 0.45)", fill: "rgba(45, 212, 191, 0.82)" },
  { stroke: "rgba(168, 85, 247, 0.45)", fill: "rgba(168, 85, 247, 0.78)" },
];

const seededNoise = (value) => {
  const x = Math.sin(value * 12.9898) * 43758.5453;
  return x - Math.floor(x);
};

const createNodes = (width, height) => {
  const spacing = width < 640 ? 86 : width < 1024 ? 108 : 132;
  const columns = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;
  const nodes = [];

  for (let row = -1; row < rows; row += 1) {
    for (let column = -1; column < columns; column += 1) {
      const seed = row * 37 + column * 91;
      const offsetX = (seededNoise(seed + 1) - 0.5) * spacing * 0.42;
      const offsetY = (seededNoise(seed + 2) - 0.5) * spacing * 0.42;

      nodes.push({
        x: column * spacing + offsetX,
        y: row * spacing + offsetY,
        baseX: column * spacing + offsetX,
        baseY: row * spacing + offsetY,
        size: 3 + seededNoise(seed + 3) * 5,
        drift: 0.35 + seededNoise(seed + 4) * 0.85,
        phase: seededNoise(seed + 5) * Math.PI * 2,
        tone: PALETTE[Math.floor(seededNoise(seed + 6) * PALETTE.length)],
      });
    }
  }

  return nodes;
};

const AbstractBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: true });
    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0, active: false };
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animationFrame = 0;
    let nodes = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;

    const resize = () => {
      pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      nodes = createNodes(width, height);
    };

    const drawSquare = (node, time, pulse) => {
      const half = node.size * 0.5;

      context.save();
      context.translate(node.x, node.y);
      context.rotate(0.18 * Math.sin(time * 0.0006 + node.phase));
      context.shadowBlur = 14 + pulse * 18;
      context.shadowColor = node.tone.fill;
      context.strokeStyle = node.tone.stroke;
      context.fillStyle = "rgba(255, 255, 255, 0.08)";
      context.lineWidth = 1;
      context.fillRect(-half, -half, node.size, node.size);
      context.strokeRect(-half, -half, node.size, node.size);
      context.restore();
    };

    const draw = (time = 0) => {
      context.clearRect(0, 0, width, height);

      const wash = context.createRadialGradient(
        width * 0.5,
        height * 0.18,
        0,
        width * 0.5,
        height * 0.18,
        Math.max(width, height) * 0.85
      );
      wash.addColorStop(0, "rgba(37, 99, 235, 0.16)");
      wash.addColorStop(0.34, "rgba(14, 165, 233, 0.06)");
      wash.addColorStop(0.68, "rgba(168, 85, 247, 0.05)");
      wash.addColorStop(1, "rgba(0, 0, 0, 0)");
      context.fillStyle = wash;
      context.fillRect(0, 0, width, height);

      pointer.x += (pointer.targetX - pointer.x) * 0.07;
      pointer.y += (pointer.targetY - pointer.y) * 0.07;

      const motionScale = reducedMotion.matches ? 0 : 1;
      const connectDistance = width < 640 ? 112 : 148;

      nodes.forEach((node) => {
        const driftX = Math.cos(time * 0.00025 * node.drift + node.phase) * 8;
        const driftY = Math.sin(time * 0.00032 * node.drift + node.phase) * 8;
        const pointerDistance = Math.hypot(pointer.x - node.baseX, pointer.y - node.baseY);
        const force = pointer.active ? Math.max(0, 1 - pointerDistance / 210) : 0;
        const angle = Math.atan2(node.baseY - pointer.y, node.baseX - pointer.x);

        node.x =
          node.baseX +
          driftX * motionScale +
          Math.cos(angle) * force * 26;
        node.y =
          node.baseY +
          driftY * motionScale +
          Math.sin(angle) * force * 26;
      });

      context.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i += 1) {
        const current = nodes[i];
        for (let j = i + 1; j < nodes.length; j += 1) {
          const next = nodes[j];
          const distance = Math.hypot(current.x - next.x, current.y - next.y);

          if (distance > connectDistance) {
            continue;
          }

          const pointerDistance = Math.min(
            Math.hypot(pointer.x - current.x, pointer.y - current.y),
            Math.hypot(pointer.x - next.x, pointer.y - next.y)
          );
          const pointerBoost = pointer.active ? Math.max(0, 1 - pointerDistance / 260) : 0;
          const alpha = (1 - distance / connectDistance) * (0.1 + pointerBoost * 0.32);
          const gradient = context.createLinearGradient(current.x, current.y, next.x, next.y);

          gradient.addColorStop(0, current.tone.stroke.replace(/[\d.]+\)$/u, `${alpha})`));
          gradient.addColorStop(1, next.tone.stroke.replace(/[\d.]+\)$/u, `${alpha})`));
          context.strokeStyle = gradient;
          context.shadowBlur = 8 + pointerBoost * 18;
          context.shadowColor = pointerBoost > 0 ? "rgba(34, 211, 238, 0.45)" : "transparent";
          context.beginPath();
          context.moveTo(current.x, current.y);
          context.lineTo(next.x, next.y);
          context.stroke();
        }
      }

      nodes.forEach((node) => {
        const distance = Math.hypot(pointer.x - node.x, pointer.y - node.y);
        const pulse = pointer.active ? Math.max(0, 1 - distance / 190) : 0;
        drawSquare(node, time, pulse);
      });

      if (pointer.active) {
        const cursorGlow = context.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          210
        );
        cursorGlow.addColorStop(0, "rgba(125, 211, 252, 0.2)");
        cursorGlow.addColorStop(0.44, "rgba(34, 211, 238, 0.08)");
        cursorGlow.addColorStop(1, "rgba(34, 211, 238, 0)");
        context.fillStyle = cursorGlow;
        context.fillRect(pointer.x - 210, pointer.y - 210, 420, 420);
      }

      if (!reducedMotion.matches) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const handlePointerMove = (event) => {
      pointer.targetX = event.clientX;
      pointer.targetY = event.clientY;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = width * 0.5;
      pointer.targetY = height * 0.35;
    };

    const handleResize = () => {
      resize();

      if (reducedMotion.matches) {
        draw();
      }
    };

    resize();
    handlePointerLeave();
    draw();

    window.addEventListener("resize", handleResize);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);
    reducedMotion.addEventListener("change", draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
      reducedMotion.removeEventListener("change", draw);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#02040a]" aria-hidden="true">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.12),transparent_28%),linear-gradient(180deg,rgba(2,4,10,0.2),rgba(2,4,10,0.9))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] [background-size:72px_72px] opacity-30" />
    </div>
  );
};

export default AbstractBackground;
