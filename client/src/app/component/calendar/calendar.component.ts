import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePipe, NgClass],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  diasMeditados: any | undefined = [];
  selectedMeditation: undefined | any | void = [];

  //Calendar
  currentMonth: Date = new Date();
  daysInMonth!: any;
  selectedDate: Date | undefined | null;

  // Guardar el mes y año actuales
  actualMonth: number = new Date().getMonth();
  actualYear: number = new Date().getFullYear();
  actualDay: number = new Date().getDate();

  //dialog
  isVisible: boolean = true;

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

    const firstDayOfWeek = new Date(year, month, 1).getDay();

    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => ({
      day: daysInPrevMonth - firstDayOfWeek + i + 1,
      monthType: 'prev',
    }));

    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      monthType: 'current',
    }));

    const lastDayOfWeek = new Date(year, month + 1, 0).getDay();

    const nextMonthDays = Array.from({ length: 6 - lastDayOfWeek }, (_, i) => ({
      day: i + 1,
      monthType: 'next',
    }));

    this.daysInMonth = [
      ...prevMonthDays,
      ...currentMonthDays,
      ...nextMonthDays,
    ];
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

  getPrevMonthDays(): number {
    const firstDayOfWeek = new Date(
      this.currentMonth.getFullYear(),
      this.currentMonth.getMonth(),
      1
    ).getDay();
    return firstDayOfWeek;
  }

  // Determina si el día actual pertenece al mes anterior
  isPrevMonthDay(index: number): boolean {
    return index < this.getPrevMonthDays();
  }

  // Determina si el día actual pertenece al mes siguiente
  isNextMonthDay(index: number): boolean {
    const totalDays =
      this.getPrevMonthDays() +
      this.daysInMonth.filter((day: any) => day > 0 && day <= 31).length;
    return index >= totalDays;
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

  toggleModal(boolean: boolean) {
    this.isVisible = boolean;
  }
}
