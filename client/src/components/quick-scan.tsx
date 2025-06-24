import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle, Zap } from "lucide-react";
import { useAnalyzeComment } from "@/hooks/use-analysis";

interface QuickScanProps {
  onQuickScan?: (result: any) => void;
}

export default function QuickScan({ onQuickScan }: QuickScanProps) {
  const [comment, setComment] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<any>(null);
  
  const analyzeComment = useAnalyzeComment();

  const handleQuickScan = async () => {
    if (!comment.trim()) return;
    
    setIsScanning(true);
    try {
      const response = await analyzeComment.mutateAsync({
        comment: comment.trim(),
        mode: 'autopilot'
      });
      
      setResult(response.analysis);
      onQuickScan?.(response);
    } catch (error) {
      console.error('Quick scan failed:', error);
    } finally {
      setIsScanning(false);
    }
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'high': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'medium': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'low': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-50 text-red-700 border-red-200';
      case 'medium': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'low': return 'bg-green-50 text-green-700 border-green-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="w-5 h-5" style={{ color: '#9C2C63' }} />
          <span>Quick Scan</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Textarea
            placeholder="Kommentar hier einfügen für Schnellanalyse..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="min-h-[100px]"
          />
          <Button 
            onClick={handleQuickScan}
            disabled={!comment.trim() || isScanning}
            className="w-full"
            style={{ backgroundColor: '#9C2C63' }}
          >
            {isScanning ? 'Analysiere...' : 'Quick Scan starten'}
          </Button>
        </div>

        {result && (
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getRiskIcon(result.riskLevel)}
                <span className="font-medium">Risiko-Level</span>
              </div>
              <Badge className={getRiskColor(result.riskLevel)}>
                {result.riskLevel === 'high' ? 'Hoch' : 
                 result.riskLevel === 'medium' ? 'Mittel' : 'Niedrig'}
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Risiko-Score: {result.riskScore}/100</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    result.riskLevel === 'high' ? 'bg-red-500' :
                    result.riskLevel === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${result.riskScore}%` }}
                />
              </div>
            </div>

            {result.categories && result.categories.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium">Kategorien:</div>
                <div className="flex flex-wrap gap-1">
                  {result.categories.map((category: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="text-xs text-gray-600">
              Vertrauen: {Math.round((result.confidence || 0) * 100)}%
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}