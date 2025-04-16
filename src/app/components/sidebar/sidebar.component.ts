import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule]
})
export class SidebarComponent {
  public themeService = inject(ThemeService);
  
  @Output() linkClick = new EventEmitter<void>();
  
  onLinkClick(): void {
    this.linkClick.emit();
  }
}
