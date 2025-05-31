
import React, { useState } from 'react';
import { Menu, X, Car, MapPin, BarChart3, User, Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onPageChange,
  isAuthenticated,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { id: 'home', label: 'Accueil', icon: Car },
    { id: 'map', label: 'Carte Parking', icon: MapPin },
    { id: 'stats', label: 'Statistiques', icon: BarChart3 },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const handlePageChange = (pageId: string) => {
    onPageChange(pageId);
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="bg-gradient-to-r from-primary to-accent text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 mr-2" />
              <span className="font-bold text-lg">ENSAJ Smart Park</span>
            </div>
            
            {isAuthenticated && (
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-white hover:bg-white/20 md:hidden"
                >
                  {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
                
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Button
                        key={item.id}
                        variant={currentPage === item.id ? "secondary" : "ghost"}
                        className={cn(
                          "text-white hover:bg-white/20",
                          currentPage === item.id && "bg-white/30"
                        )}
                        onClick={() => handlePageChange(item.id)}
                      >
                        <Icon className="h-4 w-4 mr-2" />
                        {item.label}
                      </Button>
                    );
                  })}
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={onLogout}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && isAuthenticated && (
          <div className="md:hidden bg-primary/95 backdrop-blur-sm">
            <div className="px-4 pt-2 pb-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start text-white hover:bg-white/20",
                      currentPage === item.id && "bg-white/30"
                    )}
                    onClick={() => handlePageChange(item.id)}
                  >
                    <Icon className="h-4 w-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-white/20"
                onClick={onLogout}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Navigation for Mobile */}
      {isAuthenticated && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 md:hidden z-40">
          <div className="grid grid-cols-4 h-16">
            {menuItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center text-xs transition-colors",
                    currentPage === item.id
                      ? "text-primary bg-primary/10"
                      : "text-gray-600 hover:text-primary"
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span>{item.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
