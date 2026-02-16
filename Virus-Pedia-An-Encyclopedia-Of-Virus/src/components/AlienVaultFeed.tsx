import { useState, useEffect } from 'react';
import { Activity, Globe, MapPin, Clock, AlertTriangle, RefreshCw, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface ThreatIndicator {
  id: string;
  type: 'IP' | 'Domain' | 'Hash' | 'URL';
  value: string;
  country: string;
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  category: string;
  description: string;
  timestamp: string;
  source: string;
  confidence: number;
  tags: string[];
}

interface PulseData {
  id: string;
  name: string;
  description: string;
  author: string;
  created: string;
  indicators: number;
  tags: string[];
  adversary: string;
  tlp: 'White' | 'Green' | 'Amber' | 'Red';
}

export function AlienVaultFeed() {
  const [indicators, setIndicators] = useState<ThreatIndicator[]>([]);
  const [pulses, setPulses] = useState<PulseData[]>([]);
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedSeverity, setSelectedSeverity] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulated threat indicators
  const mockIndicators: ThreatIndicator[] = [
    {
      id: '1',
      type: 'IP',
      value: '185.220.101.42',
      country: 'RU',
      severity: 'Critical',
      category: 'Malware C2',
      description: 'Known command and control server for banking trojan',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      source: 'AlienVault Labs',
      confidence: 95,
      tags: ['banking', 'trojan', 'c2']
    },
    {
      id: '2',
      type: 'Domain',
      value: 'malicious-update.com',
      country: 'CN',
      severity: 'High',
      category: 'Phishing',
      description: 'Fake software update site distributing malware',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      source: 'Community',
      confidence: 87,
      tags: ['phishing', 'malware', 'fake-update']
    },
    {
      id: '3',
      type: 'Hash',
      value: 'a1b2c3d4e5f6789012345678901234567890',
      country: 'US',
      severity: 'Critical',
      category: 'Ransomware',
      description: 'SHA-1 hash of known ransomware executable',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      source: 'AlienVault Labs',
      confidence: 98,
      tags: ['ransomware', 'executable']
    },
    {
      id: '4',
      type: 'URL',
      value: 'http://suspicious-site.tk/login.php',
      country: 'Unknown',
      severity: 'Medium',
      category: 'Credential Harvesting',
      description: 'Fake login page harvesting credentials',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      source: 'Threat Exchange',
      confidence: 78,
      tags: ['credentials', 'phishing']
    },
    {
      id: '5',
      type: 'IP',
      value: '103.224.182.251',
      country: 'KP',
      severity: 'High',
      category: 'APT Activity',
      description: 'Infrastructure linked to state-sponsored group',
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      source: 'Government Feed',
      confidence: 92,
      tags: ['apt', 'state-sponsored']
    }
  ];

  const mockPulses: PulseData[] = [
    {
      id: 'p1',
      name: 'Operation Silent Storm',
      description: 'Advanced persistent threat campaign targeting financial institutions worldwide',
      author: 'AlienVault Labs',
      created: new Date(Date.now() - 86400000).toISOString(),
      indicators: 247,
      tags: ['apt', 'financial', 'targeted'],
      adversary: 'APT29',
      tlp: 'Amber'
    },
    {
      id: 'p2',
      name: 'Emotet Resurgence 2024',
      description: 'New Emotet variant with enhanced evasion capabilities',
      author: 'Threat Research Team',
      created: new Date(Date.now() - 172800000).toISOString(),
      indicators: 156,
      tags: ['emotet', 'trojan', 'malware'],
      adversary: 'TA542',
      tlp: 'Green'
    },
    {
      id: 'p3',
      name: 'Healthcare Ransomware Wave',
      description: 'Coordinated ransomware attacks against healthcare providers',
      author: 'Industry Sharing',
      created: new Date(Date.now() - 259200000).toISOString(),
      indicators: 89,
      tags: ['ransomware', 'healthcare', 'targeted'],
      adversary: 'Conti Group',
      tlp: 'Red'
    }
  ];

  useEffect(() => {
    setIndicators(mockIndicators);
    setPulses(mockPulses);
  }, []);

  const refreshFeed = async () => {
    setIsRefreshing(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Add some new mock data
    const newIndicator: ThreatIndicator = {
      id: `new-${Date.now()}`,
      type: ['IP', 'Domain', 'Hash', 'URL'][Math.floor(Math.random() * 4)] as ThreatIndicator['type'],
      value: `new-threat-${Math.random().toString(36).substr(2, 9)}`,
      country: ['US', 'RU', 'CN', 'KP'][Math.floor(Math.random() * 4)],
      severity: ['Low', 'Medium', 'High', 'Critical'][Math.floor(Math.random() * 4)] as ThreatIndicator['severity'],
      category: 'New Threat',
      description: 'Recently discovered threat indicator',
      timestamp: new Date().toISOString(),
      source: 'Live Feed',
      confidence: Math.floor(Math.random() * 40) + 60,
      tags: ['new', 'live']
    };
    
    setIndicators(prev => [newIndicator, ...prev]);
    setIsRefreshing(false);
  };

  const filteredIndicators = indicators.filter(indicator => {
    const matchesType = selectedType === 'All' || indicator.type === selectedType;
    const matchesSeverity = selectedSeverity === 'All' || indicator.severity === selectedSeverity;
    return matchesType && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getTlpColor = (tlp: string) => {
    switch (tlp) {
      case 'Red': return 'destructive';
      case 'Amber': return 'secondary';
      case 'Green': return 'outline';
      case 'White': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'IP': return '🌐';
      case 'Domain': return '🔗';
      case 'Hash': return '#️⃣';
      case 'URL': return '📄';
      default: return '🔍';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Activity className="h-6 w-6" />
            AlienVault Live Threat Feed
          </h1>
          <p className="text-muted-foreground mt-1">
            Real-time threat intelligence from global security community
          </p>
        </div>
        <Button onClick={refreshFeed} disabled={isRefreshing}>
          <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Feed'}
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="h-4 w-4 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Critical Threats</p>
                <p className="text-2xl font-bold">
                  {indicators.filter(i => i.severity === 'Critical').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-full">
                <Globe className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Total Indicators</p>
                <p className="text-2xl font-bold">{indicators.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-full">
                <Activity className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Active Pulses</p>
                <p className="text-2xl font-bold">{pulses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-100 rounded-full">
                <Clock className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium">Last 24h</p>
                <p className="text-2xl font-bold">
                  {indicators.filter(i => 
                    new Date(i.timestamp) > new Date(Date.now() - 86400000)
                  ).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="indicators" className="w-full">
        <TabsList>
          <TabsTrigger value="indicators">Threat Indicators</TabsTrigger>
          <TabsTrigger value="pulses">Threat Pulses</TabsTrigger>
        </TabsList>

        <TabsContent value="indicators" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="h-5 w-5" />
                Filter Indicators
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Types</SelectItem>
                    <SelectItem value="IP">IP Address</SelectItem>
                    <SelectItem value="Domain">Domain</SelectItem>
                    <SelectItem value="Hash">File Hash</SelectItem>
                    <SelectItem value="URL">URL</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All Severities</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Indicators List */}
          <div className="space-y-4">
            {filteredIndicators.map((indicator) => (
              <Card key={indicator.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{getTypeIcon(indicator.type)}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold font-mono">{indicator.value}</h3>
                          <Badge variant={getSeverityColor(indicator.severity) as any}>
                            {indicator.severity}
                          </Badge>
                          <Badge variant="outline">{indicator.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {indicator.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {indicator.country}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(indicator.timestamp).toLocaleString()}
                          </span>
                          <span>Source: {indicator.source}</span>
                          <span>Confidence: {indicator.confidence}%</span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {indicator.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pulses" className="space-y-4">
          <div className="space-y-4">
            {pulses.map((pulse) => (
              <Card key={pulse.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        {pulse.name}
                      </CardTitle>
                      <CardDescription className="mt-2">
                        {pulse.description}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge variant={getTlpColor(pulse.tlp) as any}>
                        TLP: {pulse.tlp}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium">Author</p>
                      <p className="text-sm text-muted-foreground">{pulse.author}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Adversary</p>
                      <p className="text-sm text-muted-foreground">{pulse.adversary}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Indicators</p>
                      <p className="text-sm text-muted-foreground">{pulse.indicators}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Created</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(pulse.created).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {pulse.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}