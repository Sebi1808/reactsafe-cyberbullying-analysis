import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Clock, TrendingUp, AlertTriangle, Filter } from "lucide-react";

interface HistoryItem {
  id: number;
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  platform: string;
  date: Date;
  strategiesUsed: number;
}

// Mock data for demonstration
const mockHistory: HistoryItem[] = [
  {
    id: 1,
    content: "Du bist so dumm, wie kannst du nur so einen Müll posten?",
    riskLevel: 'high',
    riskScore: 8.2,
    platform: 'Instagram',
    date: new Date('2024-06-24T10:30:00'),
    strategiesUsed: 3
  },
  {
    id: 2,
    content: "Schaut mal Vivi an, die denkt sie ist was Besonderes",
    riskLevel: 'medium',
    riskScore: 6.1,
    platform: 'TikTok',
    date: new Date('2024-06-23T15:45:00'),
    strategiesUsed: 2
  },
  {
    id: 3,
    content: "Warum postest du solchen Quatsch?",
    riskLevel: 'low',
    riskScore: 3.5,
    platform: 'Twitter',
    date: new Date('2024-06-22T09:15:00'),
    strategiesUsed: 1
  },
  {
    id: 4,
    content: "Du solltest dich schämen für das was du getan hast",
    riskLevel: 'medium',
    riskScore: 5.8,
    platform: 'Facebook',
    date: new Date('2024-06-21T14:20:00'),
    strategiesUsed: 4
  }
];

export default function HistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState<'all' | 'low' | 'medium' | 'high'>('all');

  const filteredHistory = mockHistory.filter(item => {
    const matchesSearch = item.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.platform.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterRisk === 'all' || item.riskLevel === filterRisk;
    return matchesSearch && matchesFilter;
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
      case 'high': return 'Hoch';
      case 'medium': return 'Mittel';
      case 'low': return 'Niedrig';
      default: return 'Unbekannt';
    }
  };

  const getPlatformEmoji = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram': return '📷';
      case 'tiktok': return '🎵';
      case 'twitter': return '🐦';
      case 'facebook': return '👥';
      default: return '💬';
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#4B0F2E' }}>
            Analyse-Verlauf
          </h1>
          <p className="text-gray-600">
            Übersicht aller analysierten Kommentare und deren Bewertungen
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-apple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Gesamtanalysen</p>
                  <p className="text-2xl font-bold" style={{ color: '#4B0F2E' }}>
                    {mockHistory.length}
                  </p>
                </div>
                <TrendingUp className="w-8 h-8" style={{ color: '#78C2AD' }} />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-apple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Hohes Risiko</p>
                  <p className="text-2xl font-bold text-red-600">
                    {mockHistory.filter(item => item.riskLevel === 'high').length}
                  </p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-apple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ø Risiko-Score</p>
                  <p className="text-2xl font-bold" style={{ color: '#9C2C63' }}>
                    {(mockHistory.reduce((sum, item) => sum + item.riskScore, 0) / mockHistory.length).toFixed(1)}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C0E8D5' }}>
                  <span className="text-lg">📊</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-apple">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Strategien generiert</p>
                  <p className="text-2xl font-bold" style={{ color: '#367E6B' }}>
                    {mockHistory.reduce((sum, item) => sum + item.strategiesUsed, 0)}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: '#C0E8D5' }}>
                  <span className="text-lg">🛡️</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-apple mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Suche nach Inhalten oder Plattformen..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filterRisk === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterRisk('all')}
                  className={filterRisk === 'all' ? 'text-white' : ''}
                  style={{
                    background: filterRisk === 'all' ? 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' : 'transparent'
                  }}
                >
                  Alle
                </Button>
                <Button
                  variant={filterRisk === 'high' ? 'default' : 'outline'}
                  onClick={() => setFilterRisk('high')}
                  className={filterRisk === 'high' ? 'bg-red-500 text-white' : ''}
                >
                  Hoch
                </Button>
                <Button
                  variant={filterRisk === 'medium' ? 'default' : 'outline'}
                  onClick={() => setFilterRisk('medium')}
                  className={filterRisk === 'medium' ? 'bg-yellow-500 text-white' : ''}
                >
                  Mittel
                </Button>
                <Button
                  variant={filterRisk === 'low' ? 'default' : 'outline'}
                  onClick={() => setFilterRisk('low')}
                  className={filterRisk === 'low' ? 'bg-green-500 text-white' : ''}
                >
                  Niedrig
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <Card key={item.id} className="shadow-apple hover:shadow-apple-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{getPlatformEmoji(item.platform)}</span>
                      <span className="font-medium text-gray-700">{item.platform}</span>
                      <Badge 
                        variant="outline"
                        className="text-xs"
                        style={{ 
                          borderColor: getRiskColor(item.riskLevel),
                          color: getRiskColor(item.riskLevel)
                        }}
                      >
                        {getRiskLabel(item.riskLevel)}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-3 h-3" />
                        {formatDate(item.date)}
                      </div>
                    </div>
                    
                    <p className="text-gray-800 mb-3 line-clamp-2">
                      "{item.content}"
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <span>Risiko-Score:</span>
                        <span 
                          className="font-semibold"
                          style={{ color: getRiskColor(item.riskLevel) }}
                        >
                          {item.riskScore}/10
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Strategien:</span>
                        <span className="font-semibold">{item.strategiesUsed}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center ml-4">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg"
                      style={{ backgroundColor: getRiskColor(item.riskLevel) }}
                    >
                      {item.riskScore.toFixed(1)}
                    </div>
                    <Button variant="ghost" size="sm" className="mt-2 text-xs">
                      Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <Card className="shadow-apple">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#4B0F2E' }}>
                Keine Ergebnisse gefunden
              </h3>
              <p className="text-gray-600">
                Versuchen Sie einen anderen Suchbegriff oder Filter.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}