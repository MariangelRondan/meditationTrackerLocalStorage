import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  diasMeditados: any | undefined = [];
  selectedMeditation: undefined | any | void = [];

  //Calendar
  currentMonth: Date = new Date();
  daysInMonth!: number[];
  selectedDate: Date | undefined | null;

  // Guardar el mes y año actuales
  actualMonth: number = new Date().getMonth();
  actualYear: number = new Date().getFullYear();
  actualDay: number = new Date().getDate();

  constructor(private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.updateDaysInMonth();
  }

  isCurrentMonth(): boolean {
    return (
      this.currentMonth.getMonth() === this.actualMonth &&
      this.currentMonth.getFullYear() === this.actualYear
    );
  }

  isCurrentDay(day: any): boolean {
    return (
      day === this.actualDay &&
      this.currentMonth.getMonth() === this.actualMonth &&
      this.currentMonth.getFullYear() === this.actualYear
    );
  }

  updateDaysInMonth() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  }

  previousMonth() {
    this.selectedDate = null;
    const newDate = new Date(this.currentMonth);
    newDate.setMonth(newDate.getMonth() - 1);
    this.currentMonth = newDate;
    this.updateDaysInMonth();
    this.cdr.detectChanges();
  }

  nextMonth() {
    this.selectedDate = null;
    const newDate = new Date(this.currentMonth);
    newDate.setMonth(newDate.getMonth() + 1);
    this.currentMonth = newDate;
    this.updateDaysInMonth();
    this.cdr.detectChanges();
  }

  isPaseoDay(day: number): boolean {
    const date = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      day
    );
    const formattedDate = date.toISOString().split('T')[0];
    return this.diasMeditados.has(formattedDate);
  }
}
