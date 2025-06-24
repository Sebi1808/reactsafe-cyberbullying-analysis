# ReactSafe - Cyberbullying Analysis & Response System

## Übersicht

ReactSafe ist ein KI-gestütztes System zur wissenschaftlichen Analyse von Cybermobbing-Kommentaren mit tiefgreifender linguistischer Bewertung auf 6 Ebenen und strategischen Antwortempfehlungen.

## Funktionen

✓ **Tiefe Linguistische Analyse** - Wissenschaftliche Analyse auf 6 Ebenen:
  - Pragmatische Ebene (Austin/Searle/Grice)
  - Semantische Tiefenanalyse
  - Syntaktische Machtstrukturen
  - Diskurslinguistische Strategien
  - Psycholinguistische Wirkung
  - Soziolinguistische Dimensionen

✓ **KI-Modell** - GPT-4o für professionelle Sprachanalyse

✓ **Strategien-System** - 8 wissenschaftlich fundierte Kommunikationsstrategien

✓ **Quick Scan** - Sofortige Risikoanalyse

✓ **Database Integration** - PostgreSQL mit persistenter Datenspeicherung

✓ **Apple-Style Design** - Moderne, responsive Benutzeroberfläche

## Technologie-Stack

### Frontend
- React 18 + TypeScript
- Vite + Tailwind CSS
- shadcn/ui Komponenten
- TanStack Query
- Wouter Routing

### Backend
- Node.js + Express
- PostgreSQL (Neon)
- Drizzle ORM
- OpenAI GPT-4o

## Installation & Setup

1. **Repository klonen**
```bash
git clone <repository-url>
cd reactsafe
```

2. **Dependencies installieren**
```bash
npm install
```

3. **Umgebungsvariablen konfigurieren**
```bash
# Benötigt:
DATABASE_URL=<neon-database-url>
OPENAI_API_KEY=<openai-api-key>

# Optional für Benutzeranmeldung:
SESSION_SECRET=<random-secret>
REPL_ID=<replit-app-id>
REPLIT_DOMAINS=<your-domain>
```

4. **Datenbank initialisieren**
```bash
npm run db:push
```

5. **Entwicklungsserver starten**
```bash
npm run dev
```

## Verwendung

### Analyse durchführen
1. Kommentar in das Eingabefeld eingeben
2. Modus wählen (Manual/Autopilot)
3. Analyse starten
4. Ergebnisse und Strategieempfehlungen prüfen
5. KI-Antworten generieren lassen

### Quick Scan
- Sofortige Risikoanalyse ohne detaillierte Konfiguration
- Ideal für schnelle Bewertungen

### Strategien-Bibliothek
- 8 wissenschaftlich fundierte Kommunikationsstrategien
- Detaillierte Vor-/Nachteile für jede Strategie
- Risikoeinschätzung pro Strategie

## User Management

**Aktueller Status**: Demo-Modus ohne Benutzeranmeldung

**Für Produktiveinsatz**:
1. Replit Auth konfigurieren
2. SESSION_SECRET und REPL_ID in Umgebungsvariablen setzen
3. Auth-Routen in `server/routes-auth.ts` aktivieren
4. User-spezifische Funktionen freischalten

## Wissenschaftliche Grundlagen

Die linguistische Analyse basiert auf etablierten sprachwissenschaftlichen Theorien:

- **Sprechakt-Theorie** (Austin, Searle)
- **Grice'sche Maximen** (Kommunikationsprinzipien)
- **Höflichkeitstheorie** (Brown/Levinson)
- **Critical Discourse Analysis** (van Dijk, Fairclough)
- **Konzeptuelle Metaphern-Theorie** (Lakoff/Johnson)
- **Frame-Semantik** (Fillmore)

## API-Endpunkte

### Analyse
- `POST /api/analyze` - Kommentar analysieren
- `GET /api/strategies` - Verfügbare Strategien abrufen
- `POST /api/generate-response` - KI-Antwort generieren

### Authentication (deaktiviert)
- `GET /api/auth/user` - Benutzerprofil
- `GET /api/login` - Anmeldung starten
- `GET /api/logout` - Abmeldung

## Deployment

Das System ist für Replit Deployments optimiert:

1. Environment Variables konfigurieren
2. Deploy-Button in Replit klicken
3. Automatisches Build und Hosting

## Lizenz

Dieses Projekt ist für Bildungs- und Forschungszwecke entwickelt.

## Support

Bei Fragen zur Konfiguration oder Verwendung wenden Sie sich an das Entwicklungsteam.