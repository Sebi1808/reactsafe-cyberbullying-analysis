import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Brain, Users, Zap, CheckCircle, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const handleLogin = () => {
    window.location.href = '/';
  };

  const features = [
    {
      icon: Brain,
      title: "KI-gestützte Analyse",
      description: "Wissenschaftliche Sprachanalyse auf 6 linguistischen Ebenen mit GPT-4o",
      color: "#9C2C63"
    },
    {
      icon: Shield,
      title: "8 Strategien",
      description: "Evidenzbasierte Kommunikationsstrategien für jede Situation",
      color: "#367E6B"
    },
    {
      icon: Zap,
      title: "Quick Scan",
      description: "Sofortige Risikoeinschätzung für schnelle Entscheidungen",
      color: "#78C2AD"
    },
    {
      icon: Users,
      title: "Persönlicher Verlauf",
      description: "Tracking Ihrer Analysen und Fortschritte über Zeit",
      color: "#4B0F2E"
    }
  ];

  const analysisLevels = [
    "Pragmatische Ebene (Austin/Searle/Grice)",
    "Semantische Tiefenanalyse",
    "Syntaktische Machtstrukturen", 
    "Diskurslinguistische Strategien",
    "Psycholinguistische Wirkung",
    "Soziolinguistische Dimensionen"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="px-6 py-20 text-center">
          <div className="flex items-center justify-center mb-8">
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9C2C63] via-[#C0E8D5] to-[#367E6B] p-1">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#9C2C63] to-[#367E6B] relative">
                    <div className="absolute top-0 right-0 w-4 h-4 bg-[#78C2AD] rounded-lg transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6">
            <span className="text-[#4B0F2E]">React</span>
            <span className="text-[#367E6B]">Safe</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Wissenschaftliche KI-Analyse von Cybermobbing mit evidenzbasierten Antwortstrategien. 
            Schützen Sie sich und andere mit professioneller linguistischer Bewertung.
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-12">
            <Badge variant="outline" className="text-[#9C2C63] border-[#9C2C63]">
              GPT-4o Powered
            </Badge>
            <Badge variant="outline" className="text-[#367E6B] border-[#367E6B]">
              6 Analyse-Ebenen
            </Badge>
            <Badge variant="outline" className="text-[#78C2AD] border-[#78C2AD]">
              8 Strategien
            </Badge>
          </div>
          
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-gradient-to-r from-[#9C2C63] to-[#367E6B] hover:from-[#4B0F2E] hover:to-[#78C2AD] text-white px-8 py-6 text-lg"
          >
            Jetzt starten
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Features Section */}
        <div className="px-6 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#4B0F2E]">
            Funktionen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center mb-4"
                         style={{ backgroundColor: `${feature.color}20` }}>
                      <Icon className="w-6 h-6" style={{ color: feature.color }} />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Linguistic Analysis Section */}
        <div className="px-6 py-16 bg-gradient-to-r from-[#9C2C63]/10 to-[#367E6B]/10 mx-6 rounded-3xl mb-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-[#4B0F2E]">
              Wissenschaftliche Tiefenanalyse
            </h2>
            
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              ReactSafe analysiert Cybermobbing auf universitärem Niveau mit etablierten 
              sprachwissenschaftlichen Theorien und Methoden.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysisLevels.map((level, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-[#367E6B] flex-shrink-0" />
                  <span className="text-gray-700">{level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="px-6 py-20 text-center">
          <h2 className="text-3xl font-bold mb-6 text-[#4B0F2E]">
            Bereit für professionellen Schutz?
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Starten Sie jetzt mit ReactSafe und erhalten Sie wissenschaftlich fundierte 
            Analysen und Strategien für den Umgang mit Cybermobbing.
          </p>
          
          <Button 
            onClick={handleLogin}
            size="lg"
            className="bg-gradient-to-r from-[#9C2C63] to-[#367E6B] hover:from-[#4B0F2E] hover:to-[#78C2AD] text-white px-8 py-6 text-lg"
          >
            Jetzt kostenlos starten
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}