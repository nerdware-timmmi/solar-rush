import yaml from 'js-yaml';

export interface Highscore {
  name: string;
  score: number;
  date: string;
}

export interface HighscoreData {
  highscores: Highscore[];
}

// Funktion zum Laden der Highscores
export async function loadHighscores(): Promise<Highscore[]> {
  try {
    const response = await fetch('/highscores.yaml');
    const yamlText = await response.text();
    const data = yaml.load(yamlText) as HighscoreData;
    return data.highscores || [];
  } catch (error) {
    console.error('Fehler beim Laden der Highscores:', error);
    return [];
  }
}

// Funktion zum Speichern der Highscores
export async function saveHighscore(name: string, score: number): Promise<boolean> {
  try {
    // Aktuelle Highscores laden
    const highscores = await loadHighscores();

    // Neuen Highscore hinzufügen
    const newHighscore: Highscore = {
      name,
      score,
      date: new Date().toISOString().split('T')[0] // Format: YYYY-MM-DD
    };

    highscores.push(newHighscore);

    // Nach Punktzahl sortieren (absteigend)
    highscores.sort((a, b) => b.score - a.score);

    // Auf die Top 10 beschränken
    const topHighscores = highscores.slice(0, 10);

    // In YAML konvertieren
    const data: HighscoreData = { highscores: topHighscores };
    const yamlText = yaml.dump(data);

    // Speichern (im Browser-Kontext können wir die Datei nicht direkt schreiben,
    // daher verwenden wir localStorage als Fallback)
    localStorage.setItem('highscores', yamlText);

    // In einer echten Anwendung würde hier ein API-Aufruf zum Speichern der Datei erfolgen
    // Da wir im Frontend sind, simulieren wir nur den Erfolg
    console.log('Highscore gespeichert (simuliert):', newHighscore);

    return true;
  } catch (error) {
    console.error('Fehler beim Speichern des Highscores:', error);
    return false;
  }
}

// Funktion zum Prüfen, ob ein Score ein neuer Highscore ist
export async function isNewHighscore(score: number): Promise<boolean> {
  try {
    const highscores = await loadHighscores();

    // Wenn weniger als 10 Einträge vorhanden sind, ist es automatisch ein Highscore
    if (highscores.length < 10) {
      return true;
    }

    // Sonst prüfen, ob der Score höher ist als der niedrigste Highscore
    const lowestHighscore = highscores[highscores.length - 1];
    return score > lowestHighscore.score;
  } catch (error) {
    console.error('Fehler beim Prüfen des Highscores:', error);
    return false;
  }
}
