# Build-Stufe
FROM node:20-alpine AS builder

# Arbeitsverzeichnis setzen
WORKDIR /app

# Abhängigkeiten kopieren und installieren
COPY package.json package-lock.json* pnpm-lock.yaml* ./
RUN npm ci || yarn install --frozen-lockfile || pnpm install --frozen-lockfile

# Quellcode kopieren
COPY . .

# Anwendung bauen
RUN npm run build

# Produktions-Stufe
FROM node:20-alpine AS runner

# Arbeitsverzeichnis setzen
WORKDIR /app

# Umgebungsvariablen setzen
ENV NODE_ENV production

# Nicht-Root-Benutzer erstellen
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Nur die notwendigen Dateien aus der Build-Stufe kopieren
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Benutzerrechte setzen
RUN chown -R nextjs:nodejs /app
USER nextjs

# Port freigeben
EXPOSE 3000

# Healthcheck konfigurieren
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/ || exit 1

# Anwendung starten
CMD ["node", "server.js"]
