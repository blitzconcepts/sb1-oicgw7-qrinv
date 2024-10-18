"use client"

import { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import Image from 'next/image'
import InventoryForm from '@/components/InventoryForm'
import { QrCode, Package } from 'lucide-react';

interface InventoryItem {
  id: string;
  qrCode: string;
  quantity: number;
  description: string;
  image: string;
  location: string;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // In a real application, you would fetch this data from your backend
    const mockInventory: InventoryItem[] = [
      { id: '1', qrCode: 'QR001', quantity: 5, description: 'Item 1', image: 'https://source.unsplash.com/random/100x100?item=1', location: 'Warehouse A' },
      { id: '2', qrCode: 'QR002', quantity: 10, description: 'Item 2', image: 'https://source.unsplash.com/random/100x100?item=2', location: 'Warehouse B' },
      { id: '3', qrCode: 'QR003', quantity: 3, description: 'Item 3', image: 'https://source.unsplash.com/random/100x100?item=3', location: 'Warehouse C' },
    ];
    setInventory(mockInventory);
  }, []);

  const handleAddItem = (newItem: Omit<InventoryItem, 'id'>) => {
    const item = { ...newItem, id: Date.now().toString() };
    setInventory([...inventory, item]);
    toast({
      title: "Item Added",
      description: `${item.description} has been added to the inventory.`,
    });
    setIsDialogOpen(false);
  };

  const filteredInventory = inventory.filter(item =>
    item.qrCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4 flex items-center">
        <Package className="mr-2" />
        Inventory
      </h1>
      <div className="flex justify-between items-center mb-4">
        <Input
          type="text"
          placeholder="Search inventory..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Add New Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <InventoryForm onSubmit={handleAddItem} />
          </DialogContent>
        </Dialog>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4">
            <QrCode className="mr-2 h-4 w-4" />
            Scan QR Code
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Scan QR Code</DialogTitle>
          </DialogHeader>
          <p>QR code scanning functionality to be implemented.</p>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>QR Code</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Location</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInventory.map((item) => (
            <TableRow key={item.id}>
              <TableCell>
                <Image src={item.image} alt={item.description} width={50} height={50} className="rounded-full" />
              </TableCell>
              <TableCell>{item.qrCode}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.location}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}