import type { VercelRequest, VercelResponse } from '@vercel/node';

// Predefined strategies
const predefinedStrategies = [
  {
    id: 1,
    name: "Deeskalation",
    description: "Beruhigt die Situation und reduziert Spannungen durch ruhige, verständnisvolle Kommunikation.",
    icon: "🕊️",
    category: "defensive",
    pros: ["Vermeidet weitere Eskalation", "Professionelle Reaktion", "Bewahrt Ruhe"],
    cons: ["Könnte als Schwäche interpretiert werden", "Langsamere Konfliktlösung"],
    riskLevel: "low"
  },
  {
    id: 2,
    name: "Ignorieren",
    description: "Keine Reaktion zeigen und dem Angreifer ins Leere laufen lassen.",
    icon: "🚫",
    category: "passive",
    pros: ["Entzieht Aufmerksamkeit", "Vermeidet Eskalation", "Emotionale Distanz"],
    cons: ["Könnte Verhalten verstärken", "Keine Problemlösung", "Mögliche Eskalation"],
    riskLevel: "medium"
  },
  {
    id: 3,
    name: "Direkte Konfrontation",
    description: "Klare Grenzen setzen und sich selbstbewusst zur Wehr setzen.",
    icon: "⚔️",
    category: "assertive",
    pros: ["Klare Kommunikation", "Setzt Grenzen", "Zeigt Stärke"],
    cons: ["Kann Konflikt verstärken", "Erhöhte Emotionalität", "Unvorhersagbare Reaktion"],
    riskLevel: "high"
  },
  {
    id: 4,
    name: "Dokumentieren",
    description: "Screenshots und Beweise sammeln für spätere rechtliche oder disziplinarische Schritte.",
    icon: "📝",
    category: "informative",
    pros: ["Rechtliche Absicherung", "Professioneller Ansatz", "Langfristige Lösung"],
    cons: ["Keine sofortige Hilfe", "Zeitaufwendig", "Erfordert Mut"],
    riskLevel: "low"
  },
  {
    id: 5,
    name: "Hilfe holen",
    description: "Vertrauenspersonen, Beratungsstellen oder Autoritäten um Unterstützung bitten.",
    icon: "🆘",
    category: "supportive",
    pros: ["Professionelle Unterstützung", "Geteilte Verantwortung", "Expertise"],
    cons: ["Abhängigkeit von anderen", "Mögliche Verzögerung", "Verlust der Kontrolle"],
    riskLevel: "low"
  },
  {
    id: 6,
    name: "Humor/Deflection",
    description: "Mit Humor oder Ironie antworten um die Situation zu entschärfen.",
    icon: "😄",
    category: "deflective",
    pros: ["Entschärft Situation", "Zeigt Gelassenheit", "Kann Sympathie erzeugen"],
    cons: ["Kann missverstanden werden", "Risiko der Verharmlosung", "Timing wichtig"],
    riskLevel: "medium"
  },
  {
    id: 7,
    name: "Sachliche Korrektur",
    description: "Faktische Fehler korrigieren ohne emotional zu werden.",
    icon: "✅",
    category: "informative",
    pros: ["Stellt Fakten klar", "Professionell", "Bildend"],
    cons: ["Kann als belehrend wirken", "Ignoriert emotionale Ebene", "Möglicherweise wirkungslos"],
    riskLevel: "low"
  },
  {
    id: 8,
    name: "Empathische Reaktion",
    description: "Verständnis für mögliche Gründe des Verhaltens zeigen.",
    icon: "❤️",
    category: "empathetic",
    pros: ["Zeigt Menschlichkeit", "Kann Aggression reduzieren", "Fördert Dialog"],
    cons: ["Kann als Schwäche interpretiert werden", "Rechtfertigt möglicherweise Verhalten", "Emotional belastend"],
    riskLevel: "low"
  }
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Check if requesting a specific strategy
  const { id } = req.query;
  
  if (id) {
    const strategyId = parseInt(id as string);
    const strategy = predefinedStrategies.find(s => s.id === strategyId);
    
    if (!strategy) {
      return res.status(404).json({ message: 'Strategy not found' });
    }
    
    return res.json(strategy);
  }

  res.json(predefinedStrategies);
}

