
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User, Car } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ReservationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userType: "",
    date: "",
    startTime: "",
    endTime: "",
    vehicleNumber: ""
  });
  
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulation de la réservation
    toast({
      title: "Réservation confirmée !",
      description: `Votre place a été réservée pour le ${formData.date} de ${formData.startTime} à ${formData.endTime}`,
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      userType: "",
      date: "",
      startTime: "",
      endTime: "",
      vehicleNumber: ""
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Informations personnelles */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <User className="h-5 w-5 mr-2 text-blue-600" />
            Informations Personnelles
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nom Complet *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Votre nom complet"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="votre.email@ensaj.ma"
                required
              />
            </div>
          </div>
          
          <div className="mt-4">
            <Label htmlFor="userType">Type d'Utilisateur *</Label>
            <Select value={formData.userType} onValueChange={(value) => handleInputChange("userType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez votre statut" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professor">Professeur</SelectItem>
                <SelectItem value="staff">Personnel</SelectItem>
                <SelectItem value="visitor">Visiteur</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Informations de réservation */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-green-600" />
            Détails de la Réservation
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="startTime">Heure d'arrivée *</Label>
              <Input
                id="startTime"
                type="time"
                value={formData.startTime}
                onChange={(e) => handleInputChange("startTime", e.target.value)}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="endTime">Heure de départ *</Label>
              <Input
                id="endTime"
                type="time"
                value={formData.endTime}
                onChange={(e) => handleInputChange("endTime", e.target.value)}
                required
              />
            </div>
          </div>
        </CardContent>
      </Card>

    

      {/* Places disponibles simulation */}
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-semibold text-green-800">Places Disponibles</h4>
              <p className="text-sm text-green-600">
                {formData.userType === "professor" ? "Zone Professeurs: 8 places libres" :
                 formData.userType === "staff" ? "Zone Personnel: 12 places libres" :
                 formData.userType === "visitor" ? "Zone Visiteurs: 22 places libres" :
                 "Sélectionnez votre statut pour voir les places disponibles"}
              </p>
            </div>
            <div className="text-2xl font-bold text-green-600">
              {formData.userType ? "✓" : "?"}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bouton de soumission */}
      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
        disabled={!formData.name || !formData.email || !formData.userType || !formData.date || !formData.startTime || !formData.endTime || !formData.vehicleNumber}
      >
        <Clock className="h-5 w-5 mr-2" />
        Confirmer la Réservation
      </Button>
    </form>
  );
};
