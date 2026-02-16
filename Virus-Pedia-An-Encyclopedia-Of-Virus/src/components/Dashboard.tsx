import { useState, useMemo } from 'react';
import { Search, AlertTriangle, Shield } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { virusDatabase, virusCategories, severityLevels } from '../data/virusDatabase';
import { CyberAwareness } from './CyberAwareness';

interface DashboardProps {
  onVirusSelect: (virusName: string) => void;
}

export function Dashboard({ onVirusSelect }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    // Search in our database first
    const foundVirus = virusDatabase.find(virus => 
      virus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      virus.aliases.some(alias => alias.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    if (foundVirus) {
      onVirusSelect(foundVirus.name);
    } else {
      // If not found in database, search externally
      onVirusSelect(searchTerm.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Shield className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-semibold">Welcome To Threat Intelligence</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Stay informed about the latest cyber threats, malware families, and security vulnerabilities. 
          Search our comprehensive database or get information from external sources.
        </p>
      </div>

      {/* Main Search Section */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Search className="h-6 w-6" />
            Threat Intelligence Search
          </CardTitle>
          <CardDescription className="text-lg">
            Search for malware, viruses, and cybersecurity threats from our database and external sources
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter virus name, malware family, or threat indicator..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 text-lg h-12"
              />
              <Button onClick={handleSearch} size="lg" className="px-8">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Filter by:</span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {virusCategories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    {severityLevels.map((severity) => (
                      <SelectItem key={severity} value={severity}>
                        {severity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            <p>Our database contains detailed information about 30+ major malware families.</p>
            <p>For threats not in our database, we'll search external sources including Wikipedia and security databases.</p>
          </div>
        </CardContent>
      </Card>

      {/* Quick Access Examples */}
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Popular Searches</CardTitle>
          <CardDescription>Click on any threat to learn more</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['WannaCry', 'Emotet', 'Stuxnet', 'Zeus', 'Conficker', 'Ryuk', 'Mirai', 'Locky'].map((threat) => (
              <Button
                key={threat}
                variant="outline"
                size="sm"
                onClick={() => onVirusSelect(threat)}
                className="justify-start"
              >
                {threat}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Database Stats */}
      <Card className="max-w-4xl mx-auto">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-semibold text-primary">{virusDatabase.length}+</div>
              <p className="text-sm text-muted-foreground">Malware Families</p>
            </div>
            <div>
              <div className="text-2xl font-semibold text-primary">24/7</div>
              <p className="text-sm text-muted-foreground">Threat Monitoring</p>
            </div>
            <div>
              <div className="text-2xl font-semibold text-primary">Real-time</div>
              <p className="text-sm text-muted-foreground">External Search</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cyber Awareness Section */}
      <CyberAwareness />
    </div>
  );
}