import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings, Bell, Shield, Database, Palette, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [autoAnalysis, setAutoAnalysis] = useState(false);
  const [dataRetention, setDataRetention] = useState("30");
  const [language, setLanguage] = useState("de");
  const [theme, setTheme] = useState("light");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Einstellungen gespeichert",
      description: "Ihre Einstellungen wurden erfolgreich aktualisiert.",
    });
  };

  const settingsSections = [
    {
      title: "Benutzereinstellungen",
      icon: User,
      items: [
        {
          type: "input",
          label: "Name",
          value: "Max Mustermann",
          placeholder: "Ihr Name"
        },
        {
          type: "input",
          label: "E-Mail",
          value: "max@example.com",
          placeholder: "ihre.email@beispiel.de"
        },
        {
          type: "select",
          label: "Sprache",
          value: language,
          onChange: setLanguage,
          options: [
            { value: "de", label: "Deutsch" },
            { value: "en", label: "English" },
            { value: "fr", label: "Français" }
          ]
        }
      ]
    },
    {
      title: "Benachrichtigungen",
      icon: Bell,
      items: [
        {
          type: "switch",
          label: "Push-Benachrichtigungen aktivieren",
          description: "Erhalten Sie Benachrichtigungen über wichtige Ereignisse",
          checked: notifications,
          onChange: setNotifications
        },
        {
          type: "switch",
          label: "E-Mail-Benachrichtigungen",
          description: "Wöchentliche Zusammenfassung per E-Mail erhalten",
          checked: false,
          onChange: () => {}
        }
      ]
    },
    {
      title: "Analyse-Einstellungen",
      icon: Shield,
      items: [
        {
          type: "switch",
          label: "Automatische Analyse",
          description: "Kommentare automatisch beim Einfügen analysieren",
          checked: autoAnalysis,
          onChange: setAutoAnalysis
        },
        {
          type: "select",
          label: "Standard-Modus",
          value: "autopilot",
          options: [
            { value: "autopilot", label: "Autopilot" },
            { value: "manual", label: "Manuell" }
          ]
        }
      ]
    },
    {
      title: "Datenschutz & Sicherheit",
      icon: Database,
      items: [
        {
          type: "select",
          label: "Daten-Aufbewahrung",
          description: "Wie lange sollen Ihre Analysen gespeichert werden?",
          value: dataRetention,
          onChange: setDataRetention,
          options: [
            { value: "7", label: "7 Tage" },
            { value: "30", label: "30 Tage" },
            { value: "90", label: "90 Tage" },
            { value: "365", label: "1 Jahr" }
          ]
        },
        {
          type: "switch",
          label: "Anonyme Datenverwendung",
          description: "Helfen Sie uns, ReactSafe zu verbessern",
          checked: true,
          onChange: () => {}
        }
      ]
    },
    {
      title: "Darstellung",
      icon: Palette,
      items: [
        {
          type: "select",
          label: "Theme",
          value: theme,
          onChange: setTheme,
          options: [
            { value: "light", label: "Hell" },
            { value: "dark", label: "Dunkel" },
            { value: "auto", label: "System" }
          ]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#4B0F2E' }}>
            Einstellungen
          </h1>
          <p className="text-gray-600">
            Passen Sie ReactSafe an Ihre Bedürfnisse an
          </p>
        </div>

        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <Card key={sectionIndex} className="shadow-apple">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: '#C0E8D5' }}
                  >
                    <section.icon className="w-5 h-5" style={{ color: '#4B0F2E' }} />
                  </div>
                  {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-2">
                    {item.type === 'input' && (
                      <>
                        <Label htmlFor={`${sectionIndex}-${itemIndex}`}>{item.label}</Label>
                        <Input
                          id={`${sectionIndex}-${itemIndex}`}
                          defaultValue={item.value}
                          placeholder={item.placeholder}
                        />
                      </>
                    )}
                    
                    {item.type === 'switch' && (
                      <div className="flex items-center justify-between py-2">
                        <div className="space-y-1">
                          <Label>{item.label}</Label>
                          {item.description && (
                            <p className="text-sm text-gray-600">{item.description}</p>
                          )}
                        </div>
                        <Switch
                          checked={item.checked}
                          onCheckedChange={item.onChange}
                        />
                      </div>
                    )}
                    
                    {item.type === 'select' && (
                      <>
                        <Label>{item.label}</Label>
                        {item.description && (
                          <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                        )}
                        <Select value={item.value} onValueChange={item.onChange}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {item.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          {/* Danger Zone */}
          <Card className="shadow-apple border-red-200">
            <CardHeader>
              <CardTitle className="text-red-700">Gefahrenbereich</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label className="text-red-700">Alle Daten löschen</Label>
                  <p className="text-sm text-gray-600">
                    Löscht permanent alle Ihre Analysen und Einstellungen
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Daten löschen
                </Button>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <Label className="text-red-700">Konto deaktivieren</Label>
                  <p className="text-sm text-gray-600">
                    Deaktiviert Ihr Konto und alle Funktionen
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  Konto deaktivieren
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button 
              onClick={handleSave}
              className="text-white px-8"
              style={{ background: 'linear-gradient(135deg, #9C2C63 0%, #78C2AD 100%)' }}
            >
              Einstellungen speichern
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}