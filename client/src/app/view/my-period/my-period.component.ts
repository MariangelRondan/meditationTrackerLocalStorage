import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';

@Component({
  selector: 'app-my-period',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './my-period.component.html',
  styleUrl: './my-period.component.css',
})
export class MyPeriodComponent {}
