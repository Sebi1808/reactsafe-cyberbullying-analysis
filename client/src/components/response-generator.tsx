import { useState } from "react";
import { Bot, RotateCcw, Edit, Copy, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useGenerateResponse } from "@/hooks/use-analysis";
import { useToast } from "@/hooks/use-toast";
import type { Comment, Strategy, ContextInfo } from "@shared/schema";

interface ResponseGeneratorProps {
  comment: Comment;
  strategy: Strategy;
  contextInfo?: ContextInfo | null;
}

export default function ResponseGenerator({ comment, strategy, contextInfo }: ResponseGeneratorProps) {
  const [generatedResponse, setGeneratedResponse] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const generateResponseMutation = useGenerateResponse();

  const handleGenerate = async () => {
    try {
      const result = await generateResponseMutation.mutateAsync({
        comment: comment.content,
        strategyId: strategy.id,
        context: contextInfo || undefined,
      });
      
      setGeneratedResponse(result.response.generatedText);
      setIsEditing(false);
      
      toast({
        title: "Antwort generiert",
        description: "Eine neue Antwort wurde basierend auf der gewählten Strategie erstellt.",
      });
    } catch (error) {
      toast({
        title: "Fehler bei der Generierung",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten.",
        variant: "destructive",
      });
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedResponse);
      toast({
        title: "Kopiert",
        description: "Der Text wurde in die Zwischenablage kopiert.",
      });
    } catch (error) {
      toast({
        title: "Fehler beim Kopieren",
        description: "Der Text konnte nicht kopiert werden.",
        variant: "destructive",
      });
    }
  };

  // Generate initial response when component mounts
  useState(() => {
    if (!generatedResponse && !generateResponseMutation.isPending) {
      handleGenerate();
    }
  });

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <Card className="shadow-custom">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Generierte Antwort</h2>
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="text-white w-4 h-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-900 mb-2">
                    AI-Vorschlag ({strategy.name})
                  </h3>
                  <div className="bg-white rounded-lg p-3 border">
                    {generateResponseMutation.isPending ? (
                      <div className="flex items-center space-x-2 text-gray-500">
                        <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-sm">Generiere Antwort...</span>
                      </div>
                    ) : (
                      <Textarea
                        className="w-full border-none resize-none focus:outline-none text-sm bg-transparent p-0"
                        rows={3}
                        value={generatedResponse}
                        onChange={(e) => setGeneratedResponse(e.target.value)}
                        readOnly={!isEditing}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleGenerate}
                  disabled={generateResponseMutation.isPending}
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Neu generieren
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  disabled={generateResponseMutation.isPending || !generatedResponse}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  {isEditing ? 'Fertig' : 'Bearbeiten'}
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopy}
                  disabled={!generatedResponse}
                >
                  <Copy className="w-4 h-4 mr-1" />
                  Kopieren
                </Button>
                <Button
                  size="sm"
                  disabled={!generatedResponse}
                  className="bg-primary text-white hover:bg-blue-600"
                >
                  <Send className="w-4 h-4 mr-1" />
                  Senden
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
