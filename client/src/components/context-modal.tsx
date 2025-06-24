import { useState } from "react";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ContextInfo } from "@shared/schema";

interface ContextModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (context: ContextInfo) => void;
}

export default function ContextModal({ isOpen, onClose, onSave }: ContextModalProps) {
  const [relationship, setRelationship] = useState<'unknown' | 'colleague' | 'friend' | 'family' | 'other'>('unknown');
  const [desiredReaction, setDesiredReaction] = useState<'deescalate' | 'confront' | 'ignore' | 'report'>('deescalate');
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSave = () => {
    onSave({
      relationship,
      desiredReaction,
      additionalInfo: additionalInfo.trim() || undefined,
    });
  };

  const handleCancel = () => {
    // Reset form
    setRelationship('unknown');
    setDesiredReaction('deescalate');
    setAdditionalInfo('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-apple-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Kontext-Informationen
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 p-1">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Beziehung zum Angreifer
            </Label>
            <Select value={relationship} onValueChange={(value: any) => setRelationship(value)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="unknown">Unbekannt</SelectItem>
                <SelectItem value="colleague">Kollege/Kollegin</SelectItem>
                <SelectItem value="friend">Freund/Freundin</SelectItem>
                <SelectItem value="family">Familienmitglied</SelectItem>
                <SelectItem value="other">Andere</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Gewünschte Reaktion
            </Label>
            <RadioGroup value={desiredReaction} onValueChange={(value: any) => setDesiredReaction(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="deescalate" id="deescalate" />
                <Label htmlFor="deescalate" className="text-sm">Deeskalieren</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="confront" id="confront" />
                <Label htmlFor="confront" className="text-sm">Konfrontieren</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="ignore" id="ignore" />
                <Label htmlFor="ignore" className="text-sm">Ignorieren</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="report" id="report" />
                <Label htmlFor="report" className="text-sm">Melden</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Zusätzliche Informationen
            </Label>
            <Textarea
              className="resize-none"
              rows={3}
              placeholder="Beschreiben Sie den Kontext oder besondere Umstände..."
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={handleCancel}>
              Abbrechen
            </Button>
            <Button 
              onClick={handleSave} 
              className="text-white"
              style={{ background: 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' }}
            >
              Speichern
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
