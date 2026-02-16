import { Activity, AlertTriangle, Shield, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { virusDatabase } from '../data/virusDatabase';

export function ThreatStats() {
  const totalThreats = virusDatabase.length;
  const criticalThreats = virusDatabase.filter(v => v.severity === 'Critical').length;
  const highThreats = virusDatabase.filter(v => v.severity === 'High').length;
  const recentThreats = virusDatabase.filter(v => 
    new Date(v.discoveryDate) >= new Date('2020-01-01')
  ).length;

  const stats = [
    {
      title: "Total Threats",
      value: totalThreats.toString(),
      description: "In our database",
      icon: Shield,
      color: "text-blue-600"
    },
    {
      title: "Critical Threats",
      value: criticalThreats.toString(),
      description: "Requiring immediate attention",
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      title: "High Risk",
      value: highThreats.toString(),
      description: "High severity threats",
      icon: Activity,
      color: "text-orange-600"
    },
    {
      title: "Recent Threats",
      value: recentThreats.toString(),
      description: "Discovered since 2020",
      icon: TrendingUp,
      color: "text-green-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}