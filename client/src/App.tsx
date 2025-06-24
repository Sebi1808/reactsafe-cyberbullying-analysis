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
          {/* Sidebar */}
          <div className="hidden md:block">
            <Sidebar isOpen={true} onClose={() => {}} />
          </div>
          
          {/* Mobile Sidebar */}
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          
          {/* Main Content */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Mobile Header */}
            <div className="md:hidden bg-white shadow-sm p-4 flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)}>
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full" style={{ background: 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' }}>
                  <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 rounded-sm" style={{ background: 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' }}></div>
                  </div>
                </div>
                <span className="font-semibold" style={{ color: '#4B0F2E' }}>ReactSafe</span>
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
