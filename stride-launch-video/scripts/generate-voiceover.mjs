import https from "https";
import fs from "fs";
import path from "path";

const API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = "TX3LPaxmHKxFdv7VOQHJ"; // Liam - Energetic, Social Media Creator

const scriptLines = [
  {
    id: "01-hook",
    text: "Stop following generic training plans. Start training intelligently.",
  },
  {
    id: "02-intro",
    text: "Introducing StrideIQ — the AI-powered training platform built for runners and HYROX athletes who refuse to settle.",
  },
  {
    id: "03-features",
    text: "Smart periodized training plans that adapt to your body. Real-time AI coaching that knows your fatigue before you do. Beautiful Instagram story cards that make your sweat look iconic. And HYROX station-by-station pace optimization — because race day deserves precision.",
  },
  {
    id: "04-cta",
    text: "Train intelligently. Share beautifully. Welcome to StrideIQ.",
  },
];

function synthesizeLine(line) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      text: line.text,
      model_id: "eleven_flash_v2_5",
      voice_settings: {
        stability: 0.5,
        similarity_boost: 0.8,
        style: 0.6,
        use_speaker_boost: true,
      },
    });

    const options = {
      hostname: "api.elevenlabs.io",
      path: `/v1/text-to-speech/${VOICE_ID}`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "xi-api-key": API_KEY,
        Accept: "audio/mpeg",
      },
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () =>
          reject(new Error(`ElevenLabs error ${res.statusCode}: ${body}`))
        );
        return;
      }
      const chunks = [];
      res.on("data", (chunk) => chunks.push(chunk));
      res.on("end", () => resolve(Buffer.concat(chunks)));
    });

    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function main() {
  const outDir = path.join(
    path.dirname(new URL(import.meta.url).pathname),
    "..",
    "public",
    "audio"
  );
  fs.mkdirSync(outDir, { recursive: true });

  for (const line of scriptLines) {
    console.log(`Generating: ${line.id}...`);
    const audio = await synthesizeLine(line);
    const outPath = path.join(outDir, `${line.id}.mp3`);
    fs.writeFileSync(outPath, audio);
    console.log(`  -> ${outPath} (${audio.length} bytes)`);
  }

  // Generate a simple background music tone (sine wave) as placeholder
  // In production, replace with licensed music
  console.log("Voiceover generation complete!");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
