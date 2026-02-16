import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { VirusDetails } from './components/VirusDetails';
import { AlienVaultFeed } from './components/AlienVaultFeed';
import { Contact } from './components/Contact';
import { ThreatIntel } from './components/ThreatIntel';
import { VirusTotalAnalysis } from './components/VirusTotalAnalysis';
import { Toaster } from './components/ui/sonner';

type Page = 'dashboard' | 'virus' | 'alienvault' | 'contact' | 'threat-intel' | 'virustotal';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedVirus, setSelectedVirus] = useState<string | null>(null);

  const handleVirusSelect = (virusName: string) => {
    setSelectedVirus(virusName);
    setCurrentPage('virus');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onVirusSelect={handleVirusSelect} />;
      case 'virus':
        return <VirusDetails virusName={selectedVirus} onBack={() => setCurrentPage('dashboard')} />;
      case 'alienvault':
        return <AlienVaultFeed />;
      case 'contact':
        return <Contact />;
      case 'threat-intel':
        return <ThreatIntel />;
      case 'virustotal':
        return <VirusTotalAnalysis />;
      default:
        return <Dashboard onVirusSelect={handleVirusSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="container mx-auto px-4 py-6">
        {renderPage()}
      </main>
      <Toaster />
    </div>
  );
}