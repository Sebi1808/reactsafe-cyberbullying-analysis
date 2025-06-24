import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, AlertTriangle, Shield, Zap, History, BookOpen } from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const stats = [
    {
      title: "Analysen heute",
      value: "12",
      change: "+3",
      icon: Brain,
      color: "#9C2C63"
    },
    {
      title: "Risiko-Score Ø",
      value: "4.2",
      change: "-0.8",
      icon: TrendingUp,
      color: "#78C2AD"
    },
    {
      title: "Hohe Risiken",
      value: "2",
      change: "0",
      icon: AlertTriangle,
      color: "#ef4444"
    },
    {
      title: "Strategien verwendet",
      value: "18",
      change: "+5",
      icon: Shield,
      color: "#367E6B"
    }
  ];

  const quickActions = [
    {
      title: "Neue Analyse",
      description: "Kommentar sofort analysieren",
      icon: Brain,
      path: "/analyze",
      gradient: "linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)"
    },
    {
      title: "Verlauf ansehen",
      description: "Frühere Analysen durchsuchen",
      icon: History,
      path: "/history",
      gradient: "linear-gradient(135deg, #367E6B 0%, #78C2AD 100%)"
    },
    {
      title: "Strategien",
      description: "Alle verfügbaren Strategien",
      icon: BookOpen,
      path: "/strategies",
      gradient: "linear-gradient(135deg, #4B0F2E 0%, #9C2C63 100%)"
    }
  ];

  const recentAnalyses = [
    {
      id: 1,
      content: "Du bist so dumm, wie kannst du nur so einen Müll posten?",
      riskLevel: "high",
      riskScore: 8.2,
      platform: "Instagram",
      time: "vor 2 Stunden"
    },
    {
      id: 2,
      content: "Schaut mal Vivi an, die denkt sie ist was Besonderes",
      riskLevel: "medium",
      riskScore: 6.1,
      platform: "TikTok",
      time: "vor 4 Stunden"
    },
    {
      id: 3,
      content: "Warum postest du solchen Quatsch?",
      riskLevel: "low",
      riskScore: 3.5,
      platform: "Twitter",
      time: "gestern"
    }
  ];

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return '#ef4444';
      case 'medium': return '#f59e0b';
      case 'low': return '#10b981';
      default: return '#6b7280';
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

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#4B0F2E' }}>
            Willkommen bei ReactSafe
          </h1>
          <p className="text-gray-600">
            Ihre intelligente Lösung für den Umgang mit Cybermobbing
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-apple">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold" style={{ color: stat.color }}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-gray-500">{stat.change} seit gestern</p>
                  </div>
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}20` }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <Card className="shadow-apple mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5" style={{ color: '#9C2C63' }} />
              Schnellaktionen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.path}>
                  <Card className="cursor-pointer hover:shadow-apple-lg transition-all duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-6 text-center">
                      <div 
                        className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                        style={{ background: action.gradient }}
                      >
                        <action.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="font-semibold mb-2" style={{ color: '#4B0F2E' }}>
                        {action.title}
                      </h3>
                      <p className="text-sm text-gray-600">{action.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Analyses */}
        <Card className="shadow-apple">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5" style={{ color: '#367E6B' }} />
                Letzte Analysen
              </div>
              <Link href="/history">
                <Button variant="ghost" size="sm">
                  Alle anzeigen
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAnalyses.map((analysis) => (
                <div key={analysis.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl">{getPlatformEmoji(analysis.platform)}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-800 truncate">
                        "{analysis.content}"
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-gray-500">{analysis.platform}</span>
                        <span className="text-xs text-gray-400">•</span>
                        <span className="text-xs text-gray-500">{analysis.time}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: getRiskColor(analysis.riskLevel),
                        color: getRiskColor(analysis.riskLevel)
                      }}
                    >
                      {analysis.riskScore}/10
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
