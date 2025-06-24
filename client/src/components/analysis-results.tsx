import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AnalysisResult } from "@shared/schema";

interface AnalysisResultsProps {
  analysis: AnalysisResult;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'low': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskTitle = (level: string) => {
    switch (level) {
      case 'high': return 'Hohes Risiko erkannt';
      case 'medium': return 'Mittleres Risiko erkannt';
      case 'low': return 'Niedriges Risiko erkannt';
      default: return 'Risiko unbekannt';
    }
  };

  const getPercentageColor = (value: number) => {
    if (value >= 70) return 'text-red-600';
    if (value >= 40) return 'text-orange-600';
    return 'text-yellow-600';
  };

  const getSeverityColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-orange-600';
      case 'low': return 'text-yellow-600';
      default: return 'text-gray-600';
    }
  };

  const getSeverityLabel = (level: string) => {
    switch (level) {
      case 'high': return 'Hoch';
      case 'medium': return 'Mittel';
      case 'low': return 'Niedrig';
      default: return 'Unbekannt';
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <Card className="shadow-custom">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Analyse-Ergebnisse</h2>
          <div className="space-y-4">
            {/* Threat Level Indicator */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${getRiskColor(analysis.riskLevel)}`}>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-current rounded-full flex items-center justify-center opacity-80">
                  <AlertTriangle className="text-white w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold">{getRiskTitle(analysis.riskLevel)}</h3>
                  <p className="text-sm opacity-80">Cybermobbing-Indikatoren gefunden</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">{analysis.riskScore.toFixed(1)}</div>
                <div className="text-xs opacity-70">von 10</div>
              </div>
            </div>

            {/* Analysis Categories */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Linguistic Analysis */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-3">Linguistische Analyse</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Negative Sprache</span>
                    <span className={getPercentageColor(analysis.categories.linguistic.negativeLanguage)}>
                      {analysis.categories.linguistic.negativeLanguage}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Aggressive Wörter</span>
                    <span className={getPercentageColor(analysis.categories.linguistic.aggressiveWords)}>
                      {analysis.categories.linguistic.aggressiveWords}%
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Emotionale Intensität</span>
                    <span className={getPercentageColor(analysis.categories.linguistic.emotionalIntensity)}>
                      {analysis.categories.linguistic.emotionalIntensity}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Cyberbullying Indicators */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-3">Mobbing-Indikatoren</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Herabsetzung</span>
                    <span className={getSeverityColor(analysis.categories.cyberbullying.degradation)}>
                      {getSeverityLabel(analysis.categories.cyberbullying.degradation)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Isolation</span>
                    <span className={getSeverityColor(analysis.categories.cyberbullying.isolation)}>
                      {getSeverityLabel(analysis.categories.cyberbullying.isolation)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Machtgefälle</span>
                    <span className={getSeverityColor(analysis.categories.cyberbullying.powerImbalance)}>
                      {getSeverityLabel(analysis.categories.cyberbullying.powerImbalance)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Communication Analysis */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-medium text-gray-700 mb-3">Kommunikation</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Ton</span>
                    <span className="text-gray-700 capitalize">{analysis.categories.communication.tone}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Intention</span>
                    <span className="text-gray-700 capitalize">{analysis.categories.communication.intention}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Eskalation</span>
                    <span className={getSeverityColor(analysis.categories.communication.escalationPotential)}>
                      {getSeverityLabel(analysis.categories.communication.escalationPotential)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tiefe Linguistische Analyse */}
      <LinguisticAnalysisDisplay analysis={analysis} />
    </div>
  );
}
