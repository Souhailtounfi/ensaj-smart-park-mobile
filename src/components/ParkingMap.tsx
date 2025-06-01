'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Navigation, Car, Clock, Zap } from 'lucide-react';

type Zone = {
  id: string;
  name: string;
  available: number;
  total: number;
  position: { x: number; y: number };
  type: string;
  description: string;
};

const ParkingMap: React.FC = () => {
  const [selectedZone, setSelectedZone] = useState<string | null>(null);
  const [showParkingDetail, setShowParkingDetail] = useState<boolean>(false);

  const parkingZones: Zone[] = [
    { id: 'zone-a', name: 'Zone A - Principal', available: 15, total: 30, position: { x: 20, y: 30 }, type: 'general', description: 'Zone principale pour étudiants et personnel' },
    { id: 'zone-b', name: 'Zone B - Enseignants', available: 5, total: 20, position: { x: 83, y: 30 }, type: 'faculty', description: 'Zone réservée aux enseignants' },
    { id: 'zone-c', name: 'Zone C - Visiteurs', available: 12, total: 16, position: { x: 30, y: 70 }, type: 'visitor', description: 'Zone dédiée aux visiteurs' },
    { id: 'zone-d', name: 'Zone D - Personnel', available: 3, total: 10, position: { x: 70, y: 70 }, type: 'staff', description: 'Zone réservée au personnel administratif' },
    { id: 'zone-e', name: 'Zone E - Électrique', available: 4, total: 6, position: { x: 50, y: 50 }, type: 'electric', description: 'Bornes de recharge électrique' },
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

  const handleGoClick = () => {
    setShowParkingDetail(true);
  };

  const renderParkingSlots = (zone: Zone) => {
    const slots = Array.from({ length: zone.total }, (_, index) => {
      const isAvailable = index < zone.available;
      return (
        <div
          key={index}
          className={`w-6 h-10 m-1 rounded-sm ${isAvailable ? 'bg-green-500' : 'bg-red-500'}`}
        />
      );
    });

    return (
      <div className="relative border border-gray-300 rounded-md p-4 bg-white">
        <div className="absolute left-2 top-2 bg-blue-600 text-white text-xs px-2 py-0.5 rounded">
          🚪 Entrée
        </div>
        <div className="flex flex-wrap mt-6">
          {slots}
        </div>
        <div className="absolute bottom-2 right-2 text-sm text-blue-700 font-medium">
          🅿️ Zone {zone.name.split(' ')[1]}
        </div>
        {/* Ligne de direction */}
        <div className="absolute left-1 top-6 w-1 h-[80%] bg-blue-400 rounded"></div>
      </div>
    );
  };

  return (
    <div className="p-4 space-y-6 max-w-7xl mx-auto">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Carte du Parking ENSAJ
        </h1>
        <p className="text-gray-600">Cliquez sur une zone pour voir les places disponibles</p>
      </div>

      {/* Carte ENSAJ */}
      <Card>
        <CardHeader>
          <CardTitle>Plan ENSAJ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative bg-gray-100 rounded-lg h-[400px]">
            <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
              🏫 ENSAJ
            </div>
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-3 py-1 rounded text-sm">
              🚪 Entrée Principale
            </div>

            {parkingZones.map((zone) => (
              <div
                key={zone.id}
                onClick={() => {
                  setSelectedZone(zone.id);
                  setShowParkingDetail(false);
                }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:scale-110 transition-all"
                style={{ left: `${zone.position.x}%`, top: `${zone.position.y}%` }}
              >
                <div className={`w-16 h-16 rounded-lg text-white flex flex-col items-center justify-center shadow-md ${getZoneColor(zone.available, zone.total)}`}>
                  {getZoneIcon(zone.type)}
                  <span className="text-xs font-semibold">{zone.available}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Détails Zone */}
      {selectedZone && !showParkingDetail && (
        <Card>
          <CardHeader>
            <CardTitle>{parkingZones.find(z => z.id === selectedZone)?.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>{parkingZones.find(z => z.id === selectedZone)?.description}</p>
            <div className="flex justify-between">
              <span>Places disponibles : {parkingZones.find(z => z.id === selectedZone)?.available}</span>
              <span>Total : {parkingZones.find(z => z.id === selectedZone)?.total}</span>
            </div>
            <Button onClick={handleGoClick}>
              <Navigation className="h-4 w-4 mr-2" />
              Y aller
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Nouvelle Carte Parking */}
      {showParkingDetail && selectedZone && (
        <Card>
          <CardHeader>
            <CardTitle>Plan de la zone - {parkingZones.find(z => z.id === selectedZone)?.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderParkingSlots(parkingZones.find(z => z.id === selectedZone)!)}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParkingMap;
