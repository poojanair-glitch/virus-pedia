import { useState, useEffect } from 'react';
import { ArrowLeft, Calendar, AlertTriangle, Shield, Bug, Eye, Wrench, BookOpen, ExternalLink, Search, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Separator } from './ui/separator';
import { virusDatabase, type VirusInfo } from '../data/virusDatabase';
import { externalVirusService, type ExternalVirusInfo } from '../services/externalVirusService';
import { toast } from 'sonner@2.0.3';

interface VirusDetailsProps {
  virusName: string | null;
  onBack: () => void;
}

export function VirusDetails({ virusName, onBack }: VirusDetailsProps) {
  const [virus, setVirus] = useState<VirusInfo | null>(null);
  const [externalResults, setExternalResults] = useState<ExternalVirusInfo[]>([]);
  const [isSearchingExternal, setIsSearchingExternal] = useState(false);
  const [showExternalSearch, setShowExternalSearch] = useState(false);

  useEffect(() => {
    if (virusName) {
      const foundVirus = virusDatabase.find(v => v.name === virusName);
      setVirus(foundVirus || null);
      
      if (!foundVirus) {
        setShowExternalSearch(true);
        searchExternalSources(virusName);
      } else {
        setShowExternalSearch(false);
        setExternalResults([]);
      }
    }
  }, [virusName]);

  const searchExternalSources = async (searchTerm: string) => {
    setIsSearchingExternal(true);
    try {
      const results = await externalVirusService.searchMultipleSources(searchTerm);
      setExternalResults(results);
      if (results.length > 0) {
        toast.success(`Found ${results.length} external source(s) with information about ${searchTerm}`);
      } else {
        toast.info(`No external information found for ${searchTerm}`);
      }
    } catch (error) {
      toast.error('Error searching external sources');
    } finally {
      setIsSearchingExternal(false);
    }
  };

  // If virus not found in database and no external results
  if (!virus && !isSearchingExternal && externalResults.length === 0 && showExternalSearch) {
    return (
      <div className="text-center py-12">
        <Bug className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Virus Not Found</h2>
        <p className="text-muted-foreground mb-4">
          The requested virus "{virusName}" could not be found in our database or external sources.
        </p>
        <div className="flex gap-2 justify-center">
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button onClick={() => virusName && searchExternalSources(virusName)}>
            <Search className="h-4 w-4 mr-2" />
            Search Again
          </Button>
        </div>
      </div>
    );
  }

  // If virus not found but we have external results
  if (!virus && externalResults.length > 0) {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Globe className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-2xl font-semibold">{virusName}</h1>
              <p className="text-sm text-muted-foreground">Information from external sources</p>
            </div>
          </div>
        </div>

        {/* External Results */}
        <div className="space-y-4">
          {externalResults.map((result, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <ExternalLink className="h-5 w-5" />
                      {result.name} - {result.source}
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Last updated: {new Date(result.lastModified).toLocaleDateString()}
                    </CardDescription>
                  </div>
                  <Badge variant="outline">External Source</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">
                  {result.description}
                </p>

                <div className="space-y-2">
                  <h4 className="font-semibold">Summary</h4>
                  <p className="text-sm leading-relaxed">
                    {result.summary}
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Detailed Information</h4>
                  <div className="prose prose-sm max-w-none">
                    <pre className="whitespace-pre-wrap text-sm bg-muted p-4 rounded-lg">
                      {result.details}
                    </pre>
                  </div>
                </div>

                {result.categories.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">Categories</h4>
                    <div className="flex flex-wrap gap-1">
                      {result.categories.map((category) => (
                        <Badge key={category} variant="outline" className="text-xs">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {result.references.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-semibold">References</h4>
                    <ul className="text-sm space-y-1">
                      {result.references.map((reference, refIndex) => (
                        <li key={refIndex} className="flex items-center gap-2">
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          <span>{reference}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="pt-2 border-t">
                  <a 
                    href={result.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline flex items-center gap-1"
                  >
                    View original source
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search Status */}
        {isSearchingExternal && (
          <Card>
            <CardContent className="text-center py-8">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-4 animate-pulse" />
              <p className="text-muted-foreground">Searching external sources...</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  // Original virus details for viruses found in database
  if (!virus) return null;

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Ransomware': return '🔒';
      case 'Trojan': return '🐴';
      case 'Worm': return '🐛';
      case 'Rootkit': return '👤';
      case 'Spyware': return '👁️';
      case 'Adware': return '📢';
      case 'Botnet': return '🤖';
      case 'Keylogger': return '⌨️';
      case 'Backdoor': return '🚪';
      default: return '🦠';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{getTypeIcon(virus.type)}</span>
          <div>
            <h1 className="text-2xl font-semibold">{virus.name}</h1>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant={getSeverityColor(virus.severity) as any}>
                {virus.severity}
              </Badge>
              <Badge variant="outline">{virus.type}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{virus.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                Discovered: {new Date(virus.discoveryDate).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Severity: {virus.severity}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bug className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Type: {virus.type}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Aliases */}
      {virus.aliases.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Known Aliases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {virus.aliases.map((alias) => (
                <Badge key={alias} variant="outline">
                  {alias}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="introduction" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="introduction">Introduction</TabsTrigger>
          <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
          <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
          <TabsTrigger value="prevention">Prevention</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
        </TabsList>

        <TabsContent value="introduction" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                How It's Introduced
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {virus.introduction}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="symptoms" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Infection Symptoms
              </CardTitle>
              <CardDescription>
                Signs that indicate your system may be infected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {virus.symptoms.map((symptom, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{symptom}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mitigation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5" />
                Mitigation Steps
              </CardTitle>
              <CardDescription>
                Immediate actions to take if infected
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-3">
                {virus.mitigation.map((step, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="prevention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Prevention Measures
              </CardTitle>
              <CardDescription>
                Proactive steps to protect against infection
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {virus.prevention.map((measure, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                    <span>{measure}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Details</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {virus.technicalDetails}
              </p>
              
              <Separator className="my-6" />
              
              <div className="space-y-4">
                <h4 className="font-semibold">Affected Systems</h4>
                <div className="flex flex-wrap gap-2">
                  {virus.affectedSystems.map((system) => (
                    <Badge key={system} variant="outline">
                      {system}
                    </Badge>
                  ))}
                </div>
              </div>

              {virus.references.length > 0 && (
                <>
                  <Separator className="my-6" />
                  <div className="space-y-4">
                    <h4 className="font-semibold">References</h4>
                    <ul className="space-y-2">
                      {virus.references.map((reference, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <ExternalLink className="h-3 w-3 text-muted-foreground" />
                          <span className="text-sm font-mono">{reference}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}