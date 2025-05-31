
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Car, Clock, Zap } from 'lucide-react';

const ParkingMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const parkingZones = [
    {
      id: 'zone-a',
      name: 'Zone A - Principal',
      available: 15,
      total: 80,
      position: { x: 20, y: 30 },
      type: 'general',
      description: 'Zone principale pour étudiants et personnel'
    },
    {
      id: 'zone-b',
      name: 'Zone B - Enseignants',
      available: 18,
      total: 60,
      position: { x: 60, y: 20 },
      type: 'faculty',
      description: 'Zone réservée aux enseignants'
    },
    {
      id: 'zone-c',
      name: 'Zone C - Visiteurs',
      available: 20,
      total: 40,
      position: { x: 30, y: 70 },
      type: 'visitor',
      description: 'Zone dédiée aux visiteurs'
    },
    {
      id: 'zone-d',
      name: 'Zone D - Personnel',
      available: 5,
      total: 20,
      position: { x: 70, y: 60 },
      type: 'staff',
      description: 'Zone réservée au personnel administratif'
    },
    {
      id: 'zone-e',
      name: 'Zone E - Électrique',
      available: 8,
      total: 12,
      position: { x: 50, y: 50 },
      type: 'electric',
      description: 'Bornes de recharge électrique'
    }
  ];

  const getZoneColor = (available: number, total: number) => {
    const occupancyRate = (total - available) / total;
    if (occupancyRate < 0.5) return 'bg-green-500';
    if (occupancyRate < 0.8) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getZoneIcon = (type: string) => {
    switch (type) {
      case 'electric': return <Zap className="h-4 w-4" />;
      case 'faculty': return <MapPin className="h-4 w-4" />;
      case 'visitor': return <Navigation className="h-4 w-4" />;
      default: return <Car className="h-4 w-4" />;
    }
  };

  return (
    <div className="p-4 pb-20 md:pb-4 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          Carte du Parking ENSAJ
        </h1>
        <p className="text-gray-600">Localisez rapidement une place disponible</p>
      </div>

      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Légende</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span className="text-sm">Disponible</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
              <span className="text-sm">Modéré</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              <span className="text-sm">Saturé</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-sm">Électrique</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interactive Map */}
      <Card>
        <CardHeader>
          <CardTitle>Plan interactif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-50 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
            {/* ENSAJ Building */}
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium">
              🏫 ENSAJ - École Nationale des Sciences Appliquées
            </div>

            {/* Entrance */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm">
              🚪 Entrée Principale
            </div>

            {/* Parking Zones */}
            {parkingZones.map((zone) => (
              <div
                key={zone.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
                style={{ 
                  left: `${zone.position.x}%`, 
                  top: `${zone.position.y}%` 
                }}
                onClick={() => setSelectedZone(selectedZone === zone.id ? null : zone.id)}
              >
                <div className={`w-16 h-16 md:w-20 md:h-20 rounded-lg flex flex-col items-center justify-center text-white shadow-lg ${getZoneColor(zone.available, zone.total)}`}>
                  {getZoneIcon(zone.type)}
                  <span className="text-xs mt-1 font-medium">{zone.available}</span>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-xs font-medium text-center whitespace-nowrap">
                  {zone.name.split(' - ')[0]}
                </div>
              </div>
            ))}

            {/* Roads */}
            <div className="absolute top-1/2 left-0 right-0 h-8 bg-gray-300 opacity-50"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-8 bg-gray-300 opacity-50 transform -translate-x-1/2"></div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Details */}
      {selectedZone && (
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {getZoneIcon(parkingZones.find(z => z.id === selectedZone)?.type || 'general')}
              <span>{parkingZones.find(z => z.id === selectedZone)?.name}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-600">
                {parkingZones.find(z => z.id === selectedZone)?.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {parkingZones.find(z => z.id === selectedZone)?.available}
                  </p>
                  <p className="text-sm text-gray-500">Places disponibles</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-600">
                    {parkingZones.find(z => z.id === selectedZone)?.total}
                  </p>
                  <p className="text-sm text-gray-500">Total des places</p>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button className="flex-1 bg-gradient-to-r from-primary to-accent">
                  <Navigation className="h-4 w-4 mr-2" />
                  Y aller
                </Button>
                <Button variant="outline" className="flex-1">
                  <Clock className="h-4 w-4 mr-2" />
                  Réserver
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Car className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Place la plus proche</h3>
                <p className="text-sm text-gray-600">Zone C - 2 min de marche</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">Recharge électrique</h3>
                <p className="text-sm text-gray-600">8 bornes disponibles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParkingMap;
