export interface MeditationI {
  _id?: string;
  duration: number;
  type: MeditationType;
  notes: string;
  date: Date | number;
}

export enum MeditationType {
  Vipassana = 'Vipassana',
  BodyScan = 'Body scan',
  Compasion = 'Compasión',
  Otro = 'Otro',
}
