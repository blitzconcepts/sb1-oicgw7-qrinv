"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { QrCode, Package, MapPin } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Home', icon: QrCode },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/locations', label: 'Locations', icon: MapPin },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 p-4 space-y-4">
      <h1 className="text-2xl font-bold mb-6">QR Inventory</h1>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href}>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === item.href && "bg-gray-200 dark:bg-gray-700"
              )}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}