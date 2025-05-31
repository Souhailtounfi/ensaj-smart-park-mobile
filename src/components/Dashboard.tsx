
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Car, Clock, MapPin, Users, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const parkingStats = {
    totalSpaces: 200,
    occupiedSpaces: 142,
    availableSpaces: 58,
    reservedSpaces: 15,
  };

  const occupancyRate = (parkingStats.occupiedSpaces / parkingStats.totalSpaces) * 100;

  const recentActivity = [
    { id: 1, action: "Entrée", zone: "Zone A", time: "il y a 5 min", user: "Étudiant" },
    { id: 2, action: "Sortie", zone: "Zone B", time: "il y a 8 min", user: "Enseignant" },
    { id: 3, action: "Réservation", zone: "Zone C", time: "il y a 12 min", user: "Visiteur" },
    { id: 4, action: "Entrée", zone: "Zone A", time: "il y a 15 min", user: "Personnel" },
  ];

  const zones = [
    { name: "Zone A - Principal", total: 80, occupied: 65, status: "busy" },
    { name: "Zone B - Enseignants", total: 60, occupied: 42, status: "moderate" },
    { name: "Zone C - Visiteurs", total: 40, occupied: 20, status: "available" },
    { name: "Zone D - Personnel", total: 20, occupied: 15, status: "busy" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'busy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Disponible';
      case 'moderate': return 'Modéré';
      case 'busy': return 'Saturé';
      default: return 'Inconnu';
    }
  };

  return (
    <div className="p-4 pb-20 md:pb-4 space-y-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="text-center py-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          Bienvenue sur ENSAJ Smart Park
        </h1>
        <p className="text-gray-600">Tableau de bord du stationnement intelligent</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Car className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-green-600">{parkingStats.availableSpaces}</p>
                <p className="text-xs text-gray-600">Places libres</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold text-red-600">{parkingStats.occupiedSpaces}</p>
                <p className="text-xs text-gray-600">Occupées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold text-blue-600">{parkingStats.reservedSpaces}</p>
                <p className="text-xs text-gray-600">Réservées</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-accent" />
              <div>
                <p className="text-2xl font-bold text-purple-600">{parkingStats.totalSpaces}</p>
                <p className="text-xs text-gray-600">Total</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Occupancy Rate */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Taux d'occupation global</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Occupation actuelle</span>
              <span className="font-semibold">{occupancyRate.toFixed(1)}%</span>
            </div>
            <Progress 
              value={occupancyRate} 
              className="h-2"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zones Status */}
      <Card>
        <CardHeader>
          <CardTitle>État des zones de stationnement</CardTitle>
          <CardDescription>Vue d'ensemble en temps réel</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {zones.map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${getStatusColor(zone.status)}`}></div>
                  <div>
                    <p className="font-medium">{zone.name}</p>
                    <p className="text-sm text-gray-500">{zone.occupied}/{zone.total} places occupées</p>
                  </div>
                </div>
                <Badge variant={zone.status === 'available' ? 'default' : 'secondary'}>
                  {getStatusText(zone.status)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Activité récente</CardTitle>
          <CardDescription>Derniers mouvements de véhicules</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  {activity.action === 'Entrée' ? (
                    <Car className="h-4 w-4 text-green-600" />
                  ) : activity.action === 'Sortie' ? (
                    <Car className="h-4 w-4 text-red-600" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                  )}
                  <div>
                    <p className="font-medium">{activity.action} - {activity.zone}</p>
                    <p className="text-sm text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
