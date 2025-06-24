import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, CheckCircle, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useGenerateResponse } from "@/hooks/use-analysis";
import type { Strategy, Comment, ContextInfo } from "@shared/schema";

interface StrategyTabsProps {
  strategies: Strategy[];
  comment: Comment;
  contextInfo?: ContextInfo | null;
}

export default function StrategyTabs({ strategies, comment, contextInfo }: StrategyTabsProps) {
  const [activeTab, setActiveTab] = useState(strategies[0]?.id.toString() || "0");
  const [responses, setResponses] = useState<Record<number, string>>({});
  const [loadingResponses, setLoadingResponses] = useState<Record<number, boolean>>({});
  const { toast } = useToast();
  const generateResponse = useGenerateResponse();

  const handleGenerateResponse = async (strategyId: number) => {
    setLoadingResponses(prev => ({ ...prev, [strategyId]: true }));
    
    try {
      const result = await generateResponse.mutateAsync({
        commentId: comment.id,
        strategyId,
        context: contextInfo || undefined
      });
      
      setResponses(prev => ({ ...prev, [strategyId]: result.response.content }));
      toast({
        title: "Antwort generiert",
        description: "Die KI-Antwort wurde erfolgreich erstellt.",
      });
    } catch (error) {
      console.error('Failed to generate response for strategy', strategyId, error);
      toast({
        title: "Fehler",
        description: "Die Antwort konnte nicht generiert werden.",
        variant: "destructive",
      });
    } finally {
      setLoadingResponses(prev => ({ ...prev, [strategyId]: false }));
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Kopiert",
        description: "Der Text wurde in die Zwischenablage kopiert.",
      });
    } catch (error) {
      toast({
        title: "Fehler",
        description: "Text konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'border-red-500 text-red-700 bg-red-50';
      case 'medium': return 'border-yellow-500 text-yellow-700 bg-yellow-50';
      case 'low': return 'border-green-500 text-green-700 bg-green-50';
      default: return 'border-gray-500 text-gray-700 bg-gray-50';
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

  if (!strategies.length) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-gray-500">Keine Strategien verfügbar</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl text-[#4B0F2E]">
          Empfohlene Strategien
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 gap-1 mb-6">
            {strategies.slice(0, 4).map((strategy) => (
              <TabsTrigger 
                key={strategy.id} 
                value={strategy.id.toString()}
                className="flex flex-col items-center p-3 h-auto"
              >
                <span className="text-lg mb-1">{strategy.icon}</span>
                <span className="text-xs font-medium text-center">{strategy.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {strategies.map((strategy) => (
            <TabsContent key={strategy.id} value={strategy.id.toString()} className="mt-0">
              <div className="space-y-4">
                {/* Strategy Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: '#C0E8D5' }}
                    >
                      {strategy.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#4B0F2E]">{strategy.name}</h3>
                      <p className="text-gray-600 text-sm">{strategy.description}</p>
                    </div>
                  </div>
                  <Badge className={getRiskColor(strategy.riskLevel)}>
                    {getRiskLabel(strategy.riskLevel)}
                  </Badge>
                </div>

                {/* Pros and Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-medium text-green-800 mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Vorteile
                    </h4>
                    <ul className="space-y-1">
                      {(strategy.pros || []).map((pro, index) => (
                        <li key={index} className="text-sm text-green-700 flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <h4 className="font-medium text-red-800 mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Nachteile
                    </h4>
                    <ul className="space-y-1">
                      {(strategy.cons || []).map((con, index) => (
                        <li key={index} className="text-sm text-red-700 flex items-start">
                          <span className="text-red-500 mr-2">•</span>
                          {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Generated Response */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-[#4B0F2E]">KI-generierte Antwort</h4>
                    <Button
                      onClick={() => handleGenerateResponse(strategy.id)}
                      disabled={loadingResponses[strategy.id]}
                      className="bg-[#9C2C63] hover:bg-[#4B0F2E]"
                      size="sm"
                    >
                      {loadingResponses[strategy.id] ? 'Generiere...' : 'Antwort generieren'}
                    </Button>
                  </div>
                  
                  {responses[strategy.id] && (
                    <div className="bg-gray-50 rounded-lg p-4 relative">
                      <p className="text-sm text-gray-800 mb-3">{responses[strategy.id]}</p>
                      <Button
                        onClick={() => copyToClipboard(responses[strategy.id])}
                        variant="outline"
                        size="sm"
                        className="absolute top-2 right-2"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}