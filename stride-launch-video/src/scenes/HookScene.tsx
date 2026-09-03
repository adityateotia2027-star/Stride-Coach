import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Audio,
  staticFile,
} from "remotion";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Line 1: "Stop following generic training plans"
  const line1Opacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const line1Scale = interpolate(frame, [0, 0.5 * fps], [0.8, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Strikethrough animation
  const strikeWidth = interpolate(
    frame,
    [0.8 * fps, 1.5 * fps],
    [0, 100],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Line 2: "Start training intelligently"
  const line2Opacity = interpolate(
    frame,
    [1.8 * fps, 2.3 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const line2Y = interpolate(
    frame,
    [1.8 * fps, 2.5 * fps],
    [30, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Background pulse
  const bgPulse = interpolate(
    frame,
    [0, 0.5 * fps, 1 * fps, 1.5 * fps, 2 * fps],
    [0, 0.08, 0.04, 0.08, 0.04],
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
      {/* Background orange pulse */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `radial-gradient(circle at center, rgba(249,115,22,${bgPulse}) 0%, transparent 60%)`,
        }}
      />

      <Audio src={staticFile("audio/01-hook.mp3")} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 40,
          padding: 80,
        }}
      >
        {/* Line 1 */}
        <div
          style={{
            position: "relative",
            opacity: line1Opacity,
            transform: `scale(${line1Scale})`,
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 800,
              fontFamily: "monospace",
              color: "#6B7280",
              letterSpacing: -1,
            }}
          >
            Stop following generic training plans.
          </span>
          {/* Strikethrough */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              height: 4,
              width: `${strikeWidth}%`,
              backgroundColor: "#EF4444",
              transform: "translateY(-50%)",
              borderRadius: 2,
            }}
          />
        </div>

        {/* Line 2 */}
        <div
          style={{
            opacity: line2Opacity,
            transform: `translateY(${line2Y}px)`,
          }}
        >
          <span
            style={{
              fontSize: 72,
              fontWeight: 900,
              fontFamily: "monospace",
              letterSpacing: -1,
              background:
                "linear-gradient(135deg, #F97316, #FBBF24, #F97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Start training intelligently.
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
