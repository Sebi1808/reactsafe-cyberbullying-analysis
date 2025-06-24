import { useQuery } from "@tanstack/react-query";

interface HistoryItem {
  id: number;
  content: string;
  riskLevel: 'low' | 'medium' | 'high';
  riskScore: number;
  platform: string;
  date: Date;
  strategiesUsed: number;
}

export function useHistory() {
  return useQuery({
    queryKey: ["/api/history"],
    queryFn: async (): Promise<HistoryItem[]> => {
      // This would be the real implementation when user auth is ready
      // For now, return empty array as no user is logged in
      return [];
    },
    retry: false,
  });
}

export function useHistoryStats() {
  return useQuery({
    queryKey: ["/api/history/stats"],
    queryFn: async () => {
      // This would fetch real user stats when auth is implemented
      return {
        totalAnalyses: 0,
        averageRiskScore: 0,
        highRiskCount: 0,
        strategiesUsed: 0
      };
    },
    retry: false,
  });
}