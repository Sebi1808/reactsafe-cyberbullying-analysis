import { useState, useEffect } from "react";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate auth check - on Vercel we skip auth for now
    const timer = setTimeout(() => setIsLoading(false), 100);
    return () => clearTimeout(timer);
  }, []);

  // For Vercel deployment, we allow access without auth
  // In production, you would integrate a proper auth provider
  return {
    user: { id: 'guest', name: 'Guest User' },
    isLoading,
    isAuthenticated: true,
  };
}