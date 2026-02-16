import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Users, Shield, Award, Globe } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    category: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    toast.success('Thank you for your message! Our team will get back to you within 24 hours.');
    setFormData({
      name: '',
      email: '',
      organization: '',
      subject: '',
      category: '',
      message: ''
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Security Officer",
      expertise: "Malware Analysis, Threat Intelligence",
      email: "s.chen@cybershield.com"
    },
    {
      name: "Marcus Rodriguez",
      role: "Lead Threat Researcher",
      expertise: "APT Analysis, Incident Response",
      email: "m.rodriguez@cybershield.com"
    },
    {
      name: "Elena Petrov",
      role: "Vulnerability Analyst",
      expertise: "Zero-day Research, Exploit Analysis",
      email: "e.petrov@cybershield.com"
    }
  ];

  const services = [
    {
      title: "Threat Intelligence Consultation",
      description: "Expert analysis of your organization's threat landscape",
      icon: Shield
    },
    {
      title: "Incident Response",
      description: "24/7 emergency response for security incidents",
      icon: Award
    },
    {
      title: "Security Training",
      description: "Customized cybersecurity awareness programs",
      icon: Users
    },
    {
      title: "Malware Analysis",
      description: "Deep technical analysis of suspicious files",
      icon: Globe
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold flex items-center justify-center gap-2">
          <Mail className="h-6 w-6" />
          Contact Us
        </h1>
        <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
          Feel Free to Ask Anything Anytime!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message!</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                    placeholder="Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    placeholder="xyz@email.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">Phone Number</Label>
                <Input
                  id="Phone Number"
                  value={formData.organization}
                  onChange={(e) => handleInputChange('organization', e.target.value)}
                  placeholder="Phone Number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Inquiry Category</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="threat-intel">Threat Intelligence</SelectItem>
                    <SelectItem value="incident-response">Incident Response</SelectItem>
                    <SelectItem value="malware-analysis">Malware Analysis</SelectItem>
                    <SelectItem value="training">Security Training</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  required
                  placeholder="Brief description of your inquiry"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  required
                  placeholder="Please provide details about your security concerns or requirements..."
                  rows={6}
                />
              </div>

              <Button type="submit" className="w-full">
                <Send className="h-4 w-4 mr-2" />
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Contact Details */}
          <Card>
            <CardHeader>
              <CardTitle>Get in Touch</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">poojaravindran23cys@srishakthi.ac.in,praveenb23cys@srishakthi.ac.in</p>
                  <p className="text-sm text-muted-foreground">poojanairrv23cys@srishakthi.ac.in,yokesh23cys@srishakthi.ac.in</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="font-medium">Siet College</p>
                  <p className="text-sm text-muted-foreground">
                    L and T bypass<br />
                    CBE - 62
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Our Services</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{service.title}</h4>
                      <p className="text-xs text-muted-foreground">{service.description}</p>
                    </div>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}