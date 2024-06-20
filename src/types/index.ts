export interface Hero {
  name?: string;
  films?: number[];
  id?: number;
  starships?: number[];
}

export interface IFilm {
  id: number;
  title: string;
  starships: number[];
}

export interface IStarship {
  name: string;
  id: number;
}
