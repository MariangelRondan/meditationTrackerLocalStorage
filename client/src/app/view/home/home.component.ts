import { Component } from '@angular/core';
import { CalendarComponent } from '../../component/calendar/calendar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CalendarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  showAnimation: boolean = true;

  ngOnInit() {
    setTimeout(() => {
      this.showAnimation = false;
    }, 3000);
  }
}
