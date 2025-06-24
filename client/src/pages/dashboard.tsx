import { useState } from "react";
import { Shield, Settings, HelpCircle } from "lucide-react";
import ModeSelector from "@/components/mode-selector";
import CommentInput from "@/components/comment-input";
import ManualParameters from "@/components/manual-parameters";
import AnalysisResults from "@/components/analysis-results";
import StrategySelector from "@/components/strategy-selector";
import ResponseGenerator from "@/components/response-generator";
import ContextModal from "@/components/context-modal";
import LoadingIndicator from "@/components/loading-indicator";
import type { AnalysisParameters, ContextInfo, AnalysisResult, Strategy, Comment } from "@shared/schema";

export default function Dashboard() {
  const [mode, setMode] = useState<'manual' | 'autopilot'>('manual');
  const [comment, setComment] = useState('');
  const [parameters, setParameters] = useState<AnalysisParameters>({
    severityLevels: ['light', 'medium', 'severe'],
    categories: ['insult', 'threat', 'discrimination', 'harassment'],
    context: [],
  });
  const [contextInfo, setContextInfo] = useState<ContextInfo | null>(null);
  const [showContextModal, setShowContextModal] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [analyzedComment, setAnalyzedComment] = useState<Comment | null>(null);
  const [recommendedStrategies, setRecommendedStrategies] = useState<Strategy[]>([]);
  const [selectedStrategy, setSelectedStrategy] = useState<Strategy | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleModeChange = (newMode: 'manual' | 'autopilot') => {
    setMode(newMode);
    if (newMode === 'autopilot') {
      setShowContextModal(true);
    }
    // Reset analysis state when mode changes
    setAnalysisResult(null);
    setAnalyzedComment(null);
    setRecommendedStrategies([]);
    setSelectedStrategy(null);
  };

  const handleAnalysisComplete = (result: AnalysisResult, comment: Comment, strategies: Strategy[]) => {
    setAnalysisResult(result);
    setAnalyzedComment(comment);
    setRecommendedStrategies(strategies);
    setIsLoading(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <Shield className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">CyberGuard</h1>
                <p className="text-xs text-gray-500">AI-Powered Protection</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Settings className="text-gray-600 w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <HelpCircle className="text-gray-600 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-6">
          {/* Mode Selector */}
          <ModeSelector 
            mode={mode} 
            onModeChange={handleModeChange} 
          />

          {/* Comment Input */}
          <CommentInput
            comment={comment}
            onCommentChange={setComment}
            mode={mode}
            parameters={parameters}
            contextInfo={contextInfo}
            onAnalysisStart={() => setIsLoading(true)}
            onAnalysisComplete={handleAnalysisComplete}
          />

          {/* Manual Parameters */}
          {mode === 'manual' && (
            <ManualParameters
              parameters={parameters}
              onParametersChange={setParameters}
            />
          )}

          {/* Analysis Results */}
          {analysisResult && (
            <AnalysisResults analysis={analysisResult} />
          )}

          {/* Strategy Selector */}
          {recommendedStrategies.length > 0 && (
            <StrategySelector
              strategies={recommendedStrategies}
              selectedStrategy={selectedStrategy}
              onStrategySelect={setSelectedStrategy}
            />
          )}

          {/* Response Generator */}
          {selectedStrategy && analyzedComment && (
            <ResponseGenerator
              comment={analyzedComment}
              strategy={selectedStrategy}
              contextInfo={contextInfo}
            />
          )}
        </div>
      </main>

      {/* Context Modal */}
      {showContextModal && (
        <ContextModal
          isOpen={showContextModal}
          onClose={() => setShowContextModal(false)}
          onSave={(context) => {
            setContextInfo(context);
            setShowContextModal(false);
          }}
        />
      )}

      {/* Loading Indicator */}
      {isLoading && <LoadingIndicator />}
    </div>
  );
}
