import { BookOpen, Shield, Users, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

export function CyberAwareness() {
  const awarenessTips = [
    {
      title: "Email Security Best Practices",
      description: "Learn how to identify and avoid phishing attacks, malicious attachments, and social engineering attempts.",
      icon: "📧",
      category: "Email Security",
      tips: [
        "Always verify sender authenticity",
        "Don't click suspicious links",
        "Check URLs before entering credentials",
        "Be wary of urgent or threatening language"
      ]
    },
    {
      title: "Password Security",
      description: "Strong password practices are your first line of defense against unauthorized access.",
      icon: "🔐",
      category: "Authentication",
      tips: [
        "Use unique passwords for each account",
        "Enable two-factor authentication",
        "Use a password manager",
        "Regularly update passwords"
      ]
    },
    {
      title: "Software Updates",
      description: "Keeping your software updated is crucial for maintaining security and preventing exploits.",
      icon: "⬆️",
      category: "System Security",
      tips: [
        "Enable automatic updates",
        "Update operating systems regularly",
        "Keep browsers up to date",
        "Update security software daily"
      ]
    },
    {
      title: "Safe Browsing Habits",
      description: "Practice safe browsing to avoid malicious websites and drive-by downloads.",
      icon: "🌐",
      category: "Web Security",
      tips: [
        "Avoid suspicious websites",
        "Don't download from untrusted sources",
        "Use reputable browsers with security features",
        "Be cautious with public Wi-Fi"
      ]
    }
  ];

  const securityNews = [
    {
      title: "New Ransomware Targeting Healthcare",
      description: "Recent attacks on healthcare institutions using advanced encryption techniques.",
      date: "2024-01-15",
      severity: "High"
    },
    {
      title: "Zero-Day Exploit in Popular Software",
      description: "Critical vulnerability discovered in widely-used enterprise software.",
      date: "2024-01-12",
      severity: "Critical"
    },
    {
      title: "Phishing Campaign Targets Financial Sector",
      description: "Sophisticated phishing emails targeting banking customers worldwide.",
      date: "2024-01-10",
      severity: "Medium"
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Critical': return 'destructive';
      case 'High': return 'secondary';
      case 'Medium': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Cybersecurity Awareness
          </CardTitle>
          <CardDescription>
            Stay informed with the latest security best practices and threat awareness
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Security Tips Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {awarenessTips.map((tip, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{tip.icon}</span>
                <div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                  <Badge variant="outline" className="mt-1">
                    {tip.category}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {tip.description}
              </p>
              <ul className="space-y-2">
                {tip.tips.map((tipItem, tipIndex) => (
                  <li key={tipIndex} className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                    {tipItem}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Security News */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Latest Security Alerts
          </CardTitle>
          <CardDescription>
            Recent cybersecurity incidents and advisories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityNews.map((news, index) => (
              <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{news.title}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{news.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(news.date).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant={getSeverityColor(news.severity) as any}>
                  {news.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Security Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Daily Security Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "Check for software updates",
              "Review unusual login attempts",
              "Verify recent transactions",
              "Backup important data",
              "Check antivirus status",
              "Review email security"
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}