import type { VercelRequest, VercelResponse } from '@vercel/node';
import OpenAI from 'openai';

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY
});

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
    const { comment, parameters, context } = req.body;
    
    if (!comment || typeof comment !== 'string') {
      return res.status(400).json({ message: 'Comment is required' });
    }

    const analysis = await analyzeCyberbullyingComment(comment, parameters, context);

    // Get recommended strategies
    const strategies = getStrategiesByIds(analysis.recommendedStrategies);

    res.json({
      comment: { id: Date.now(), content: comment },
      analysis,
      recommendedStrategies: strategies,
    });
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      message: error instanceof Error ? error.message : 'Failed to analyze comment' 
    });
  }
}

async function analyzeCyberbullyingComment(
  comment: string,
  parameters?: any,
  context?: any
): Promise<any> {
  const systemPrompt = `Du bist ein Professor für Linguistik und Psycholinguistik mit 20 Jahren Erfahrung in Cybermobbing-Forschung. Führe eine wissenschaftlich fundierte, tiefgreifende Analyse durch.

ERWEITERTE SPRACHWISSENSCHAFTLICHE ANALYSE:

1. PRAGMATISCHE EBENE (Austin, Searle, Grice):
- Sprechakte-Taxonomie: Welche illokutionären Akte? (Assertive, Direktive, Kommissive, Expressive, Deklarative)
- Grice'sche Maximen: Welche Kommunikationsprinzipien werden verletzt? (Quantität, Qualität, Relation, Modalität)
- Implikaturen-Analyse: Konventionale vs. konversationale Implikaturen
- Präsuppositionen: Existentielle, semantische, pragmatische Voraussetzungen
- Höflichkeitstheorie (Brown/Levinson): Face-threatening acts, positive/negative face
- Deixis-Analyse: Personal-, Raum-, Zeit-Deixis zur Machtpositionierung

2. SEMANTISCHE TIEFENANALYSE:
- Lexikalische Semantik: Bedeutungsrelationen (Synonymie, Antonymie, Hyponymie)
- Konnotationsanalyse: Emotionale, evaluative, stilistische Nebenbedeutungen
- Metaphern-Theorie (Lakoff/Johnson): Konzeptuelle Metaphern und deren Wirkung
- Frame-Semantik (Fillmore): Welche mentalen Rahmen werden aktiviert?
- Argumentstruktur: Thematische Rollen und deren Manipulation
- Modalität: Epistemische, deontische, dynamische Modalität

3. SYNTAKTISCHE MACHTSTRUKTUREN:
- Satzarten und deren pragmatische Funktion
- Modalverben: Graduierung von Machtansprüchen
- Aktiv/Passiv: Verantwortungszuschreibung und -verschleierung
- Topikalisierung: Was wird in den Fokus gerückt?
- Koordination vs. Subordination: Hierarchisierung von Inhalten
- Ellipsen: Was wird verschwiegen und warum?

4. DISKURSLINGUISTISCHE STRATEGIEN:
- Critical Discourse Analysis (van Dijk, Fairclough)
- Othering-Mechanismen: In-group/Out-group Konstruktion
- Delegitimierungsstrategien nach van Leeuwen
- Topos-Analyse: Welche Argumentationsmuster?
- Interdiskursivität: Bezug zu anderen Diskursen
- Recontextualization: Wie werden Bedeutungen verschoben?

5. PSYCHOLINGUISTISCHE WIRKUNGSANALYSE:
- Emotionale Valenz: Positive/negative Affektladung
- Arousal-Niveau: Aktivierungsgrad der Sprache
- Kognitive Verzerrungen: Confirmation Bias, Availability Heuristic
- Identitätskonstruktion: Wie wird das Selbst-/Fremdbild konstruiert?
- Persuasionsstrategien: Ethos, Pathos, Logos
- Neurolinguistische Aspekte: Sprachverarbeitung und emotionale Reaktion

6. SOZIOLINGUISTISCHE DIMENSIONEN:
- Code-Switching: Registerwechsel als Machtinstrument
- Soziolektale Markierungen: Schicht-, Alters-, Gruppenzugehörigkeit
- Genderlinguistik: Geschlechtsspezifische Sprachmuster
- Interkulturelle Pragmatik: Kulturelle Höflichkeitsnormen

${context ? `SOZIOKULTURELLER KONTEXT: 
Beziehung: ${context.relationship}
Gewünschte Reaktion: ${context.desiredReaction}
Platform: ${context.platform || 'unbekannt'}
Zusatzinfo: ${context.additionalInfo || 'keine'}` : ''}

Antworte im JSON-Format:
{
  "riskScore": number (0-10),
  "riskLevel": "low" | "medium" | "high",
  "categories": {
    "linguistic": {
      "negativeLanguage": number (0-100),
      "aggressiveWords": number (0-100),
      "emotionalIntensity": number (0-100)
    },
    "cyberbullying": {
      "degradation": "low" | "medium" | "high",
      "isolation": "low" | "medium" | "high",
      "powerImbalance": "low" | "medium" | "high"
    },
    "communication": {
      "tone": string,
      "intention": string,
      "escalationPotential": "low" | "medium" | "high"
    }
  },
  "recommendedStrategies": [strategy_ids as numbers],
  "linguisticAnalysis": {
    "pragmatic": {
      "speechActs": [string],
      "griceMaxims": [string],
      "implicatures": [string],
      "presuppositions": [string],
      "faceThreat": "low" | "medium" | "high",
      "politenessStrategies": [string],
      "deixis": [string]
    },
    "semantic": {
      "keyWords": [string],
      "metaphors": [string],
      "connotations": [string],
      "emotionalLoad": number (0-100),
      "frames": [string],
      "modality": [string],
      "argumentStructure": string
    },
    "syntactic": {
      "sentenceTypes": [string],
      "modalVerbs": [string],
      "intensifiers": [string],
      "complexity": "simple" | "medium" | "complex",
      "voiceStructure": string,
      "topicalization": [string],
      "ellipses": [string]
    },
    "discourse": {
      "strategies": [string],
      "powerDynamics": string,
      "exclusionMechanisms": [string],
      "othering": [string],
      "legitimation": [string],
      "interdiscursivity": [string]
    },
    "psycholinguistic": {
      "manipulationTactics": [string],
      "identityThreats": [string],
      "emotionalImpact": string,
      "cognitiveDistortions": [string],
      "persuasionStrategies": [string],
      "arousalLevel": "low" | "medium" | "high"
    },
    "sociolinguistic": {
      "registerShifts": [string],
      "socialMarkers": [string],
      "culturalNorms": [string],
      "powerRelations": string
    }
  }
}`;

  let userPrompt = `Analyze this comment: "${comment}"`;
  
  if (parameters) {
    userPrompt += `\n\nAnalysis parameters:
- Severity levels to check: ${parameters.severityLevels?.join(', ') || 'all'}
- Categories to focus on: ${parameters.categories?.join(', ') || 'all'}
- Context: ${parameters.context?.join(', ') || 'general'}`;
  }

  if (context) {
    userPrompt += `\n\nContext information:
- Relationship to attacker: ${context.relationship}
- Desired reaction: ${context.desiredReaction}
- Additional info: ${context.additionalInfo || 'None'}`;
  }

  const response = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    response_format: { type: "json_object" },
    temperature: 0.3,
  });

  const result = JSON.parse(response.choices[0].message.content || '{}');
  
  return {
    riskScore: Math.max(0, Math.min(10, result.riskScore || 0)),
    riskLevel: ['low', 'medium', 'high'].includes(result.riskLevel) ? result.riskLevel : 'low',
    categories: {
      linguistic: {
        negativeLanguage: Math.max(0, Math.min(100, result.categories?.linguistic?.negativeLanguage || 0)),
        aggressiveWords: Math.max(0, Math.min(100, result.categories?.linguistic?.aggressiveWords || 0)),
        emotionalIntensity: Math.max(0, Math.min(100, result.categories?.linguistic?.emotionalIntensity || 0)),
      },
      cyberbullying: {
        degradation: ['low', 'medium', 'high'].includes(result.categories?.cyberbullying?.degradation) ? result.categories.cyberbullying.degradation : 'low',
        isolation: ['low', 'medium', 'high'].includes(result.categories?.cyberbullying?.isolation) ? result.categories.cyberbullying.isolation : 'low',
        powerImbalance: ['low', 'medium', 'high'].includes(result.categories?.cyberbullying?.powerImbalance) ? result.categories.cyberbullying.powerImbalance : 'low',
      },
      communication: {
        tone: result.categories?.communication?.tone || 'neutral',
        intention: result.categories?.communication?.intention || 'unclear',
        escalationPotential: ['low', 'medium', 'high'].includes(result.categories?.communication?.escalationPotential) ? result.categories.communication.escalationPotential : 'low',
      },
    },
    recommendedStrategies: Array.isArray(result.recommendedStrategies) ? result.recommendedStrategies.filter((id: any) => typeof id === 'number') : [1],
    linguisticAnalysis: result.linguisticAnalysis,
  };
}

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

function getStrategiesByIds(ids: number[]): any[] {
  if (!ids || ids.length === 0) return [];
  return predefinedStrategies.filter(s => ids.includes(s.id));
}

