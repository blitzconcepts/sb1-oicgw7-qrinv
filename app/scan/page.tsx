"use client"

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast"
import jsQR from 'jsqr';
import InventoryForm from '@/components/InventoryForm';

export default function ScanPage() {
  const [result, setResult] = useState('');
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const code = jsQR(imageData.data, imageData.width, imageData.height);
            if (code) {
              setResult(code.data);
            } else {
              toast({
                title: "QR Code not found",
                description: "Please upload a clear image of a QR code.",
                variant: "destructive"
              });
            }
          }
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (item: Omit<{ id: string; qrCode: string; quantity: number; description: string; image: string; location: string; }, "id">) => {
    console.log({ ...item, qrCode: result });
    toast({
      title: "Item added to inventory",
      description: `QR Code: ${result}, Quantity: ${item.quantity}, Description: ${item.description}, Location: ${item.location}`,
    })
    setResult('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
      <div className="mb-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          ref={fileInputRef}
        />
      </div>
      {result && (
        <div className="mb-4">
          <Label htmlFor="qr-result">QR Code Result</Label>
          <Input id="qr-result" value={result} readOnly />
        </div>
      )}
      <InventoryForm onSubmit={handleSubmit} initialData={{ id: '', qrCode: result, quantity: 1, description: '', image: '', location: '' }} />
    </div>
  );
}