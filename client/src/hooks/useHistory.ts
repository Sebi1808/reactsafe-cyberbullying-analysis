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
    retry: false,
  });
}

export function useHistoryStats() {
  return useQuery({
    queryKey: ["/api/history/stats"],
    retry: false,
  });
}