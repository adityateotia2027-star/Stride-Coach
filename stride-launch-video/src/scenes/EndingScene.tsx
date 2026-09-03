import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
} from "remotion";

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo scale
  const logoScale = interpolate(frame, [0, 0.6 * fps], [0.5, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const logoOpacity = interpolate(frame, [0, 0.4 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  // URL fade in
  const urlOpacity = interpolate(
    frame,
    [0.8 * fps, 1.3 * fps],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const urlY = interpolate(
    frame,
    [0.8 * fps, 1.3 * fps],
    [15, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Background glow
  const glowOpacity = interpolate(
    frame,
    [0, 1 * fps, 2.5 * fps],
    [0, 0.2, 0.15],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0B",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(249,115,22,0.4) 0%, transparent 70%)",
          opacity: glowOpacity,
          filter: "blur(60px)",
        }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
          opacity: logoOpacity,
          transform: `scale(${logoScale})`,
        }}
      >
        {/* Logo */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: 24,
            background: "linear-gradient(135deg, #F97316, #FBBF24)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            boxShadow: "0 0 50px rgba(249,115,22,0.4)",
          }}
        >
          <span
            style={{
              fontSize: 50,
              fontWeight: 900,
              color: "white",
              fontFamily: "monospace",
            }}
          >
            S
          </span>
        </div>

        {/* Logo text */}
        <span
          style={{
            fontSize: 64,
            fontWeight: 900,
            fontFamily: "monospace",
            letterSpacing: -2,
            color: "#FFFFFF",
          }}
        >
          StrideIQ
        </span>
      </div>

      {/* URL */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          opacity: urlOpacity,
          transform: `translateY(${urlY}px)`,
          fontSize: 22,
          fontFamily: "monospace",
          color: "#6B7280",
          letterSpacing: 4,
          textTransform: "uppercase",
        }}
      >
        strideiq.fit
      </div>
    </AbsoluteFill>
  );
};
