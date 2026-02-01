import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

// Predefined strategies
const predefinedStrategies = [
  {
    id: 1,
    name: "Deeskalation",
    description: "Beruhigt die Situation und reduziert Spannungen durch ruhige, verständnisvolle Kommunikation.",
  },
  {
    id: 2,
    name: "Ignorieren",
    description: "Keine Reaktion zeigen und dem Angreifer ins Leere laufen lassen.",
  },
  {
    id: 3,
    name: "Direkte Konfrontation",
    description: "Klare Grenzen setzen und sich selbstbewusst zur Wehr setzen.",
  },
  {
    id: 4,
    name: "Dokumentieren",
    description: "Screenshots und Beweise sammeln für spätere rechtliche oder disziplinarische Schritte.",
  },
  {
    id: 5,
    name: "Hilfe holen",
    description: "Vertrauenspersonen, Beratungsstellen oder Autoritäten um Unterstützung bitten.",
  },
  {
    id: 6,
    name: "Humor/Deflection",
    description: "Mit Humor oder Ironie antworten um die Situation zu entschärfen.",
  },
  {
    id: 7,
    name: "Sachliche Korrektur",
    description: "Faktische Fehler korrigieren ohne emotional zu werden.",
  },
  {
    id: 8,
    name: "Empathische Reaktion",
    description: "Verständnis für mögliche Gründe des Verhaltens zeigen.",
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { comment, strategyId, context } = req.body;

    if (!comment || !strategyId) {
      return res.status(400).json({ message: 'Comment and strategy ID are required' });
    }

    const strategy = predefinedStrategies.find(s => s.id === strategyId);
    if (!strategy) {
      return res.status(404).json({ message: 'Strategy not found' });
    }

    const generatedText = await generateResponse(
      comment,
      strategy.name,
      strategy.description,
      context
    );

    res.json({
      response: {
        id: Date.now(),
        generatedText,
      },
      strategy,
    });
  } catch (error) {
    console.error('Response generation error:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Failed to generate response' 
    });
  }
}

async function generateResponse(
  originalComment: string,
  strategyName: string,
  strategyDescription: string,
  context?: any
): Promise<string> {
  const systemPrompt = `Du bist ein Experte für Konfliktlösung und strategische Kommunikation. Generiere eine passende Antwort auf einen Cybermobbing-Kommentar unter Verwendung der angegebenen Strategie.

Die Antwort sollte:
1. Den Richtlinien der gewählten Strategie folgen
2. Dem Kontext angemessen sein
3. Professionell und konstruktiv sein
4. Die Beziehung und das gewünschte Ergebnis berücksichtigen
5. Realistisch und umsetzbar sein

Antworte nur mit dem vorgeschlagenen Antworttext, ohne zusätzliche Formatierung oder Erklärung.`;

  let userPrompt = `Ursprünglicher Kommentar: "${originalComment}"

Strategie: ${strategyName}
Strategiebeschreibung: ${strategyDescription}

Generiere eine Antwort gemäß dieser Strategie.`;

  if (context) {
    userPrompt += `\n\nKontext:
- Beziehung: ${context.relationship}
- Gewünschte Reaktion: ${context.desiredReaction}
- Zusätzlicher Kontext: ${context.additionalInfo || 'Keine'}`;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    temperature: 0.7,
    max_tokens: 200,
  });

  return response.choices[0].message.content?.trim() || "Entschuldigung, ich konnte keine passende Antwort generieren.";
}

