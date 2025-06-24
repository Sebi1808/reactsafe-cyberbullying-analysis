import { Search, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useAnalyzeComment } from "@/hooks/use-analysis";
import { useToast } from "@/hooks/use-toast";
import type { AnalysisParameters, ContextInfo, AnalysisResult, Strategy, Comment } from "@shared/schema";

interface CommentInputProps {
  comment: string;
  onCommentChange: (comment: string) => void;
  mode: 'manual' | 'autopilot';
  parameters?: AnalysisParameters;
  contextInfo?: ContextInfo | null;
  onAnalysisStart: () => void;
  onAnalysisComplete: (result: AnalysisResult, comment: Comment, strategies: Strategy[]) => void;
}

export default function CommentInput({ 
  comment, 
  onCommentChange, 
  mode, 
  parameters, 
  contextInfo,
  onAnalysisStart,
  onAnalysisComplete 
}: CommentInputProps) {
  const { toast } = useToast();
  const analyzeCommentMutation = useAnalyzeComment();

  const handleAnalyze = async () => {
    if (!comment.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte geben Sie einen Kommentar ein.",
        variant: "destructive",
      });
      return;
    }

    try {
      onAnalysisStart();
      
      const result = await analyzeCommentMutation.mutateAsync({
        comment,
        mode,
        parameters,
        context: contextInfo || undefined,
      });

      onAnalysisComplete(result.analysis, result.comment, result.recommendedStrategies);

      toast({
        title: "Analyse abgeschlossen",
        description: "Der Kommentar wurde erfolgreich analysiert.",
      });
    } catch (error) {
      toast({
        title: "Analyse fehlgeschlagen",
        description: error instanceof Error ? error.message : "Ein unbekannter Fehler ist aufgetreten.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <Card className="shadow-custom">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Kommentar zur Analyse</h2>
          <div className="space-y-4">
            <Textarea
              placeholder="Fügen Sie hier den zu analysierenden Kommentar ein..."
              className="min-h-[100px] resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={comment}
              onChange={(e) => onCommentChange(e.target.value)}
            />
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Ihre Daten werden verschlüsselt übertragen</span>
              </div>
              <Button 
                onClick={handleAnalyze}
                disabled={analyzeCommentMutation.isPending || !comment.trim()}
                className="bg-primary text-white hover:bg-blue-600 transition-all"
              >
                <Search className="w-4 h-4 mr-2" />
                Analysieren
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
