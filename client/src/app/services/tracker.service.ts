import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MeditationI } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class TrackerService {
  constructor(private http: HttpClient) {}
  newMeditation(dayData: any) {
    dayData.id =
      Date.now().toString() + Math.random().toString(36).substring(2);

    const myMeditations: MeditationI[] = JSON.parse(
      localStorage.getItem('Meditations') || '[]'
    );
    myMeditations.push(dayData);
    localStorage.setItem('Meditations', JSON.stringify(myMeditations));
  }

  getAllTrack() {
    return JSON.parse(localStorage.getItem('Meditations') || '[]');
  }

  updateMeditation(id: string, updateData: Partial<MeditationI>) {
    const myMeditations: MeditationI[] = JSON.parse(
      localStorage.getItem('Meditations') || '[]'
    );

    const index = myMeditations.findIndex((meditation) => meditation.id === id);
    if (index !== -1) {
      myMeditations[index] = { ...myMeditations[index], ...updateData };
      localStorage.setItem('Meditations', JSON.stringify(myMeditations));
    }
  }

  deleteMeditation(id: string) {
    const myMeditations: MeditationI[] = JSON.parse(
      localStorage.getItem('Meditations') || '[]'
    );

    const updatedMeditations = myMeditations.filter(
      (meditation) => meditation.id !== id
    );

    localStorage.setItem('Meditations', JSON.stringify(updatedMeditations));
  }
}
