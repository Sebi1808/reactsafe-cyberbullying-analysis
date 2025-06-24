import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Brain, Zap, Shield, TrendingUp, AlertTriangle } from "lucide-react";
import { useAnalyzeComment, useGenerateResponse } from "@/hooks/use-analysis";
import { useToast } from "@/hooks/use-toast";
import type { AnalysisResult, Strategy, Comment, ContextInfo } from "@shared/schema";
import ContextModal from "@/components/context-modal";

export default function AnalyzePage() {
  const [comment, setComment] = useState('');
  const [mode, setMode] = useState<'manual' | 'autopilot'>('autopilot');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzedComment, setAnalyzedComment] = useState<Comment | null>(null);
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [generatedResponses, setGeneratedResponses] = useState<Record<number, string>>({});
  const [activeTab, setActiveTab] = useState("analyze");
  const [contextInfo, setContextInfo] = useState<ContextInfo | null>(null);
  const [showContextModal, setShowContextModal] = useState(false);

  const { toast } = useToast();
  const analyzeCommentMutation = useAnalyzeComment();
  const generateResponseMutation = useGenerateResponse();

  const handleAnalyze = async () => {
    if (!comment.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie einen Kommentar ein.",
        variant: "destructive",
      });
      return;
    }

    if (mode === 'autopilot' && !contextInfo) {
      setShowContextModal(true);
      return;
    }

    try {
      const result = await analyzeCommentMutation.mutateAsync({
        comment,
        mode,
        context: contextInfo || undefined,
      });

      setAnalysisResult(result.analysis);
      setAnalyzedComment(result.comment);
      setStrategies(result.recommendedStrategies);
      setActiveTab("results");

      // Auto-generate responses for top 3 strategies
      const topStrategies = result.recommendedStrategies.slice(0, 3);
      for (const strategy of topStrategies) {
        try {
          const responseResult = await generateResponseMutation.mutateAsync({
            commentId: result.comment.id,
            strategyId: strategy.id,
            context: contextInfo || undefined,
          });
          setGeneratedResponses(prev => ({
            ...prev,
            [strategy.id]: responseResult.response.generatedText
          }));
        } catch (error) {
          console.error(`Failed to generate response for strategy ${strategy.id}:`, error);
        }
      }

      toast({
        title: "Analyse abgeschlossen",
        description: "Kommentar wurde erfolgreich analysiert und Antworten generiert.",
      });
    } catch (error) {
      toast({
        title: "Analyse fehlgeschlagen",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten.",
        variant: "destructive",
      });
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
    }
  };

  const getRiskLabel = (level: string) => {
    switch (level) {
      case 'high': return 'Hohes Risiko';
      case 'medium': return 'Mittleres Risiko';
      case 'low': return 'Niedriges Risiko';
      default: return 'Unbekannt';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#4B0F2E' }}>
            AI-Analyse
          </h1>
          <p className="text-gray-600">
            Analysieren Sie Cybermobbing-Kommentare und erhalten Sie strategische Antwortvorschläge
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="analyze" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Analysieren
            </TabsTrigger>
            <TabsTrigger value="results" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Ergebnisse
            </TabsTrigger>
            <TabsTrigger value="responses" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Antworten
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analyze" className="space-y-6">
            {/* Mode Selection */}
            <Card className="shadow-apple">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" style={{ color: '#9C2C63' }} />
                  Analyse-Modus
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button
                    variant={mode === 'autopilot' ? 'default' : 'outline'}
                    className={`p-6 h-auto ${mode === 'autopilot' ? 'text-white' : ''}`}
                    style={{
                      background: mode === 'autopilot' ? 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' : 'transparent'
                    }}
                    onClick={() => setMode('autopilot')}
                  >
                    <div className="text-left">
                      <div className="font-semibold mb-1">🤖 Autopilot</div>
                      <div className="text-sm opacity-90">Automatische Analyse mit Kontext</div>
                    </div>
                  </Button>
                  <Button
                    variant={mode === 'manual' ? 'default' : 'outline'}
                    className={`p-6 h-auto ${mode === 'manual' ? 'text-white' : ''}`}
                    style={{
                      background: mode === 'manual' ? 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' : 'transparent'
                    }}
                    onClick={() => setMode('manual')}
                  >
                    <div className="text-left">
                      <div className="font-semibold mb-1">⚙️ Manuell</div>
                      <div className="text-sm opacity-90">Konfigurierbare Parameter</div>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Comment Input */}
            <Card className="shadow-apple">
              <CardHeader>
                <CardTitle>Kommentar eingeben</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Fügen Sie hier den zu analysierenden Kommentar ein..."
                  className="min-h-[120px] resize-none"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {comment.length}/500 Zeichen
                  </div>
                  <Button 
                    onClick={handleAnalyze}
                    disabled={analyzeCommentMutation.isPending || !comment.trim()}
                    className="text-white"
                    style={{ background: 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' }}
                  >
                    {analyzeCommentMutation.isPending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Analysiere...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Analysieren
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            {analysisResult && (
              <>
                {/* Risk Overview */}
                <Card className="shadow-apple">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" style={{ color: getRiskColor(analysisResult.riskLevel) }} />
                      Risiko-Bewertung
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-3xl font-bold" style={{ color: getRiskColor(analysisResult.riskLevel) }}>
                          {analysisResult.riskScore.toFixed(1)}/10
                        </div>
                        <Badge 
                          variant="outline" 
                          className="mt-1"
                          style={{ 
                            borderColor: getRiskColor(analysisResult.riskLevel),
                            color: getRiskColor(analysisResult.riskLevel)
                          }}
                        >
                          {getRiskLabel(analysisResult.riskLevel)}
                        </Badge>
                      </div>
                      <div className="w-32 h-32 relative">
                        <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
                        <div 
                          className="absolute inset-0 rounded-full border-8 border-transparent"
                          style={{
                            borderTopColor: getRiskColor(analysisResult.riskLevel),
                            transform: `rotate(${(analysisResult.riskScore / 10) * 360}deg)`,
                            transition: 'transform 1s ease-out'
                          }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Analysis Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Linguistic Analysis */}
                  <Card className="shadow-apple">
                    <CardHeader>
                      <CardTitle className="text-lg">🔤 Linguistische Analyse</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Negative Sprache</span>
                          <span>{analysisResult.categories.linguistic.negativeLanguage}%</span>
                        </div>
                        <Progress value={analysisResult.categories.linguistic.negativeLanguage} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Aggressive Wörter</span>
                          <span>{analysisResult.categories.linguistic.aggressiveWords}%</span>
                        </div>
                        <Progress value={analysisResult.categories.linguistic.aggressiveWords} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Emotionale Intensität</span>
                          <span>{analysisResult.categories.linguistic.emotionalIntensity}%</span>
                        </div>
                        <Progress value={analysisResult.categories.linguistic.emotionalIntensity} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Cyberbullying Indicators */}
                  <Card className="shadow-apple">
                    <CardHeader>
                      <CardTitle className="text-lg">🎯 Mobbing-Indikatoren</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">Herabsetzung</span>
                        <Badge variant="outline" className="text-xs">
                          {analysisResult.categories.cyberbullying.degradation}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Isolation</span>
                        <Badge variant="outline" className="text-xs">
                          {analysisResult.categories.cyberbullying.isolation}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Machtgefälle</span>
                        <Badge variant="outline" className="text-xs">
                          {analysisResult.categories.cyberbullying.powerImbalance}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Communication Analysis */}
                  <Card className="shadow-apple">
                    <CardHeader>
                      <CardTitle className="text-lg">💬 Kommunikation</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Ton:</span>
                        <div className="font-medium capitalize">{analysisResult.categories.communication.tone}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Intention:</span>
                        <div className="font-medium capitalize">{analysisResult.categories.communication.intention}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Eskalation:</span>
                        <Badge variant="outline" className="ml-2">
                          {analysisResult.categories.communication.escalationPotential}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="responses" className="space-y-6">
            {strategies.length > 0 && (
              <div className="grid gap-6">
                {strategies.map((strategy) => (
                  <Card key={strategy.id} className="shadow-apple">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <span className="text-2xl">{strategy.icon}</span>
                        <div>
                          <div className="font-semibold">{strategy.name}</div>
                          <div className="text-sm text-gray-600 font-normal">{strategy.description}</div>
                        </div>
                        <Badge 
                          variant="outline"
                          className={`ml-auto ${
                            strategy.riskLevel === 'low' ? 'border-green-500 text-green-700' :
                            strategy.riskLevel === 'medium' ? 'border-yellow-500 text-yellow-700' :
                            'border-red-500 text-red-700'
                          }`}
                        >
                          {strategy.riskLevel === 'low' ? 'Empfohlen' : 
                           strategy.riskLevel === 'medium' ? 'Neutral' : 'Risiko'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {generatedResponses[strategy.id] && (
                        <div className="mb-4 p-4 rounded-lg" style={{ backgroundColor: '#C0E8D5' }}>
                          <div className="text-sm font-medium mb-2" style={{ color: '#4B0F2E' }}>AI-Antwortvorschlag:</div>
                          <div className="text-sm">{generatedResponses[strategy.id]}</div>
                        </div>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="font-medium text-green-700 mb-2">✅ Vorteile:</div>
                          <ul className="space-y-1 text-green-600">
                            {Array.isArray(strategy.pros) && strategy.pros.map((pro, index) => (
                              <li key={index}>• {pro}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <div className="font-medium text-red-700 mb-2">❌ Nachteile:</div>
                          <ul className="space-y-1 text-red-600">
                            {Array.isArray(strategy.cons) && strategy.cons.map((con, index) => (
                              <li key={index}>• {con}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Context Modal */}
        {showContextModal && (
          <ContextModal
            isOpen={showContextModal}
            onClose={() => setShowContextModal(false)}
            onSave={(context) => {
              setContextInfo(context);
              setShowContextModal(false);
              handleAnalyze();
            }}
          />
        )}
      </div>
    </div>
  );
}