import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { AnalysisParameters, ContextInfo, AnalysisResult, Strategy, Comment, Response } from "@shared/schema";

interface AnalyzeCommentRequest {
  comment: string;
  mode: 'manual' | 'autopilot';
  parameters?: AnalysisParameters;
  context?: ContextInfo;
}

interface AnalyzeCommentResponse {
  comment: Comment;
  analysis: AnalysisResult;
  recommendedStrategies: Strategy[];
}

interface GenerateResponseRequest {
  commentId: number;
  strategyId: number;
  context?: ContextInfo;
}

interface GenerateResponseResponse {
  response: Response;
  strategy: Strategy;
}

export function useAnalyzeComment() {
  return useMutation({
    mutationFn: async (data: AnalyzeCommentRequest): Promise<AnalyzeCommentResponse> => {
      const res = await apiRequest('POST', '/api/analyze', data);
      return res.json();
    },
  });
}

export function useGenerateResponse() {
  return useMutation({
    mutationFn: async (data: GenerateResponseRequest): Promise<GenerateResponseResponse> => {
      const res = await apiRequest('POST', '/api/generate-response', data);
      return res.json();
    },
  });
}

export function useStrategies() {
  return useQuery({
    queryKey: ['/api/strategies'],
    queryFn: async (): Promise<Strategy[]> => {
      const res = await fetch('/api/strategies');
      return res.json();
    },
  });
}
