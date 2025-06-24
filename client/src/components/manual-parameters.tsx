import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { AnalysisParameters } from "@shared/schema";

interface ManualParametersProps {
  parameters: AnalysisParameters;
  onParametersChange: (parameters: AnalysisParameters) => void;
}

export default function ManualParameters({ parameters, onParametersChange }: ManualParametersProps) {
  const handleSeverityChange = (level: 'light' | 'medium' | 'severe', checked: boolean) => {
    const newSeverityLevels = checked
      ? [...parameters.severityLevels, level]
      : parameters.severityLevels.filter(l => l !== level);
    
    onParametersChange({
      ...parameters,
      severityLevels: newSeverityLevels as ('light' | 'medium' | 'severe')[],
    });
  };

  const handleCategoryChange = (category: 'insult' | 'threat' | 'discrimination' | 'harassment', checked: boolean) => {
    const newCategories = checked
      ? [...parameters.categories, category]
      : parameters.categories.filter(c => c !== category);
    
    onParametersChange({
      ...parameters,
      categories: newCategories as ('insult' | 'threat' | 'discrimination' | 'harassment')[],
    });
  };

  const handleContextChange = (context: 'public' | 'private' | 'professional', checked: boolean) => {
    const newContext = checked
      ? [...parameters.context, context]
      : parameters.context.filter(c => c !== context);
    
    onParametersChange({
      ...parameters,
      context: newContext as ('public' | 'private' | 'professional')[],
    });
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-300">
      <Card className="shadow-custom">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Analyse-Parameter</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Severity Levels */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Schweregrad</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="severity-light"
                    checked={parameters.severityLevels.includes('light')}
                    onCheckedChange={(checked) => handleSeverityChange('light', checked as boolean)}
                  />
                  <Label htmlFor="severity-light" className="text-sm">Leicht</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="severity-medium"
                    checked={parameters.severityLevels.includes('medium')}
                    onCheckedChange={(checked) => handleSeverityChange('medium', checked as boolean)}
                  />
                  <Label htmlFor="severity-medium" className="text-sm">Mittel</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="severity-severe"
                    checked={parameters.severityLevels.includes('severe')}
                    onCheckedChange={(checked) => handleSeverityChange('severe', checked as boolean)}
                  />
                  <Label htmlFor="severity-severe" className="text-sm">Schwer</Label>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Kategorien</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-insult"
                    checked={parameters.categories.includes('insult')}
                    onCheckedChange={(checked) => handleCategoryChange('insult', checked as boolean)}
                  />
                  <Label htmlFor="category-insult" className="text-sm">Beleidigung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-threat"
                    checked={parameters.categories.includes('threat')}
                    onCheckedChange={(checked) => handleCategoryChange('threat', checked as boolean)}
                  />
                  <Label htmlFor="category-threat" className="text-sm">Bedrohung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-discrimination"
                    checked={parameters.categories.includes('discrimination')}
                    onCheckedChange={(checked) => handleCategoryChange('discrimination', checked as boolean)}
                  />
                  <Label htmlFor="category-discrimination" className="text-sm">Diskriminierung</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="category-harassment"
                    checked={parameters.categories.includes('harassment')}
                    onCheckedChange={(checked) => handleCategoryChange('harassment', checked as boolean)}
                  />
                  <Label htmlFor="category-harassment" className="text-sm">Belästigung</Label>
                </div>
              </div>
            </div>

            {/* Context */}
            <div className="space-y-3">
              <h3 className="font-medium text-gray-700">Kontext</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="context-public"
                    checked={parameters.context.includes('public')}
                    onCheckedChange={(checked) => handleContextChange('public', checked as boolean)}
                  />
                  <Label htmlFor="context-public" className="text-sm">Öffentlich</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="context-private"
                    checked={parameters.context.includes('private')}
                    onCheckedChange={(checked) => handleContextChange('private', checked as boolean)}
                  />
                  <Label htmlFor="context-private" className="text-sm">Privat</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="context-professional"
                    checked={parameters.context.includes('professional')}
                    onCheckedChange={(checked) => handleContextChange('professional', checked as boolean)}
                  />
                  <Label htmlFor="context-professional" className="text-sm">Beruflich</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
