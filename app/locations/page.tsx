"use client"

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { MapPin } from 'lucide-react';

interface Location {
  id: string;
  name: string;
}

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [newLocation, setNewLocation] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const mockLocations: Location[] = [
      { id: '1', name: 'Warehouse A' },
      { id: '2', name: 'Warehouse B' },
      { id: '3', name: 'Warehouse C' },
    ];
    setLocations(mockLocations);
  }, []);

  const handleAddLocation = () => {
    if (newLocation.trim() === '') {
      toast({
        title: "Error",
        description: "Location name cannot be empty",
        variant: "destructive"
      });
      return;
    }
    const location: Location = {
      id: Date.now().toString(),
      name: newLocation.trim()
    };
    setLocations([...locations, location]);
    setNewLocation('');
    toast({
      title: "Success",
      description: `Location "${location.name}" has been added.`
    });
  };

  const handleDeleteLocation = (id: string) => {
    setLocations(locations.filter(location => location.id !== id));
    toast({
      title: "Success",
      description: "Location has been deleted."
    });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <MapPin className="mr-2" />
        Manage Locations
      </h1>
      <div className="flex items-center space-x-2 mb-4">
        <Input
          type="text"
          placeholder="New location name"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
          className="max-w-sm"
        />
        <Button onClick={handleAddLocation}>Add Location</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Location Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <TableRow key={location.id}>
              <TableCell>{location.name}</TableCell>
              <TableCell>
                <Button variant="destructive" onClick={() => handleDeleteLocation(location.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}