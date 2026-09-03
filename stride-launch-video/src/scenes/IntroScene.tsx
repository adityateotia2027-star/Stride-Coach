import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Audio,
  staticFile,
} from "remotion";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "Introducing" text
  const introOpacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const introY = interpolate(frame, [0, 0.5 * fps], [-20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Logo reveal
  const logoScale = interpolate(
    frame,
    [0.4 * fps, 1 * fps],
    [0.5, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const logoOpacity = interpolate(
    frame,
    [0.4 * fps, 0.8 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // Description text
  const descOpacity = interpolate(
    frame,
    [1.2 * fps, 1.8 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  const descY = interpolate(
    frame,
    [1.2 * fps, 2 * fps],
    [20, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Background grid lines
  const gridOpacity = interpolate(frame, [0, 1 * fps], [0, 0.05], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0B",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background grid */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          opacity: gridOpacity,
          backgroundImage: `
            linear-gradient(rgba(249,115,22,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(249,115,22,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <Audio src={staticFile("audio/02-intro.mp3")} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 32,
        }}
      >
        {/* "Introducing" label */}
        <div
          style={{
            opacity: introOpacity,
            transform: `translateY(${introY}px)`,
            fontSize: 24,
            fontWeight: 600,
            fontFamily: "monospace",
            color: "#F97316",
            letterSpacing: 8,
            textTransform: "uppercase",
          }}
        >
          Introducing
        </div>

        {/* Logo + Name */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 20,
              background: "linear-gradient(135deg, #F97316, #FBBF24)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxShadow: "0 0 40px rgba(249,115,22,0.4)",
            }}
          >
            <span
              style={{
                fontSize: 40,
                fontWeight: 900,
                color: "white",
                fontFamily: "monospace",
              }}
            >
              S
            </span>
          </div>
          <span
            style={{
              fontSize: 80,
              fontWeight: 900,
              fontFamily: "monospace",
              letterSpacing: -2,
              color: "#FFFFFF",
            }}
          >
            StrideIQ
          </span>
        </div>

        {/* Description */}
        <div
          style={{
            opacity: descOpacity,
            transform: `translateY(${descY}px)`,
            fontSize: 28,
            fontFamily: "monospace",
            color: "#9CA3AF",
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.5,
          }}
        >
          The AI-powered training platform for runners
          <br />
          and HYROX athletes who refuse to settle.
        </div>
      </div>
    </AbsoluteFill>
  );
};
