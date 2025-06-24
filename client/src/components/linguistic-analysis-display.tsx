import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Progress } from "@/components/ui/progress";
import { Brain, MessageSquare, Layers, Users, Heart } from "lucide-react";

interface LinguisticAnalysisDisplayProps {
  analysis: any; // Should be typed with the proper AnalysisResult type
}

export default function LinguisticAnalysisDisplay({ analysis }: LinguisticAnalysisDisplayProps) {
  const linguisticAnalysis = analysis.linguisticAnalysis;

  if (!linguisticAnalysis) {
    return null;
  }

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Brain className="w-5 h-5" style={{ color: '#367E6B' }} />
          <span>Tiefe Linguistische Analyse</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full">
          {/* Pragmatische Ebene */}
          <AccordionItem value="pragmatic">
            <AccordionTrigger className="flex items-center space-x-2">
              <MessageSquare className="w-4 h-4" />
              <span>Pragmatische Ebene</span>
              <Badge className={getRiskColor(linguisticAnalysis.pragmatic.faceThreat)}>
                Face-Threat: {linguisticAnalysis.pragmatic.faceThreat}
              </Badge>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Sprechakte:</h4>
                <div className="flex flex-wrap gap-1">
                  {linguisticAnalysis.pragmatic.speechActs.map((act: string, index: number) => (
                    <Badge key={index} variant="outline">{act}</Badge>
                  ))}
                </div>
              </div>
              
              {linguisticAnalysis.pragmatic.implicatures.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Implizite Botschaften:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {linguisticAnalysis.pragmatic.implicatures.map((imp: string, index: number) => (
                      <li key={index}>{imp}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {linguisticAnalysis.pragmatic.presuppositions.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Voraussetzungen:</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    {linguisticAnalysis.pragmatic.presuppositions.map((pres: string, index: number) => (
                      <li key={index}>{pres}</li>
                    ))}
                  </ul>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Semantische Ebene */}
          <AccordionItem value="semantic">
            <AccordionTrigger className="flex items-center space-x-2">
              <Layers className="w-4 h-4" />
              <span>Semantische Ebene</span>
              <Badge variant="outline">
                Emotionale Ladung: {linguisticAnalysis.semantic.emotionalLoad}%
              </Badge>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Emotionale Ladung:</h4>
                <Progress value={linguisticAnalysis.semantic.emotionalLoad} className="w-full" />
              </div>
              
              {linguisticAnalysis.semantic.keyWords.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Schlüsselwörter:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.semantic.keyWords.map((word: string, index: number) => (
                      <Badge key={index} variant="destructive">{word}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {linguisticAnalysis.semantic.metaphors.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Metaphorische Strukturen:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.semantic.metaphors.map((metaphor: string, index: number) => (
                      <Badge key={index} variant="secondary">{metaphor}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {linguisticAnalysis.semantic.connotations.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Konnotationen:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.semantic.connotations.map((conn: string, index: number) => (
                      <Badge key={index} variant="outline">{conn}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Syntaktische Ebene */}
          <AccordionItem value="syntactic">
            <AccordionTrigger className="flex items-center space-x-2">
              <span className="w-4 h-4 text-center font-mono text-xs">{ }</span>
              <span>Syntaktische Muster</span>
              <Badge variant="outline">
                Komplexität: {linguisticAnalysis.syntactic.complexity}
              </Badge>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Satztypen:</h4>
                <div className="flex flex-wrap gap-1">
                  {linguisticAnalysis.syntactic.sentenceTypes.map((type: string, index: number) => (
                    <Badge key={index} variant="outline">{type}</Badge>
                  ))}
                </div>
              </div>
              
              {linguisticAnalysis.syntactic.modalVerbs.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Modalverben:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.syntactic.modalVerbs.map((modal: string, index: number) => (
                      <Badge key={index} variant="secondary">{modal}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {linguisticAnalysis.syntactic.intensifiers.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Verstärkungen:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.syntactic.intensifiers.map((intensifier: string, index: number) => (
                      <Badge key={index} variant="destructive">{intensifier}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Diskursstrategien */}
          <AccordionItem value="discourse">
            <AccordionTrigger className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Diskursstrategien</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Machtdynamiken:</h4>
                <p className="text-sm bg-gray-50 p-2 rounded">{linguisticAnalysis.discourse.powerDynamics}</p>
              </div>
              
              {linguisticAnalysis.discourse.strategies.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Strategien:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.discourse.strategies.map((strategy: string, index: number) => (
                      <Badge key={index} variant="destructive">{strategy}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {linguisticAnalysis.discourse.exclusionMechanisms.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Ausschlussmechanismen:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.discourse.exclusionMechanisms.map((mechanism: string, index: number) => (
                      <Badge key={index} variant="destructive">{mechanism}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Psycholinguistische Wirkung */}
          <AccordionItem value="psycholinguistic">
            <AccordionTrigger className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>Psycholinguistische Wirkung</span>
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Emotionale Auswirkung:</h4>
                <p className="text-sm bg-red-50 p-2 rounded text-red-800">{linguisticAnalysis.psycholinguistic.emotionalImpact}</p>
              </div>
              
              {linguisticAnalysis.psycholinguistic.manipulationTactics.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Manipulationstaktiken:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.psycholinguistic.manipulationTactics.map((tactic: string, index: number) => (
                      <Badge key={index} variant="destructive">{tactic}</Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {linguisticAnalysis.psycholinguistic.identityThreats.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2">Identitätsbedrohungen:</h4>
                  <div className="flex flex-wrap gap-1">
                    {linguisticAnalysis.psycholinguistic.identityThreats.map((threat: string, index: number) => (
                      <Badge key={index} variant="destructive">{threat}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}