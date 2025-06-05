import { Component } from '@angular/core';
import { CalendarComponent } from '../../components/calendar/calendar.component';
import { FormsModule } from '@angular/forms';
import { MeditationI, MeditationType } from '../../interfaces/interfaces';
import { MessageService } from 'primeng/api';
import { TrackerService } from '../../services/tracker.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-meditation',
  standalone: true,
  imports: [CalendarComponent, FormsModule, NgClass],
  templateUrl: './meditation.component.html',
  styleUrl: './meditation.component.css',
})
export class MeditationComponent {
  showAnimation: boolean = true;
  isVisible: boolean = false;
  meditation: MeditationI = {
    duration: undefined,
    type: MeditationType.Vipassana,
    notes: '',
    date: undefined,
  };

  constructor(
    private messageService: MessageService,
    private trackerService: TrackerService
  ) {}
  ngOnInit() {
    setTimeout(() => {
      this.showAnimation = false;
    }, 3000);
  }

  toggleModal(isVisible: boolean, data?: any) {
    this.isVisible = isVisible;
    // this.openEditDeleteSelect = false;
    // if (data) {
    //   this.editMode = true;
    //   this.meditation = data;
    // }
  }

  onSubmit() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // if (this.editMode) {
    //   this.trackerService.updateMeditation(
    //     this.meditation.id as string,
    //     this.meditation
    //   );
    //   this.messageService.add({
    //     severity: 'success',
    //     summary: '✨ Actualización exitosa ✨',
    //     detail: 'Respira profundo y sigue el día.',
    //   });
    // } else {
    this.trackerService.newMeditation(this.meditation);
    this.messageService.add({
      severity: 'success',
      summary: 'Gracias por cuidar de ti 🧘‍♀️',
      detail: 'Tu espacio de tranquilidad de hoy está guardado.',
    });
    // }

    // this.getTracking();
    this.toggleModal(false);
    // this.editMode = false;
    this.meditation = {
      duration: undefined,
      type: MeditationType.Vipassana,
      notes: '',
      date: undefined,
    };
  }
}
