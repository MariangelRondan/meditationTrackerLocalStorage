import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrackerService {
  API_URL = 'http://localhost:3000/tracker';

  constructor(private http: HttpClient) {}

  newMeditation(dayData: any) {
    return this.http.post<any>(this.API_URL, dayData);
  }

  getAllTrack() {
    return this.http.get<any>(this.API_URL);
  }

  updateMeditation(id: string, updateData: any) {
    return this.http.put<any>(`${this.API_URL}/${id}`, updateData);
  }

  deleteMeditation(id: string) {
    return this.http.delete<any>(`${this.API_URL}/${id}`);
  }
}
