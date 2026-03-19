import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

type StrategyMode = "valorant" | "lol";

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | {
          mode?: StrategyMode;
          map?: string;
          agent?: string;
          champion?: string;
          opponent?: string;
        }
      | null;

    const mode = body?.mode;
    if (mode !== "valorant" && mode !== "lol") {
      return NextResponse.json(
        { error: "Invalid mode. Expected 'valorant' or 'lol'." },
        { status: 400 }
      );
    }

    const map = body?.map?.trim() ?? "";
    const agent = body?.agent?.trim() ?? "";
    const champion = body?.champion?.trim() ?? "";
    const opponent = body?.opponent?.trim() ?? "";

    if (mode === "valorant" && (!map || !agent)) {
      return NextResponse.json(
        { error: "Please provide both 'Map' and 'Agent'." },
        { status: 400 }
      );
    }

    if (mode === "lol" && (!champion || !opponent)) {
      return NextResponse.json(
        { error: "Please provide both 'Champion' and 'Opponent'." },
        { status: 400 }
      );
    }

    const prompt =
      mode === "valorant"
        ? `You are an elite competitive FPS coach. Generate a practical Valorant strategy for ranked play.

Map: ${map}
Agent: ${agent}

Be concise, punchy, and action-oriented. No fluff. Tailor tactics to the given map + agent.

Use STRICTLY these rules:
- Output EXACTLY this format (use '-' bullet points only; no extra headings; no numbering)
- Each bullet MUST be a single action line (max ~12 words)
- No explanations, no preamble, no closing

Return EXACTLY this format (use '-' bullet points only; no extra headings; no numbering):

Early Game Strategy
- ...

Core Items/Build
- ...

Pro Tips
- ...

Keep it under 180 words.`
        : `You are an elite League of Legends coach. Generate a practical solo queue strategy for ranked play.

Champion: ${champion}
Opponent: ${opponent}

Distinguish Valorant vs LoL nuances clearly by writing LoL-specific advice for lane, waves, items, and teamfights.

Be concise, punchy, and action-oriented. No fluff. Make it specific to the given champion + opponent.

Use STRICTLY these rules:
- Output EXACTLY this format (use '-' bullet points only; no extra headings; no numbering)
- Each bullet MUST be a single action line (max ~12 words)
- No explanations, no preamble, no closing

Return EXACTLY this format (use '-' bullet points only; no extra headings; no numbering):

Early Game Strategy
- ...

Core Items/Build
- ...

Pro Tips
- ...

Keep it under 180 words.`;

    const geminiApiKey = process.env.GEMINI_API_KEY;
    if (!geminiApiKey) {
      return NextResponse.json(
        { error: "Server is missing GEMINI_API_KEY." },
        { status: 500 }
      );
    }

    const genAI = new GoogleGenerativeAI(geminiApiKey);

    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
      generationConfig: {
        temperature: 0.6,
        maxOutputTokens: 500,
      },
    });

    return NextResponse.json({ text: result.response.text() });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Unexpected server error while generating strategy.",
        details: err instanceof Error ? err.message : String(err),
      },
      { status: 500 }
    );
  }
}

