import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovingService } from '../service/moving.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'umzug_frontend';
  name = '';
  time = '';
  origin = '';
  destination = '';
  item = '';
  amount = '';

  errorMessage = '';

  constructor(private movingService: MovingService) {}

  createRequest(): void {
    if (!this.name || !this.time || !this.origin || !this.destination || !this.item || !this.amount) {
      this.errorMessage = 'Bitte füllen Sie alle Felder aus.';
      return;
    }

    this.errorMessage = '';

    this.movingService.postAssistanceRequest(
      this.name,
      this.time,
      this.origin,
      this.destination,
      this.item,
      this.amount
    ).subscribe({

    })
  }
}
