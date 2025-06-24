import OpenAI from "openai";
import type { AnalysisResult, AnalysisParameters, ContextInfo } from "@shared/schema";

// the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || "default_key"
});

export async function analyzeCyberbullyingComment(
  comment: string,
  parameters?: AnalysisParameters,
  context?: ContextInfo
): Promise<AnalysisResult> {
  try {
    const systemPrompt = `You are an expert in cyberbullying detection, linguistic analysis, and communication theory. Analyze the given comment for cyberbullying indicators and provide a comprehensive assessment.

Consider the following aspects:
1. Linguistic patterns (negative language, aggressive words, emotional intensity)
2. Cyberbullying indicators (degradation, isolation attempts, power imbalance)
3. Communication theory aspects (tone, intention, escalation potential)

Provide analysis scores and classifications. Recommend appropriate communication strategies based on the analysis.

Respond with JSON in this exact format:
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
  "recommendedStrategies": [strategy_ids as numbers]
}`;

    let userPrompt = `Analyze this comment: "${comment}"`;
    
    if (parameters) {
      userPrompt += `\n\nAnalysis parameters:
- Severity levels to check: ${parameters.severityLevels.join(', ')}
- Categories to focus on: ${parameters.categories.join(', ')}
- Context: ${parameters.context.join(', ')}`;
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
    
    // Validate and ensure all required fields are present
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
      recommendedStrategies: Array.isArray(result.recommendedStrategies) ? result.recommendedStrategies.filter(id => typeof id === 'number') : [1],
    };
  } catch (error) {
    console.error('Error analyzing comment:', error);
    throw new Error(`Failed to analyze comment: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function generateResponse(
  originalComment: string,
  strategyName: string,
  strategyDescription: string,
  context?: ContextInfo
): Promise<string> {
  try {
    const systemPrompt = `You are an expert in conflict resolution and strategic communication. Generate an appropriate response to a cyberbullying comment using the specified strategy.

The response should:
1. Follow the chosen strategy guidelines
2. Be appropriate for the context
3. Be professional and constructive
4. Consider the relationship and desired outcome
5. Be realistic and actionable

Respond only with the suggested response text, no additional formatting or explanation.`;

    let userPrompt = `Original comment: "${originalComment}"

Strategy: ${strategyName}
Strategy description: ${strategyDescription}

Generate a response following this strategy.`;

    if (context) {
      userPrompt += `\n\nContext:
- Relationship: ${context.relationship}
- Desired reaction: ${context.desiredReaction}
- Additional context: ${context.additionalInfo || 'None'}`;
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
  } catch (error) {
    console.error('Error generating response:', error);
    throw new Error(`Failed to generate response: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
