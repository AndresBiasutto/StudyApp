export interface unitCard {
  units: (
    | {
        id: number;
        name: string;
        shortDescription: string;
        unitOrder: number;
        chapters: { id: number; name: string; order: number }[];
      }
    | {
        id: number;
        name: string;
        shortDescription: string;
        unitOrder: number;
        chapters?: undefined;
      }
  )[];
}
