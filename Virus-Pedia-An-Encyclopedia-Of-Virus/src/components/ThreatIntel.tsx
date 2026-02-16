import { useState, useMemo } from 'react';
import { Calendar, MapPin, Users, DollarSign, AlertTriangle, Shield, Search, Filter } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

interface CyberAttack {
  id: string;
  name: string;
  date: string;
  year: number;
  type: 'Ransomware' | 'Data Breach' | 'Nation-State' | 'Supply Chain' | 'DDoS' | 'Malware' | 'Social Engineering';
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  target: string;
  victims: string;
  impact: string;
  damages: string;
  description: string;
  attribution: string;
  geography: string[];
  technicalDetails: string;
  consequences: string[];
}

const historicalAttacks: CyberAttack[] = [
  {
    id: '2024-001',
    name: 'Change Healthcare Cyberattack',
    date: 'February 2024',
    year: 2024,
    type: 'Ransomware',
    severity: 'Critical',
    target: 'Healthcare Infrastructure',
    victims: '100+ million patients',
    impact: 'Disrupted healthcare services across the US',
    damages: '$872 million estimated',
    description: 'BlackCat/ALPHV ransomware group attacked UnitedHealth\'s Change Healthcare, disrupting prescription services, medical claims, and payments across the US healthcare system.',
    attribution: 'BlackCat/ALPHV Ransomware Group',
    geography: ['United States'],
    technicalDetails: 'Ransomware attack exploiting network vulnerabilities, encrypting critical healthcare data and systems.',
    consequences: [
      'Widespread prescription delays',
      'Medical claims processing disruption',
      'Patient data exposure',
      'Healthcare provider payment delays'
    ]
  },
  {
    id: '2024-002',
    name: 'AT&T Data Breach',
    date: 'January 2024',
    year: 2024,
    type: 'Data Breach',
    severity: 'High',
    target: 'Telecommunications',
    victims: '73 million customers',
    impact: 'Massive customer data exposure',
    damages: 'Estimated $25 million in response costs',
    description: 'AT&T disclosed that hackers accessed personal information of approximately 73 million current and former customers in a major data breach.',
    attribution: 'Unknown threat actors',
    geography: ['United States'],
    technicalDetails: 'Data stolen from external systems, including names, addresses, phone numbers, and Social Security numbers.',
    consequences: [
      '73 million customer records exposed',
      'Identity theft concerns',
      'Regulatory scrutiny',
      'Class action lawsuits filed'
    ]
  },
  {
    id: '2023-001',
    name: 'MOVEit Transfer Mass Exploitation',
    date: 'May 2023',
    year: 2023,
    type: 'Supply Chain',
    severity: 'Critical',
    target: 'File Transfer Software',
    victims: '2,000+ organizations globally',
    impact: 'Mass data exfiltration affecting governments and enterprises',
    damages: '$9.9 billion estimated global impact',
    description: 'Clop ransomware group exploited zero-day vulnerabilities in Progress Software\'s MOVEit Transfer application, affecting thousands of organizations worldwide.',
    attribution: 'Clop Ransomware Group',
    geography: ['Global'],
    technicalDetails: 'SQL injection vulnerabilities (CVE-2023-34362, CVE-2023-35036, CVE-2023-35708) in MOVEit Transfer web application.',
    consequences: [
      'Mass data theft from government agencies',
      'Corporate data breaches across multiple sectors',
      'Supply chain trust erosion',
      'Regulatory investigations and fines'
    ]
  },
  {
    id: '2023-002',
    name: 'LastPass Security Incidents',
    date: 'August 2022 - February 2023',
    year: 2023,
    type: 'Data Breach',
    severity: 'Critical',
    target: 'Password Management',
    victims: '30+ million users',
    impact: 'Compromise of encrypted password vaults',
    damages: 'Reputation and user trust severely damaged',
    description: 'LastPass suffered multiple security incidents resulting in the theft of customer password vaults and sensitive company data over several months.',
    attribution: 'Unknown APT group',
    geography: ['Global'],
    technicalDetails: 'Initial compromise through DevOps engineer\'s home computer, lateral movement to production systems, theft of encrypted vaults and encryption keys.',
    consequences: [
      'Customer password vaults stolen',
      'Encrypted data potentially at risk',
      'Mass user migration to competitors',
      'Security industry trust issues'
    ]
  },
  {
    id: '2022-001',
    name: 'Costa Rica Government Attack',
    date: 'May 2022',
    year: 2022,
    type: 'Ransomware',
    severity: 'Critical',
    target: 'Government Infrastructure',
    victims: 'Entire Costa Rican government',
    impact: 'National emergency declared',
    damages: 'Undisclosed',
    description: 'Conti ransomware group attacked multiple Costa Rican government ministries, forcing the country to declare a national emergency.',
    attribution: 'Conti Ransomware Group',
    geography: ['Costa Rica'],
    technicalDetails: 'Multi-vector attack targeting government networks, encrypting critical systems and stealing sensitive data.',
    consequences: [
      'National emergency declaration',
      'Government operations disruption',
      'Citizens\' data exposure',
      'International diplomatic involvement'
    ]
  },
  {
    id: '2022-002',
    name: 'Nvidia Corporation Breach',
    date: 'February 2022',
    year: 2022,
    type: 'Data Breach',
    severity: 'High',
    target: 'Technology Sector',
    victims: 'Nvidia employees and partners',
    impact: 'Proprietary information and credentials stolen',
    damages: 'Estimated $50+ million impact',
    description: 'Lapsus$ hacking group breached Nvidia and stole 1TB of proprietary information, including employee credentials and proprietary data.',
    attribution: 'Lapsus$ Group',
    geography: ['Global'],
    technicalDetails: 'Social engineering and credential theft used to gain access to Nvidia\'s internal systems.',
    consequences: [
      '1TB of proprietary data stolen',
      'Employee credential exposure',
      'Attempts to extort company',
      'Enhanced security measures implemented'
    ]
  },
  {
    id: '2021-001',
    name: 'Colonial Pipeline Ransomware',
    date: 'May 2021',
    year: 2021,
    type: 'Ransomware',
    severity: 'Critical',
    target: 'Critical Infrastructure',
    victims: 'US East Coast fuel supply',
    impact: 'Fuel shortages and panic buying across US East Coast',
    damages: '$4.4 million ransom paid',
    description: 'DarkSide ransomware group attacked Colonial Pipeline, the largest fuel pipeline system in the US, causing widespread fuel shortages.',
    attribution: 'DarkSide Ransomware Group',
    geography: ['United States'],
    technicalDetails: 'Ransomware attack on IT systems forced operational shutdown of OT systems as precautionary measure.',
    consequences: [
      'Six-day pipeline shutdown',
      'Fuel shortages in multiple states',
      'Gas price increases',
      'Supply chain disruptions'
    ]
  },
  {
    id: '2021-002',
    name: 'Kaseya Supply Chain Attack',
    date: 'July 2021',
    year: 2021,
    type: 'Supply Chain',
    severity: 'Critical',
    target: 'MSP Software Platform',
    victims: '1,500+ companies globally',
    impact: 'Widespread ransomware deployment through MSP networks',
    damages: '$70 million ransom demanded',
    description: 'REvil/Sodinokibi ransomware group compromised Kaseya\'s VSA software, deploying ransomware to thousands of companies through managed service providers.',
    attribution: 'REvil/Sodinokibi Group',
    geography: ['Global'],
    technicalDetails: 'Zero-day exploits in Kaseya VSA software used to deploy ransomware to MSP customers.',
    consequences: [
      '1,500+ companies affected',
      'MSP industry security overhaul',
      'Supply chain attack awareness increased',
      'International law enforcement response'
    ]
  },
  {
    id: '2020-001',
    name: 'SolarWinds Supply Chain Attack',
    date: 'December 2020',
    year: 2020,
    type: 'Nation-State',
    severity: 'Critical',
    target: 'Software Supply Chain',
    victims: '18,000+ organizations globally',
    impact: 'Compromise of US government agencies and Fortune 500 companies',
    damages: 'Billions estimated',
    description: 'Russian APT29 group compromised SolarWinds Orion platform, affecting numerous high-profile organizations through trojanized software updates.',
    attribution: 'APT29/Cozy Bear (Russia)',
    geography: ['Global', 'United States focus'],
    technicalDetails: 'Supply chain compromise through malicious code injection into SolarWinds Orion software updates (SUNBURST backdoor).',
    consequences: [
      'US government agency breaches',
      'Fortune 500 company compromises',
      'Long-term espionage operations',
      'International diplomatic tensions'
    ]
  },
  {
    id: '2020-002',
    name: 'Twitter Bitcoin Scam',
    date: 'July 2020',
    year: 2020,
    type: 'Social Engineering',
    severity: 'High',
    target: 'Social Media Platform',
    victims: 'Twitter users and high-profile accounts',
    impact: 'Major social media platform compromise',
    damages: '$121,000 in Bitcoin stolen',
    description: 'Teenagers used social engineering to compromise Twitter employee accounts and hijack high-profile accounts for Bitcoin scam.',
    attribution: 'Individual hackers (teenagers)',
    geography: ['Global'],
    technicalDetails: 'Social engineering attack on Twitter employees, access to internal tools, mass account compromise.',
    consequences: [
      'High-profile account takeovers',
      'Public trust in social media damaged',
      'Enhanced employee security training',
      'Arrests of perpetrators'
    ]
  },
  {
    id: '2019-001',
    name: 'Capital One Data Breach',
    date: 'July 2019',
    year: 2019,
    type: 'Data Breach',
    severity: 'High',
    target: 'Financial Services',
    victims: '106 million customers',
    impact: 'Massive personal and financial data exposure',
    damages: '$190 million in fines and settlements',
    description: 'Former Amazon employee exploited misconfigured AWS firewall to access Capital One customer data stored in the cloud.',
    attribution: 'Paige Thompson (Individual)',
    geography: ['United States', 'Canada'],
    technicalDetails: 'Exploitation of misconfigured AWS WAF firewall and privilege escalation through SSRF vulnerability.',
    consequences: [
      'Personal data of 106 million exposed',
      'Credit card applications and Social Security numbers stolen',
      'Regulatory fines and lawsuits',
      'Cloud security practice changes'
    ]
  },
  {
    id: '2019-002',
    name: 'Baltimore Ransomware Attack',
    date: 'May 2019',
    year: 2019,
    type: 'Ransomware',
    severity: 'High',
    target: 'Municipal Government',
    victims: 'City of Baltimore',
    impact: 'City services disrupted for weeks',
    damages: '$18.2 million in recovery costs',
    description: 'RobbinHood ransomware crippled Baltimore city systems, disrupting services including real estate transactions, water bills, and health alerts.',
    attribution: 'Unknown ransomware group',
    geography: ['United States'],
    technicalDetails: 'RobbinHood ransomware deployment across city networks, encryption of critical systems.',
    consequences: [
      'City services disrupted for weeks',
      'Real estate market affected',
      'Emergency services impacted',
      'Massive recovery costs'
    ]
  },
  {
    id: '2018-001',
    name: 'Marriott International Breach',
    date: 'September 2018',
    year: 2018,
    type: 'Data Breach',
    severity: 'Critical',
    target: 'Hospitality Industry',
    victims: '500 million guests',
    impact: 'One of the largest data breaches in history',
    damages: '$123 million in fines',
    description: 'Chinese APT group accessed Marriott\'s Starwood reservation system for four years, stealing personal data of hundreds of millions of guests.',
    attribution: 'APT40 (China)',
    geography: ['Global'],
    technicalDetails: 'Long-term persistence in Starwood hotel reservation system, data exfiltration over multiple years.',
    consequences: [
      '500 million guest records stolen',
      'Passport and payment card data exposed',
      'GDPR fines in Europe',
      'Class action lawsuits'
    ]
  },
  {
    id: '2018-002',
    name: 'Facebook Cambridge Analytica',
    date: 'March 2018',
    year: 2018,
    type: 'Data Breach',
    severity: 'Critical',
    target: 'Social Media Platform',
    victims: '87 million Facebook users',
    impact: 'Political manipulation and privacy violation scandal',
    damages: '$5 billion FTC fine',
    description: 'Cambridge Analytica harvested personal data of millions of Facebook users without consent for political advertising during 2016 US election.',
    attribution: 'Cambridge Analytica / Political Consultancy',
    geography: ['Global', 'United States focus'],
    technicalDetails: 'Data harvesting through Facebook app permissions, psychological profiling for political advertising.',
    consequences: [
      '87 million users\' data misused',
      'Political election interference',
      'Congressional hearings',
      'Privacy regulation changes'
    ]
  },
  {
    id: '2017-001',
    name: 'WannaCry Global Ransomware',
    date: 'May 2017',
    year: 2017,
    type: 'Ransomware',
    severity: 'Critical',
    target: 'Global Infrastructure',
    victims: '300,000+ computers worldwide',
    impact: 'Hospitals, railways, and critical services disrupted globally',
    damages: '$4 billion estimated global impact',
    description: 'Self-propagating ransomware exploiting Windows SMB vulnerability, causing widespread disruption of critical services worldwide.',
    attribution: 'Lazarus Group (North Korea)',
    geography: ['Global'],
    technicalDetails: 'Worm-like ransomware exploiting EternalBlue SMB vulnerability (MS17-010), with kill switch domain discovery.',
    consequences: [
      'UK NHS hospitals severely affected',
      'Global shipping and logistics disrupted',
      'Manufacturing shutdowns',
      'Heightened ransomware awareness'
    ]
  },
  {
    id: '2017-002',
    name: 'Equifax Data Breach',
    date: 'September 2017',
    year: 2017,
    type: 'Data Breach',
    severity: 'Critical',
    target: 'Credit Reporting Agency',
    victims: '147 million Americans',
    impact: 'Massive exposure of sensitive financial data',
    damages: '$700+ million in settlements',
    description: 'Hackers exploited Apache Struts vulnerability to access Equifax systems, stealing sensitive financial information of nearly half of all Americans.',
    attribution: 'Chinese PLA Unit 54046',
    geography: ['United States', 'Canada', 'United Kingdom'],
    technicalDetails: 'Apache Struts CVE-2017-5638 exploitation, web application vulnerability leading to database access.',
    consequences: [
      '147 million Americans\' data stolen',
      'Credit monitoring industry changes',
      'Congressional investigations',
      'Executive resignations'
    ]
  },
  {
    id: '2016-001',
    name: 'Bangladesh Bank Heist',
    date: 'February 2016',
    year: 2016,
    type: 'Nation-State',
    severity: 'Critical',
    target: 'Banking Infrastructure',
    victims: 'Bangladesh Central Bank',
    impact: '$81 million stolen via SWIFT network',
    damages: '$81 million direct theft',
    description: 'North Korean hackers compromised Bangladesh Bank\'s systems and attempted to steal $1 billion through fraudulent SWIFT transfers.',
    attribution: 'Lazarus Group (North Korea)',
    geography: ['Bangladesh', 'Global banking'],
    technicalDetails: 'Custom malware targeting SWIFT Alliance Access software, database manipulation, and printer system compromise.',
    consequences: [
      '$81 million successfully stolen',
      'SWIFT security protocol overhaul',
      'Banking sector security improvements',
      'International cybercrime investigation'
    ]
  },
  {
    id: '2016-002',
    name: 'Democratic National Committee Hack',
    date: 'June 2016',
    year: 2016,
    type: 'Nation-State',
    severity: 'High',
    target: 'Political Organization',
    victims: 'DNC and Democratic Party',
    impact: 'US election interference and political disruption',
    damages: 'Incalculable political impact',
    description: 'Russian intelligence services hacked DNC emails and released them to influence the 2016 US presidential election.',
    attribution: 'APT28/Fancy Bear & APT29/Cozy Bear (Russia)',
    geography: ['United States'],
    technicalDetails: 'Spear-phishing attacks, credential harvesting, email server compromise, strategic data release.',
    consequences: [
      'US election interference',
      'Political party disruption',
      'International diplomatic crisis',
      'Enhanced election security measures'
    ]
  },
  {
    id: '2015-001',
    name: 'Ukraine Power Grid Attack',
    date: 'December 2015',
    year: 2015,
    type: 'Nation-State',
    severity: 'Critical',
    target: 'Critical Infrastructure',
    victims: '230,000 Ukrainian residents',
    impact: 'First known cyberattack causing power outage',
    damages: 'Undisclosed infrastructure costs',
    description: 'Russian-backed hackers conducted the first successful cyberattack on a power grid, leaving hundreds of thousands without electricity.',
    attribution: 'Sandworm/APT28 (Russia)',
    geography: ['Ukraine'],
    technicalDetails: 'Multi-stage attack using spear-phishing, lateral movement, and manual SCADA system manipulation.',
    consequences: [
      '230,000 people lost power for hours',
      'Phone systems knocked offline',
      'Precedent for infrastructure attacks',
      'Enhanced critical infrastructure protection'
    ]
  },
  {
    id: '2015-002',
    name: 'Ashley Madison Data Breach',
    date: 'July 2015',
    year: 2015,
    type: 'Data Breach',
    severity: 'High',
    target: 'Dating Website',
    victims: '37 million users',
    impact: 'Personal lives and relationships destroyed',
    damages: '$11.2 million class action settlement',
    description: 'Hacktivists calling themselves "Impact Team" breached Ashley Madison dating site and released user data publicly.',
    attribution: 'Impact Team (Hacktivists)',
    geography: ['Global'],
    technicalDetails: 'Website compromise, database extraction, public data release with personal information.',
    consequences: [
      '37 million user profiles exposed',
      'Personal relationships destroyed',
      'Suicides linked to data exposure',
      'Website industry security changes'
    ]
  },
  {
    id: '2014-001',
    name: 'Sony Pictures Entertainment Hack',
    date: 'November 2014',
    year: 2014,
    type: 'Nation-State',
    severity: 'High',
    target: 'Entertainment Industry',
    victims: 'Sony Pictures employees and partners',
    impact: 'Corporate data destruction and international incident',
    damages: '$15 million in IT repairs',
    description: 'North Korean hackers destroyed data and leaked confidential information in retaliation for "The Interview" movie depicting North Korean leader.',
    attribution: 'Lazarus Group (North Korea)',
    geography: ['United States'],
    technicalDetails: 'Destructive malware (Shamoon variant) combined with data exfiltration and public leak strategy.',
    consequences: [
      'Massive data destruction',
      'Employee personal information leaked',
      'International diplomatic incident',
      'Movie release controversy'
    ]
  }
];

export function ThreatIntel() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  const years = ['All', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017', '2016', '2015'];
  const types = ['All', 'Ransomware', 'Data Breach', 'Nation-State', 'Supply Chain', 'DDoS', 'Malware', 'Social Engineering'];
  const severities = ['All', 'Low', 'Medium', 'High', 'Critical'];

  const filteredAttacks = useMemo(() => {
    return historicalAttacks.filter((attack) => {
      const matchesSearch = attack.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           attack.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           attack.target.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesYear = selectedYear === 'All' || attack.year.toString() === selectedYear;
      const matchesType = selectedType === 'All' || attack.type === selectedType;
      const matchesSeverity = selectedSeverity === 'All' || attack.severity === selectedSeverity;
      
      return matchesSearch && matchesYear && matchesType && matchesSeverity;
    });
  }, [searchTerm, selectedYear, selectedType, selectedSeverity]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      case 'Low': return 'outline';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Ransomware': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'Data Breach': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200';
      case 'Nation-State': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Supply Chain': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'DDoS': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'Malware': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'Social Engineering': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6" />
          Historical Cyber Attacks (2015-2024)
        </h1>
        <p className="text-muted-foreground mt-2">
          Comprehensive timeline of major cybersecurity incidents and their global impact
        </p>
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-semibold text-primary">{historicalAttacks.length}</div>
            <p className="text-sm text-muted-foreground">Major Incidents</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-semibold text-destructive">
              {historicalAttacks.filter(a => a.severity === 'Critical').length}
            </div>
            <p className="text-sm text-muted-foreground">Critical Severity</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-semibold text-orange-600">
              {historicalAttacks.filter(a => a.type === 'Ransomware').length}
            </div>
            <p className="text-sm text-muted-foreground">Ransomware Attacks</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-semibold text-purple-600">
              {historicalAttacks.filter(a => a.type === 'Nation-State').length}
            </div>
            <p className="text-sm text-muted-foreground">Nation-State Attacks</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filter Attacks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <Input
              placeholder="Search attacks, targets, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            
            <div className="flex gap-2 flex-wrap">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedSeverity} onValueChange={setSelectedSeverity}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Severity" />
                </SelectTrigger>
                <SelectContent>
                  {severities.map((severity) => (
                    <SelectItem key={severity} value={severity}>
                      {severity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Attack Timeline */}
      <div className="space-y-6">
        {filteredAttacks.sort((a, b) => b.year - a.year).map((attack) => (
          <Card key={attack.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-xl">{attack.name}</CardTitle>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={getSeverityColor(attack.severity) as any}>
                      {attack.severity}
                    </Badge>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(attack.type)}`}>
                      {attack.type}
                    </span>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      {attack.date}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {attack.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Target</h4>
                    <p className="text-sm text-muted-foreground">{attack.target}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-1">Victims Affected</h4>
                    <p className="text-sm text-muted-foreground">{attack.victims}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Estimated Damages</h4>
                    <p className="text-sm text-muted-foreground font-medium text-red-600">
                      {attack.damages}
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold mb-1">Attribution</h4>
                    <p className="text-sm text-muted-foreground">{attack.attribution}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-1">Geographic Impact</h4>
                    <div className="flex flex-wrap gap-1">
                      {attack.geography.map((location) => (
                        <Badge key={location} variant="outline" className="text-xs">
                          {location}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold mb-2">Technical Details</h4>
                  <p className="text-sm text-muted-foreground">
                    {attack.technicalDetails}
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Key Consequences</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {attack.consequences.map((consequence, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <div className="w-1 h-1 bg-muted-foreground rounded-full mt-2 flex-shrink-0" />
                        {consequence}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredAttacks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No attacks found</h3>
            <p className="text-muted-foreground">
              No cyber attacks match your current search criteria. Try adjusting your filters.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}