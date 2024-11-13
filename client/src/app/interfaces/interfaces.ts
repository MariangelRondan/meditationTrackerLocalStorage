export interface MeditationI {
  id?: string;
  duration: number | undefined;
  type: MeditationType;
  notes: string;
  date: Date | undefined;
}

export enum MeditationType {
  Vipassana = 'Vipassana',
  BodyScan = 'Body scan',
  Compasion = 'Compasión',
  Otro = 'Otro',
}
