"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface InventoryItem {
  id: string;
  qrCode: string;
  quantity: number;
  description: string;
  image: string;
  location: string;
}

interface InventoryFormProps {
  onSubmit: (item: Omit<InventoryItem, 'id'>) => void;
  initialData?: InventoryItem;
}

export default function InventoryForm({ onSubmit, initialData }: InventoryFormProps) {
  const [formData, setFormData] = useState<Omit<InventoryItem, 'id'>>({
    qrCode: initialData?.qrCode || '',
    quantity: initialData?.quantity || 1,
    description: initialData?.description || '',
    image: initialData?.image || '',
    location: initialData?.location || '',
  });
  const [locations, setLocations] = useState<{ id: string; name: string; }[]>([]);
  const { toast } = useToast()

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const mockLocations = [
      { id: '1', name: 'Warehouse A' },
      { id: '2', name: 'Warehouse B' },
      { id: '3', name: 'Warehouse C' },
    ];
    setLocations(mockLocations);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'quantity' ? parseInt(value) || 0 : value }));
  };

  const handleLocationChange = (value: string) => {
    setFormData(prev => ({ ...prev, location: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.qrCode || !formData.description || !formData.image || !formData.location) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="qrCode">QR Code</Label>
        <Input
          id="qrCode"
          name="qrCode"
          value={formData.qrCode}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="quantity">Quantity</Label>
        <Input
          id="quantity"
          name="quantity"
          type="number"
          value={formData.quantity.toString()}
          onChange={handleChange}
          required
          min="0"
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="location">Location</Label>
        <Select onValueChange={handleLocationChange} value={formData.location}>
          <SelectTrigger>
            <SelectValue placeholder="Select a location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.id} value={location.name}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{initialData ? 'Update' : 'Add'} Item</Button>
    </form>
  );
}