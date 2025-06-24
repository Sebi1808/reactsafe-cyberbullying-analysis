import { Sliders, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ModeSelectorProps {
  mode: 'manual' | 'autopilot';
  onModeChange: (mode: 'manual' | 'autopilot') => void;
}

export default function ModeSelector({ mode, onModeChange }: ModeSelectorProps) {
  return (
    <div className="animate-in fade-in duration-300">
      <Card className="shadow-custom">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Analyse-Modus wählen</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button
              variant={mode === 'manual' ? 'default' : 'outline'}
              className={`p-4 h-auto flex items-center space-x-3 transition-all ${
                mode === 'manual' 
                  ? 'bg-primary text-white hover:bg-blue-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onModeChange('manual')}
            >
              <Sliders className="w-6 h-6" />
              <div className="text-left">
                <h3 className="font-semibold">Manueller Modus</h3>
                <p className="text-sm opacity-90">Konfigurierbare Parameter</p>
              </div>
            </Button>
            
            <Button
              variant={mode === 'autopilot' ? 'default' : 'outline'}
              className={`p-4 h-auto flex items-center space-x-3 transition-all ${
                mode === 'autopilot' 
                  ? 'bg-primary text-white hover:bg-blue-600' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => onModeChange('autopilot')}
            >
              <Bot className="w-6 h-6" />
              <div className="text-left">
                <h3 className="font-semibold">Autopilot</h3>
                <p className="text-sm opacity-70">Automatische Analyse</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
