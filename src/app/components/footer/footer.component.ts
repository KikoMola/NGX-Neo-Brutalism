import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent {
  constructor(public themeService: ThemeService) {}
}
