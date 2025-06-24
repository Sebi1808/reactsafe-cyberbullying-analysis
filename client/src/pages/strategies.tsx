import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Shield, Heart, MessageCircle } from "lucide-react";
import { useStrategies } from "@/hooks/use-analysis";

export default function StrategiesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const { data: strategies = [], isLoading } = useStrategies();

  const categories = [
    { id: 'all', name: 'Alle', icon: '📚', count: strategies.length },
    { id: 'defensive', name: 'Defensiv', icon: '🛡️', count: strategies.filter(s => s.category === 'defensive').length },
    { id: 'assertive', name: 'Durchsetzungsstark', icon: '⚔️', count: strategies.filter(s => s.category === 'assertive').length },
    { id: 'passive', name: 'Passiv', icon: '🚫', count: strategies.filter(s => s.category === 'passive').length },
    { id: 'empathetic', name: 'Empathisch', icon: '❤️', count: strategies.filter(s => s.category === 'empathetic').length },
    { id: 'informative', name: 'Informativ', icon: '📝', count: strategies.filter(s => s.category === 'informative').length },
    { id: 'supportive', name: 'Unterstützend', icon: '🤝', count: strategies.filter(s => s.category === 'supportive').length },
    { id: 'deflective', name: 'Ablenkend', icon: '😄', count: strategies.filter(s => s.category === 'deflective').length }
  ];

  const filteredStrategies = strategies.filter(strategy => {
    const matchesSearch = strategy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         strategy.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || strategy.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
      case 'high': return 'Risiko';
      case 'medium': return 'Neutral';
      case 'low': return 'Empfohlen';
      default: return 'Unbekannt';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Strategien werden geladen...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#4B0F2E' }}>
            Strategien-Bibliothek
          </h1>
          <p className="text-gray-600">
            Voll theoretisch und praktisch ausgearbeitete Strategien für den Umgang mit Cybermobbing
          </p>
        </div>

        {/* Search */}
        <Card className="shadow-apple mb-6">
          <CardContent className="p-6">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Suche nach Strategien..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Categories */}
        <Card className="shadow-apple mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" style={{ color: '#9C2C63' }} />
              Kategorien
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  className={`p-4 h-auto justify-start ${selectedCategory === category.id ? 'text-white' : ''}`}
                  style={{
                    background: selectedCategory === category.id ? 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' : 'transparent'
                  }}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{category.name}</div>
                      <div className="text-xs opacity-70">{category.count} Strategien</div>
                    </div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Strategies Grid */}
        <div className="grid gap-6">
          {filteredStrategies.map((strategy) => (
            <Card key={strategy.id} className="shadow-apple hover:shadow-apple-lg transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                         style={{ backgroundColor: '#C0E8D5' }}>
                      {strategy.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold" style={{ color: '#4B0F2E' }}>
                        {strategy.name}
                      </h3>
                      <p className="text-gray-600 mt-1">{strategy.description}</p>
                    </div>
                  </div>
                  <Badge 
                    variant="outline"
                    className="shrink-0"
                    style={{ 
                      borderColor: getRiskColor(strategy.riskLevel),
                      color: getRiskColor(strategy.riskLevel)
                    }}
                  >
                    {getRiskLabel(strategy.riskLevel)}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Pros */}
                  <div className="bg-green-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">✓</span>
                      </div>
                      <h4 className="font-semibold text-green-800">Vorteile</h4>
                    </div>
                    <ul className="space-y-2">
                      {Array.isArray(strategy.pros) && strategy.pros.map((pro, index) => (
                        <li key={index} className="flex items-start gap-2 text-green-700">
                          <span className="text-green-500 mt-1">•</span>
                          <span className="text-sm">{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Cons */}
                  <div className="bg-red-50 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm">×</span>
                      </div>
                      <h4 className="font-semibold text-red-800">Nachteile</h4>
                    </div>
                    <ul className="space-y-2">
                      {Array.isArray(strategy.cons) && strategy.cons.map((con, index) => (
                        <li key={index} className="flex items-start gap-2 text-red-700">
                          <span className="text-red-500 mt-1">•</span>
                          <span className="text-sm">{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mt-6">
                  <Button
                    className="flex-1 text-white"
                    style={{ background: 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' }}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Beispiel-Antwort generieren
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Details anzeigen
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredStrategies.length === 0 && (
          <Card className="shadow-apple">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#4B0F2E' }}>
                Keine Strategien gefunden
              </h3>
              <p className="text-gray-600">
                Versuchen Sie einen anderen Suchbegriff oder wählen Sie eine andere Kategorie.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}