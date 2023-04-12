export function transposeLyrics(lyrics, semitones) {
const noteMap = {
  C: 0,
  "C#": 1,
  D: 2,
  "D#": 3,
  E: 4,
  F: 5,
  "F#": 6,
  G: 7,
  "G#": 8,
  A: 9,
  "A#": 10,
  B: 11,
};
  
      const transposeNote = (note, semitones) => {
        const noteValue = noteMap[note.toUpperCase()];
        const transposedValue = (noteValue + semitones + 12) % 12;
        const transposedNote = Object.keys(noteMap).find((key) => noteMap[key] === transposedValue);
        return note[0] === note[0].toUpperCase() ? transposedNote : transposedNote.toLowerCase();
      };
  
      const transposeLine = (line, semitones) => {
        return line.replace(/([a-gA-G]#?)/g, (note) => transposeNote(note, semitones));
      };
  
    return lyrics.map((item) => {
      const newLine = transposeLine(item[1], semitones);
      return [item[0], newLine];
    });
  }