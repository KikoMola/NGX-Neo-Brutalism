import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-customization-demo',
  templateUrl: './customization-demo.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule]
})
export class CustomizationDemoComponent {
  currentColor: string = 'blue';

  setColor(color: string): void {
    this.currentColor = color;
  }
}
