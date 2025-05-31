
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Clock, TrendingUp, Users, Calendar, MapPin } from 'lucide-react';

const Statistics: React.FC = () => {
  const weeklyData = [
    { day: 'Lun', occupancy: 85, peak: '09:00' },
    { day: 'Mar', occupancy: 78, peak: '10:30' },
    { day: 'Mer', occupancy: 92, peak: '08:45' },
    { day: 'Jeu', occupancy: 88, peak: '09:15' },
    { day: 'Ven', occupancy: 82, peak: '10:00' },
    { day: 'Sam', occupancy: 45, peak: '11:00' },
    { day: 'Dim', occupancy: 25, peak: '14:00' },
  ];

  const monthlyStats = {
    totalVehicles: 3420,
    averageStay: '2h 30min',
    peakHour: '09:00 - 10:00',
    mostUsedZone: 'Zone A - Principal',
    electricVehicles: 245,
    reservations: 186,
  };

  const hourlyDistribution = [
    { hour: '07:00', percentage: 25 },
    { hour: '08:00', percentage: 65 },
    { hour: '09:00', percentage: 95 },
    { hour: '10:00', percentage: 85 },
    { hour: '11:00', percentage: 78 },
    { hour: '12:00', percentage: 70 },
    { hour: '13:00', percentage: 82 },
    { hour: '14:00', percentage: 88 },
    { hour: '15:00', percentage: 75 },
    { hour: '16:00', percentage: 60 },
    { hour: '17:00', percentage: 45 },
    { hour: '18:00', percentage: 30 },
  ];

  const getBarHeight = (percentage: number) => {
    return `${(percentage / 100) * 120}px`;
  };

  const getBarColor = (percentage: number) => {
    if (percentage < 50) return 'bg-green-500';
    if (percentage < 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="p-4 pb-20 md:pb-4 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-2">
          Statistiques du Parking
        </h1>
        <p className="text-gray-600">Analyses et tendances d'utilisation</p>
      </div>

      {/* Monthly Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
            <p className="text-2xl font-bold">{monthlyStats.totalVehicles.toLocaleString()}</p>
            <p className="text-xs text-gray-600">Véhicules ce mois</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-accent" />
            <p className="text-lg font-bold">{monthlyStats.averageStay}</p>
            <p className="text-xs text-gray-600">Durée moyenne</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-600" />
            <p className="text-lg font-bold">{monthlyStats.peakHour}</p>
            <p className="text-xs text-gray-600">Heure de pointe</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <MapPin className="h-8 w-8 mx-auto mb-2 text-blue-600" />
            <p className="text-sm font-bold">Zone A</p>
            <p className="text-xs text-gray-600">Zone la plus utilisée</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <div className="h-8 w-8 mx-auto mb-2 text-green-600 flex items-center justify-center">⚡</div>
            <p className="text-2xl font-bold">{monthlyStats.electricVehicles}</p>
            <p className="text-xs text-gray-600">Véhicules électriques</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 mx-auto mb-2 text-purple-600" />
            <p className="text-2xl font-bold">{monthlyStats.reservations}</p>
            <p className="text-xs text-gray-600">Réservations</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Occupancy Trends */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Tendances hebdomadaires</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-7 gap-2">
              {weeklyData.map((data, index) => (
                <div key={index} className="text-center">
                  <div className="bg-gray-100 rounded-lg p-4 mb-2">
                    <div 
                      className={`mx-auto rounded transition-all duration-500 ${
                        data.occupancy < 50 ? 'bg-green-500' : 
                        data.occupancy < 80 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ 
                        height: `${(data.occupancy / 100) * 60}px`,
                        width: '20px'
                      }}
                    ></div>
                    <p className="text-lg font-bold mt-2">{data.occupancy}%</p>
                  </div>
                  <p className="font-medium">{data.day}</p>
                  <p className="text-xs text-gray-500">Pic: {data.peak}</p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hourly Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution horaire d'occupation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-end justify-between space-x-1 h-32">
              {hourlyDistribution.map((data, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className={`w-full rounded-t transition-all duration-500 ${getBarColor(data.percentage)}`}
                    style={{ height: getBarHeight(data.percentage) }}
                  ></div>
                  <p className="text-xs mt-2 transform rotate-45 origin-bottom-left whitespace-nowrap">
                    {data.hour}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-4">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Zone Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Performance par zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: 'Zone A - Principal', utilization: 92, revenue: '€2,340', rating: 4.5 },
              { name: 'Zone B - Enseignants', utilization: 78, revenue: '€1,890', rating: 4.8 },
              { name: 'Zone C - Visiteurs', utilization: 65, revenue: '€1,245', rating: 4.2 },
              { name: 'Zone D - Personnel', utilization: 85, revenue: '€1,675', rating: 4.6 },
              { name: 'Zone E - Électrique', utilization: 88, revenue: '€2,100', rating: 4.9 },
            ].map((zone, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-semibold">{zone.name}</h3>
                  <div className="flex items-center space-x-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${getBarColor(zone.utilization)}`}
                          style={{ width: `${zone.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{zone.utilization}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">{zone.revenue}</p>
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">★</span>
                    <span className="text-sm">{zone.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Impact */}
      <Card>
        <CardHeader>
          <CardTitle>Impact environnemental</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl mb-2">🌱</div>
              <p className="text-2xl font-bold text-green-600">245</p>
              <p className="text-sm text-gray-600">Véhicules électriques</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl mb-2">💨</div>
              <p className="text-2xl font-bold text-blue-600">-15%</p>
              <p className="text-sm text-gray-600">Réduction CO2</p>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl mb-2">⚡</div>
              <p className="text-2xl font-bold text-purple-600">1,250 kWh</p>
              <p className="text-sm text-gray-600">Énergie fournie</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Statistics;
