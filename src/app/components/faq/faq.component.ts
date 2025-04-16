import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule]
})
export class FaqComponent {
  constructor(public themeService: ThemeService) {}
}
