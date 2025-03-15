import { DatePipe, NgClass } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TrackerService } from '../../services/tracker.service';
import { MeditationI, MeditationType } from '../../interfaces/interfaces';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [DatePipe, NgClass, FormsModule, ToastModule],
  providers: [MessageService],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent implements OnInit {
  diasMeditados: Set<string> = new Set();
  selectedMeditation: undefined | any | void = [];
  myTracking: MeditationI[] = [];
  openEditDeleteSelect = false;
  editMode = false;
  editingMeditationId: string | undefined = undefined;
  //Calendar
  currentMonth: Date = new Date();
  daysInMonth!: any;

  // Guardar el mes y año actuales
  actualMonth: number = new Date().getMonth();
  actualYear: number = new Date().getFullYear();
  actualDay: number = new Date().getDate();
  selectedDate: any;

  //dialog
  isVisible: boolean = false;

  meditation: MeditationI = {
    duration: undefined,
    type: MeditationType.Vipassana,
    notes: '',
    date: undefined,
  };

  constructor(
    private cdr: ChangeDetectorRef,
    private trackerService: TrackerService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.updateDaysInMonth();
    this.getTracking();
  }

  getTracking() {
    this.myTracking = this.trackerService.getAllTrack();
    this.selectDate({ day: this.actualDay, monthType: 'current' });
    this.initializePaseoDates();
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

    // Días del mes anterior
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const prevMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => ({
      day: daysInPrevMonth - firstDayOfWeek + i + 1,
      monthType: 'prev',
    }));

    // Días del mes actual
    const currentMonthDays = Array.from({ length: daysInMonth }, (_, i) => ({
      day: i + 1,
      monthType: 'current',
    }));

    const lastDayOfWeek = new Date(year, month + 1, 0).getDay();

    // Días del mes siguiente
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
    this.selectedDate = undefined;
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

  initializePaseoDates(): void {
    this.diasMeditados.clear();
    this.myTracking?.forEach((update: MeditationI) => {
      console.log('Meditation', update);
      // Convertir fecha ISO a formato 'yyyy-MM-dd'
      if (update.date) {
        const formattedDate = new Date(update.date).toISOString().split('T')[0];
        this.diasMeditados.add(formattedDate);
      }
    });
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

  selectDate(dayInfo: any) {
    if (dayInfo.monthType === 'prev') {
      // Si es del mes anterior
      this.previousMonth();
      this.selectedDate = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth(),
        dayInfo.day
      );
    } else if (dayInfo.monthType === 'next') {
      // Si es del mes siguiente
      this.nextMonth();
      this.selectedDate = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth(),
        dayInfo.day
      );
    } else {
      // Si es del mes actual
      this.selectedDate = new Date(
        this.currentMonth.getFullYear(),
        this.currentMonth.getMonth(),
        dayInfo.day
      );
      this.meditation.date = this.selectedDate;
    }

    const selectedDateStr = JSON.stringify(this.selectedDate).split('T')[0];
    this.selectedMeditation = this.myTracking?.filter((update: any) => {
      const itemDateStr = JSON.stringify(new Date(update.date)).split('T')[0]; // 'yyyy-MM-dd'
      return itemDateStr === selectedDateStr;
    });
  }

  toggleModal(isVisible: boolean, data?: any) {
    this.isVisible = isVisible;
    this.openEditDeleteSelect = false;
    if (data) {
      this.editMode = true;
      this.meditation = data;
    }
  }

  toggleEdit(id: string): void {
    this.editMode = true;
    this.openEditDeleteSelect = true;
    if (this.editingMeditationId === id) {
      this.editingMeditationId = undefined;
    } else {
      this.editingMeditationId = id;
    }
  }

  onSubmit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (this.editMode) {
      this.trackerService.updateMeditation(
        this.meditation.id as string,
        this.meditation
      );
      this.messageService.add({
        severity: 'success',
        summary: '✨ Actualización exitosa ✨',
        detail: 'Respira profundo y sigue el día.',
      });
    } else {
      this.trackerService.newMeditation(this.meditation);
      this.messageService.add({
        severity: 'success',
        summary: 'Gracias por cuidar de ti 🧘‍♀️',
        detail: 'Tu espacio de tranquilidad de hoy está guardado.',
      });
    }

    this.getTracking();
    this.toggleModal(false);
    this.editMode = false;
    this.meditation = {
      duration: undefined,
      type: MeditationType.Vipassana,
      notes: '',
      date: undefined,
    };
  }

  deleteMeditation(id: string) {
    this.trackerService.deleteMeditation(id);
    this.messageService.add({
      severity: 'success',
      summary: '🌬️ Meditación eliminada',
      detail:
        'Ese momento ha sido liberado. Pronto vendrán más espacios de paz.',
    });
    this.getTracking();
  }
}
