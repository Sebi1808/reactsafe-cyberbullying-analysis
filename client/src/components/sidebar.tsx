import { useState } from "react";
import { Home, History, Settings, HelpCircle, Brain, Zap, BarChart3 } from "lucide-react";
import { Link, useLocation } from "wouter";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Brain, label: "Analyse", path: "/analyze" },
    { icon: History, label: "Verlauf", path: "/history" },
    { icon: BarChart3, label: "Strategien", path: "/strategies" },
    { icon: Settings, label: "Einstellungen", path: "/settings" },
    { icon: HelpCircle, label: "Hilfe", path: "/help" },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-white shadow-apple-lg z-50 transform transition-transform duration-300 ease-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:relative md:shadow-none
      `}>
        {/* Header with ReactSafe Logo */}
        <div className="flex items-center space-x-3 p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#9C2C63] via-[#C0E8D5] to-[#367E6B] p-0.5">
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  <div className="w-4 h-4 rounded-sm bg-gradient-to-br from-[#9C2C63] to-[#367E6B] relative">
                    <div className="absolute top-0 right-0 w-2 h-2 bg-[#78C2AD] rounded-sm transform rotate-45"></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-lg font-semibold text-[#367E6B]">ReactSafe</h1>
              <p className="text-xs text-gray-500">AI-Powered Protection</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location === item.path;
              return (
                <Link key={item.path} href={item.path}>
                  <div
                    className={`
                      flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 cursor-pointer
                      ${isActive 
                        ? 'text-white shadow-lg' 
                        : 'text-gray-700 hover:bg-gray-50'
                      }
                    `}
                    style={{
                      background: isActive ? 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' : 'transparent'
                    }}
                    onClick={onClose}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-100">
          <div className="bg-gradient-to-r from-purple-50 to-green-50 p-4 rounded-xl">
            <div className="flex items-center space-x-3">
              <Zap className="w-5 h-5" style={{ color: '#9C2C63' }} />
              <div>
                <h3 className="font-medium text-sm" style={{ color: '#4B0F2E' }}>Quick Scan</h3>
                <p className="text-xs text-gray-600">Sofortige Analyse</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}