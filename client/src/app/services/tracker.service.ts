import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrackerService {
  API_URL = 'http://localhost:3000/tracker';

  constructor(private http: HttpClient) {}

  dayUpdate(dayData: any) {
    console.log(dayData);
    return this.http.post<any>(this.API_URL, dayData);
  }

  getAllTrack() {
    return this.http.get<any>(this.API_URL);
  }
}
