import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QrCode, Package, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-8">QR Inventory Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <QrCode className="mr-2" />
              Scan QR Code
            </CardTitle>
            <CardDescription>Add or update inventory items by scanning QR codes</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Use the Scan QR Code feature in the inventory page to quickly add or update items.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="mr-2" />
              Inventory Management
            </CardTitle>
            <CardDescription>Manage your inventory items</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Add, edit, or remove inventory items. View all your items in one place.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2" />
              Location Management
            </CardTitle>
            <CardDescription>Manage inventory locations</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Add, edit, or remove inventory locations to keep your items organized.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}