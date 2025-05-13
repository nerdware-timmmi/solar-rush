export interface Highscore {
  name: string;
  score: number;
  date: string;
}

// Funktion zum Laden der Highscores aus dem localStorage
export function loadHighscores(): Highscore[] {
  try {
    const storedHighscores = localStorage.getItem('highscores');
    if (storedHighscores) {
      return JSON.parse(storedHighscores);
    }
    return [];
  } catch (error) {
    console.error('Fehler beim Laden der Highscores:', error);
    return [];
  }
}

// Funktion zum Speichern der Highscores im localStorage
export function saveHighscore(name: string, score: number): boolean {
  try {
    // Aktuelle Highscores laden
    const highscores = loadHighscores();

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

    // Im localStorage speichern
    localStorage.setItem('highscores', JSON.stringify(topHighscores));

    console.log('Highscore gespeichert:', newHighscore);

    return true;
  } catch (error) {
    console.error('Fehler beim Speichern des Highscores:', error);
    return false;
  }
}

// Funktion zum Prüfen, ob ein Score ein neuer Highscore ist
// Wir erlauben jetzt immer einen Eintrag, auch bei 0 Punkten
export function isNewHighscore(): boolean {
  return true;
}
