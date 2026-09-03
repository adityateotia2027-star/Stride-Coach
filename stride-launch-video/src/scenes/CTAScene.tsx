import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Audio,
  staticFile,
} from "remotion";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "Train Intelligently"
  const line1Opacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const line1Scale = interpolate(frame, [0, 0.5 * fps], [0.7, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Line 2: "Share Beautifully"
  const line2Opacity = interpolate(
    frame,
    [0.6 * fps, 1 * fps],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const line2Scale = interpolate(
    frame,
    [0.6 * fps, 1.1 * fps],
    [0.7, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Divider line animation
  const dividerWidth = interpolate(
    frame,
    [0.3 * fps, 0.8 * fps],
    [0, 200],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Background energy burst
  const burstScale = interpolate(
    frame,
    [0, 2 * fps],
    [0.5, 2],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const burstOpacity = interpolate(
    frame,
    [0, 0.5 * fps, 2 * fps],
    [0, 0.15, 0.05],
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
      {/* Background energy burst */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #F97316 0%, transparent 70%)",
          opacity: burstOpacity,
          transform: `scale(${burstScale})`,
          filter: "blur(60px)",
        }}
      />

      <Audio src={staticFile("audio/04-cta.mp3")} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 30,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
          }}
        >
          <span
            style={{
              fontSize: 88,
              fontWeight: 900,
              fontFamily: "monospace",
              letterSpacing: -2,
              background:
                "linear-gradient(135deg, #F97316, #FBBF24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Train Intelligently.
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: dividerWidth,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #F97316, transparent)",
            borderRadius: 2,
          }}
        />

        {/* Line 2 */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `scale(${line2Scale})`,
          }}
        >
          <span
            style={{
              fontSize: 88,
              fontWeight: 900,
              fontFamily: "monospace",
              letterSpacing: -2,
              background:
                "linear-gradient(135deg, #FBBF24, #F97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Share Beautifully.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
