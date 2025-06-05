import { Component } from '@angular/core';
import { CalendarComponent } from '../../view/calendar/calendar.component';

@Component({
  selector: 'app-meditation',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './meditation.component.html',
  styleUrl: './meditation.component.css',
})
export class MeditationComponent {
  showAnimation: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.showAnimation = false;
    }, 3000);
  }
}
