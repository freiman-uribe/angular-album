export interface Tracks {
  name: string;
  duration: number;
  id: number;
}

export interface Comment {
  description: string;
  rating: number;
  collector: { id: number };
}

export interface Album {
  id: number;
  name: string;
  cover: string;
  releaseDate: string;
  description: string;
  genre: 'Classical' | 'Salsa' | 'Rock' | 'Folk';
  recordLabel: 'Sony Music' | 'Discos Fuentes' | 'Elektra' | 'Fania Records';
  comments: Comment[];
  tracks: Tracks[];
}
