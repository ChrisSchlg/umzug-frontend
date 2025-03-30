import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MovingService } from '../service/moving.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
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

  constructor(private movingService: MovingService) {}

  createRequest(): void {
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
