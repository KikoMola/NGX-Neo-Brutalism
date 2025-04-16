import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule]
})
export class HeroComponent {
  constructor(public themeService: ThemeService) {}
}
