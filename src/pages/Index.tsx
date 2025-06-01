
import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import Dashboard from '@/components/Dashboard';
import ParkingMap from '@/components/ParkingMap';
import Statistics from '@/components/Statistics';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState<any>(null);
  const { toast } = useToast();

  const handleLogin = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser = {
      id: 1,
      email,
      firstName: 'Souhail',
      lastName: 'Tounfi',
      userType: 'student',
      department: 'TRI'
    };
    
    setUser(mockUser);
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleRegister = async (userData: any) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock successful registration
    setUser({
      id: Date.now(),
      ...userData
    });
    setIsAuthenticated(true);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setCurrentPage('home');
    toast({
      title: "Déconnexion réussie",
      description: "À bientôt sur ENSAJ Smart Park!",
    });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <Dashboard />;
      case 'map':
        return <ParkingMap />;
      case 'stats':
        return <Statistics />;
      case 'profile':
        return (
          <div className="p-4 pb-20 md:pb-4 max-w-4xl mx-auto">
            <div className="text-center py-8">
              <h1 className="text-2xl font-bold mb-4">Profil utilisateur</h1>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <div>
                    <label className="font-semibold">Nom complet:</label>
                    <p>{user?.firstName} {user?.lastName}</p>
                  </div>
                  <div>
                    <label className="font-semibold">Email:</label>
                    <p>{user?.email}</p>
                  </div>
                  <div>
                    <label className="font-semibold">Type d'utilisateur:</label>
                    <p>{user?.userType}</p>
                  </div>
                  {user?.department && (
                    <div>
                      <label className="font-semibold">Département:</label>
                      <p>{user.department}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-4 pb-20 md:pb-4 max-w-4xl mx-auto">
            <div className="text-center py-8">
              <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
              <div className="bg-white rounded-lg shadow p-6">
                <p className="text-gray-600">Fonctionnalités de paramètres à venir...</p>
              </div>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  if (!isAuthenticated) {
    if (authMode === 'login') {
      return (
        <LoginForm
          onLogin={handleLogin}
          onSwitchToRegister={() => setAuthMode('register')}
        />
      );
    } else {
      return (
        <RegisterForm
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthMode('login')}
        />
      );
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
      
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>
    </div>
  );
};

export default Index;
