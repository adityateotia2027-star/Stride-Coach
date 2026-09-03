import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale animation
  const logoScale = interpolate(frame, [0, 0.8 * fps], [0.3, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const logoOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Glow pulse
  const glowIntensity = interpolate(
    frame,
    [0.5 * fps, 1.2 * fps, 2 * fps],
    [0, 1, 0.6],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // Tagline slide up
  const taglineY = interpolate(frame, [1 * fps, 1.8 * fps], [40, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const taglineOpacity = interpolate(frame, [1 * fps, 1.6 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // Particle positions
  const particles = Array.from({ length: 30 }, (_, i) => {
    const angle = (i / 30) * Math.PI * 2;
    const radius = interpolate(
      frame,
      [0.3 * fps, 2 * fps],
      [0, 200 + (i % 5) * 60],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
    const particleOpacity = interpolate(
      frame,
      [0.3 * fps, 1 * fps, 2.5 * fps],
      [0, 0.8, 0],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
      opacity: particleOpacity,
      size: 3 + (i % 4) * 2,
    };
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0B",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background radial glow */}
      <div
        style={{
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(249,115,22,${glowIntensity * 0.3}) 0%, transparent 70%)`,
          filter: "blur(80px)",
        }}
      />

      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: i % 2 === 0 ? "#F97316" : "#FBBF24",
            transform: `translate(${p.x}px, ${p.y}px)`,
            opacity: p.opacity,
            boxShadow: `0 0 ${p.size * 2}px ${i % 2 === 0 ? "#F97316" : "#FBBF24"}`,
          }}
        />
      ))}

      {/* Logo */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 24,
          transform: `scale(${logoScale})`,
          opacity: logoOpacity,
        }}
      >
        {/* Logo mark */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 30,
            background: "linear-gradient(135deg, #F97316, #FBBF24)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: `0 0 60px rgba(249,115,22,${glowIntensity * 0.5})`,
          }}
        >
          <span
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "white",
              fontFamily: "monospace",
            }}
          >
            S
          </span>
        </div>

        {/* Logo text */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            fontFamily: "monospace",
            letterSpacing: -2,
            background: "linear-gradient(135deg, #FFFFFF, #D1D5DB)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          StrideIQ
        </div>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          transform: `translateY(${taglineY}px)`,
          opacity: taglineOpacity,
          fontSize: 28,
          fontFamily: "monospace",
          color: "#9CA3AF",
          letterSpacing: 6,
          textTransform: "uppercase",
        }}
      >
        Train Intelligently
      </div>
    </AbsoluteFill>
  );
};
