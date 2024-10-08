import { Component, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as THREE from 'three';

@Component({
  selector: 'app-home-screen-animation',
  standalone: true,
  imports: [],
  templateUrl: './home-screen-animation.component.html',
  styleUrl: './home-screen-animation.component.css',
})
export class HomeScreenAnimationComponent {
  constructor(private router: Router) {}

  ngOnInit(): void {
    // Redirige después de 5 segundos (5000 ms), puedes ajustar el tiempo según el tiempo de animación.
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 4000); // Cambia 5000 por el tiempo que desees.
  }
}
