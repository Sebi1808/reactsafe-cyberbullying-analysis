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
                <div className="relative w-8 h-8">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9C2C63] via-[#C0E8D5] to-[#367E6B] p-0.5">
                    <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                      <div className="w-3 h-3 rounded-sm bg-gradient-to-br from-[#9C2C63] to-[#367E6B] relative">
                        <div className="absolute top-0 right-0 w-1.5 h-1.5 bg-[#78C2AD] rounded-sm transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="font-semibold text-[#367E6B]">ReactSafe</span>
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
