import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  Easing,
  Audio,
  staticFile,
} from "remotion";

type Feature = {
  icon: string;
  title: string;
  description: string;
  color: string;
  delay: number;
};

const features: Feature[] = [
  {
    icon: "📅",
    title: "Smart Periodized Plans",
    description: "12-week plans that adapt to your body, not a template",
    color: "#F97316",
    delay: 0,
  },
  {
    icon: "🤖",
    title: "StrideAI Coach",
    description: "Real-time feedback that knows your fatigue before you do",
    color: "#FBBF24",
    delay: 0.3,
  },
  {
    icon: "📱",
    title: "Share Studio",
    description: "Instagram story cards that make your sweat look iconic",
    color: "#F97316",
    delay: 0.6,
  },
  {
    icon: "🔥",
    title: "HYROX Optimization",
    description: "Station-by-station pace data for race day precision",
    color: "#FBBF24",
    delay: 0.9,
  },
];

const FeatureCard: React.FC<{
  feature: Feature;
  index: number;
  globalFrame: number;
  fps: number;
}> = ({ feature, index, globalFrame, fps }) => {
  const startFrame = feature.delay * fps;

  const cardOpacity = interpolate(
    globalFrame,
    [startFrame, startFrame + 0.4 * fps],
    [0, 1],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  const cardY = interpolate(
    globalFrame,
    [startFrame, startFrame + 0.6 * fps],
    [40, 0],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  const cardScale = interpolate(
    globalFrame,
    [startFrame, startFrame + 0.5 * fps],
    [0.9, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
      easing: Easing.bezier(0.16, 1, 0.3, 1),
    }
  );

  // Glow effect on card
  const glowOpacity = interpolate(
    globalFrame,
    [startFrame + 0.3 * fps, startFrame + 0.8 * fps, startFrame + 1.5 * fps],
    [0, 0.6, 0.3],
    { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
  );

  return (
    <div
      style={{
        opacity: cardOpacity,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        width: 380,
        padding: 40,
        borderRadius: 24,
        backgroundColor: "rgba(24, 24, 27, 0.9)",
        border: `1px solid ${feature.color}33`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Glow behind card */}
      <div
        style={{
          position: "absolute",
          top: -20,
          left: "50%",
          transform: "translateX(-50%)",
          width: 200,
          height: 100,
          borderRadius: "50%",
          background: feature.color,
          opacity: glowOpacity * 0.15,
          filter: "blur(40px)",
        }}
      />

      {/* Icon */}
      <div
        style={{
          fontSize: 64,
          lineHeight: 1,
        }}
      >
        {feature.icon}
      </div>

      {/* Title */}
      <div
        style={{
          fontSize: 26,
          fontWeight: 800,
          fontFamily: "monospace",
          color: "#FFFFFF",
          textAlign: "center",
          letterSpacing: -0.5,
        }}
      >
        {feature.title}
      </div>

      {/* Description */}
      <div
        style={{
          fontSize: 18,
          fontFamily: "monospace",
          color: "#9CA3AF",
          textAlign: "center",
          lineHeight: 1.4,
        }}
      >
        {feature.description}
      </div>

      {/* Accent line */}
      <div
        style={{
          width: 60,
          height: 3,
          borderRadius: 2,
          background: `linear-gradient(90deg, ${feature.color}, transparent)`,
        }}
      />
    </div>
  );
};

export const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section title
  const titleOpacity = interpolate(frame, [0, 0.3 * fps], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const titleY = interpolate(frame, [0, 0.5 * fps], [-20, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0A0A0B",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Audio src={staticFile("audio/03-features.mp3")} />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 50,
          padding: 60,
        }}
      >
        {/* Section title */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            fontSize: 48,
            fontWeight: 900,
            fontFamily: "monospace",
            letterSpacing: -1,
            background:
              "linear-gradient(135deg, #FFFFFF, #D1D5DB)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Everything You Need to{" "}
          <span
            style={{
              background:
                "linear-gradient(135deg, #F97316, #FBBF24)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dominate
          </span>
        </div>

        {/* Feature cards grid */}
        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
              globalFrame={frame}
              fps={fps}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
