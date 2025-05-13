# Solar Rush Frontend

Dieses Repository enthält das Frontend für das Solar Rush Spiel, entwickelt mit Next.js, React und TypeScript.

## Inhaltsverzeichnis

- [Voraussetzungen](#voraussetzungen)
- [Installation und Start mit Docker](#installation-und-start-mit-docker)
- [Entwicklung](#entwicklung)
- [Nützliche Befehle](#nützliche-befehle)
- [Projektstruktur](#projektstruktur)

## Voraussetzungen

Um das Projekt lokal auszuführen, benötigst du:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/) (in neueren Docker-Versionen bereits enthalten)

## Installation und Start mit Docker

1. Repository klonen:
   ```bash
   git clone <repository-url>
   cd solar-rush
   ```

2. Docker-Container starten:
   ```bash
   docker-compose up -d
   ```

3. Die Anwendung ist nun unter [http://localhost:3000](http://localhost:3000) verfügbar.

## Entwicklung

Für die Entwicklung empfehlen wir, die Anwendung direkt auf deinem lokalen System zu starten:

1. In das Frontend-Verzeichnis wechseln:
   ```bash
   cd frontend
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   # oder
   yarn install
   # oder
   pnpm install
   ```

3. Entwicklungsserver starten:
   ```bash
   npm run dev
   # oder
   yarn dev
   # oder
   pnpm dev
   ```

4. Die Anwendung ist nun unter [http://localhost:3000](http://localhost:3000) verfügbar.

Alternativ kannst du auch eine Entwicklungsumgebung mit Docker verwenden. Dazu musst du die auskommentierten Zeilen in der `docker-compose.yml` aktivieren und dann folgenden Befehl ausführen:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

## Nützliche Befehle

### Docker-Befehle

- Container starten: `docker-compose up -d`
- Container stoppen: `docker-compose down`
- Logs anzeigen: `docker-compose logs -f frontend`
- Container neu bauen: `docker-compose build --no-cache frontend`
- In den Container einsteigen: `docker-compose exec frontend sh`

### NPM/Yarn/PNPM-Befehle (lokal)

- Entwicklungsserver starten: `npm run dev`
- Produktions-Build erstellen: `npm run build`
- Produktionsversion starten: `npm run start`
- Linting durchführen: `npm run lint`

## Projektstruktur

Das Projekt verwendet die standardmäßige Next.js-Struktur:

- `app/`: Enthält die Seiten und Layouts der Anwendung (App Router)
- `components/`: Wiederverwendbare React-Komponenten
- `public/`: Statische Dateien wie Bilder, Sounds und Fonts
- `styles/`: CSS-Dateien und Styling-Konfigurationen
- `services/`: Service-Klassen für externe API-Aufrufe
- `context/`: React Context für globalen Zustand

## Docker-Konfiguration

Das Projekt enthält zwei Docker-Konfigurationsdateien:

1. `frontend/Dockerfile`: Für die Produktionsumgebung
   - Verwendet einen mehrstufigen Build-Prozess
   - Optimiert für Produktionsleistung und Sicherheit

2. `docker-compose.yml`: Orchestriert die Container
   - Definiert den Frontend-Service
   - Konfiguriert Netzwerke und Volumes
   - Enthält auskommentierte Entwicklungskonfiguration

## Lizenz

[Hier Lizenzinformationen einfügen]
