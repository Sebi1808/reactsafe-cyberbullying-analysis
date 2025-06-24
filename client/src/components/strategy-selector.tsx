import { ChevronRight, Egg, Shield, EyeOff, Smile, CheckCircle, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Strategy } from "@shared/schema";

interface StrategySelectorProps {
  strategies: Strategy[];
  selectedStrategy: Strategy | null;
  onStrategySelect: (strategy: Strategy) => void;
}

export default function StrategySelector({ strategies, selectedStrategy, onStrategySelect }: StrategySelectorProps) {
  const getStrategyIcon = (icon: string) => {
    switch (icon) {
      case 'fas fa-dove': return <Egg className="w-4 h-4 text-white" />;
      case 'fas fa-shield': return <Shield className="w-4 h-4 text-white" />;
      case 'fas fa-eye-slash': return <EyeOff className="w-4 h-4 text-white" />;
      case 'fas fa-smile': return <Smile className="w-4 h-4 text-white" />;
      case 'fas fa-check-circle': return <CheckCircle className="w-4 h-4 text-white" />;
      case 'fas fa-heart': return <Heart className="w-4 h-4 text-white" />;
      default: return <Shield className="w-4 h-4 text-white" />;
    }
  };

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel) {
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Empfohlen</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Neutral</Badge>;
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Risiko</Badge>;
      default:
        return <Badge variant="secondary">Unbekannt</Badge>;
    }
  };

  const getIconBackground = (category: string) => {
    switch (category) {
      case 'defensive': return 'bg-accent';
      case 'assertive': return 'bg-secondary';
      case 'passive': return 'bg-neutral';
      case 'deflective': return 'bg-yellow-500';
      case 'informative': return 'bg-blue-500';
      case 'empathetic': return 'bg-pink-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <Card className="shadow-custom">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Empfohlene Strategien</h2>
          <div className="space-y-4">
            {strategies.map((strategy) => (
              <div
                key={strategy.id}
                className={`border rounded-xl p-4 hover:shadow-md transition-all cursor-pointer ${
                  selectedStrategy?.id === strategy.id 
                    ? 'border-primary bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onStrategySelect(strategy)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`w-8 h-8 ${getIconBackground(strategy.category)} rounded-full flex items-center justify-center`}>
                        {getStrategyIcon(strategy.icon)}
                      </div>
                      <h3 className="font-semibold text-gray-900">{strategy.name}</h3>
                      {getRiskBadge(strategy.riskLevel)}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{strategy.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <h4 className="text-xs font-medium text-green-700 mb-1">Vorteile:</h4>
                        <ul className="text-xs text-green-600 space-y-1">
                          {Array.isArray(strategy.pros) && strategy.pros.map((pro, index) => (
                            <li key={index}>• {pro}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-red-700 mb-1">Nachteile:</h4>
                        <ul className="text-xs text-red-600 space-y-1">
                          {Array.isArray(strategy.cons) && strategy.cons.map((con, index) => (
                            <li key={index}>• {con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  <button className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="text-gray-400 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
