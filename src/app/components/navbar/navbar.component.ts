import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class NavbarComponent {
  public themeService = inject(ThemeService);
  
  @Input() showMenuButton: boolean = false;
  @Output() menuClick = new EventEmitter<void>();

  onMenuClick(): void {
    this.menuClick.emit();
  }
}
