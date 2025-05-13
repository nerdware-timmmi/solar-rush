# Solar Rush

Solar Rush is a game that simulates energy collection from renewable sources, obstacle management, and team coordination.

## Backend Options

This project offers two backend options:

1. Cloud Server
   - Runs on port 3001
   - Generates random numbers between -50 and 0

2. Sun Server
   - Runs on port 3000
   - Generates random numbers between 0 and 50
   - Provides status information (night, cloudy, sunny)

## Docker Installation on Mac

### Prerequisites

To install Docker on a Mac, you need:
- macOS 10.15 or newer
- At least 4 GB RAM
- Apple ID for downloading from the Mac App Store

### Installing Docker Desktop

1. Visit the [Docker Desktop for Mac download page](https://www.docker.com/products/docker-desktop)
2. Click on "Download for Mac"
3. Open the downloaded .dmg file
4. Drag the Docker icon to your Applications folder
5. Open Docker from the Applications folder
6. When prompted, enter your administrator password
7. Wait until Docker Desktop has started (the Docker icon in the menu bar stops blinking)

### Verifying the Installation

Open a terminal and run the following commands to verify that Docker has been installed correctly:

```bash
docker --version
docker-compose --version
```

## Starting the Backend Servers with Docker Compose

1. Open a terminal
2. Navigate to the project directory:
   ```bash
   cd /path/to/solar-rush/games/group_five
   ```
3. Start the Docker containers in the background:
   ```bash
   docker-compose up -d
   ```
4. Check if the containers are running:
   ```bash
   docker-compose ps
   ```

## Accessing the Backend APIs

After starting the containers, you can access the backend APIs:

- Cloud Backend: http://localhost:3001
- Sun Backend: http://localhost:3002

## Stopping the Backend Servers

To stop the Docker containers, run the following command:

```bash
docker-compose down
```

## Viewing Logs

To view the logs of the running containers:

```bash
docker-compose logs
```

For continuous logs:

```bash
docker-compose logs -f
```

## Restarting the Containers

To restart the containers:

```bash
docker-compose restart
