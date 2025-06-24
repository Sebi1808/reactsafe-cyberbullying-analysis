import { useState } from "react";
import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import Sidebar from "@/components/sidebar";
import Dashboard from "@/pages/dashboard";
import AnalyzePage from "@/pages/analyze";
import HistoryPage from "@/pages/history";
import StrategiesPage from "@/pages/strategies";
import SettingsPage from "@/pages/settings";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/analyze" component={AnalyzePage} />
      <Route path="/history" component={HistoryPage} />
      <Route path="/strategies" component={StrategiesPage} />
      <Route path="/settings" component={SettingsPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="flex min-h-screen bg-gray-50">
          {/* Desktop Sidebar */}
          <div className="hidden md:block">
            <Sidebar isOpen={true} onClose={() => {}} />
          </div>
          
          {/* Mobile Sidebar with Backdrop */}
          {sidebarOpen && (
            <>
              <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
                onClick={() => setSidebarOpen(false)}
              />
              <div className="md:hidden">
                <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
              </div>
            </>
          )}
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile Header */}
            <div className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-3">
                <img 
                  src="/attached_assets/ChatGPT Image 24. Juni 2025, 15_59_21_1750775108523.png" 
                  alt="ReactSafe Logo" 
                  className="w-8 h-8 object-contain"
                />
                <span className="font-semibold" style={{ color: '#367E6B' }}>ReactSafe</span>
              </div>
            </div>
            
            {/* Page Content */}
            <div className="flex-1">
              <Router />
            </div>
          </div>
        </div>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
