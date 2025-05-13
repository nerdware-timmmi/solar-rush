# Solar Rush

Solar Rush ist ein Spiel, das Energiesammlung aus erneuerbaren Quellen, Hindernismanagement und Teamkoordination simuliert.

## Backend-Optionen

Dieses Projekt bietet zwei Backend-Optionen:

1. Cloud-Server
   - Läuft auf Port 3001
   - Generiert Zufallszahlen zwischen -50 und 0

2. Sun-Server
   - Läuft auf Port 3000
   - Generiert Zufallszahlen zwischen 0 und 50
   - Bietet Status-Informationen (night, cloudy, sunny)

## Docker-Installation auf Mac

### Voraussetzungen

Um Docker auf einem Mac zu installieren, benötigen Sie:
- macOS 10.15 oder neuer
- Mindestens 4 GB RAM
- Apple ID für den Download aus dem Mac App Store

### Installation von Docker Desktop

1. Besuchen Sie die [Docker Desktop für Mac-Downloadseite](https://www.docker.com/products/docker-desktop)
2. Klicken Sie auf "Download for Mac"
3. Öffnen Sie die heruntergeladene .dmg-Datei
4. Ziehen Sie das Docker-Symbol in Ihren Applications-Ordner
5. Öffnen Sie Docker aus dem Applications-Ordner
6. Wenn Sie dazu aufgefordert werden, geben Sie Ihr Administrator-Passwort ein
7. Warten Sie, bis Docker Desktop gestartet ist (das Docker-Symbol in der Menüleiste hört auf zu blinken)

### Überprüfen der Installation

Öffnen Sie ein Terminal und führen Sie folgende Befehle aus, um zu überprüfen, ob Docker korrekt installiert wurde:

```bash
docker --version
docker-compose --version
```

## Starten der Backend-Server mit Docker Compose

1. Öffnen Sie ein Terminal
2. Navigieren Sie zum Projektverzeichnis:
   ```bash
   cd /pfad/zum/solar-rush/games/group_five
   ```
3. Starten Sie die Docker-Container im Hintergrund:
   ```bash
   docker-compose up -d
   ```
4. Überprüfen Sie, ob die Container laufen:
   ```bash
   docker-compose ps
   ```

## Zugriff auf die Backend-APIs

Nach dem Start der Container können Sie auf die Backend-APIs zugreifen:

- Cloud Backend: http://localhost:3001
- Sun Backend: http://localhost:3002

## Stoppen der Backend-Server

Um die Docker-Container zu stoppen, führen Sie folgenden Befehl aus:

```bash
docker-compose down
```

## Logs anzeigen

Um die Logs der laufenden Container anzuzeigen:

```bash
docker-compose logs
```

Für kontinuierliche Logs:

```bash
docker-compose logs -f
```

## Neustart der Container

Um die Container neu zu starten:

```bash
docker-compose restart
```
