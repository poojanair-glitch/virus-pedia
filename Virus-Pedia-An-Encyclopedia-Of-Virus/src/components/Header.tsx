import { Shield, Home, Activity, Mail, Brain, Search } from 'lucide-react';
import { Button } from './ui/button';

type Page = 'dashboard' | 'virus' | 'alienvault' | 'contact' | 'threat-intel' | 'virustotal';

interface HeaderProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
}

export function Header({ currentPage, onPageChange }: HeaderProps) {
  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
    { id: 'virustotal' as const, label: 'VirusTotal', icon: Search },
    { id: 'alienvault' as const, label: 'Live Threat Feed', icon: Activity },
    { id: 'threat-intel' as const, label: 'Threat Intelligence', icon: Brain },
    { id: 'contact' as const, label: 'Contact', icon: Mail },
  ];

  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-primary" />
            <h1 className="text-xl font-semibold">Viruspedia</h1>
          </div>
          
          <nav className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onPageChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}