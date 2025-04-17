import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule, RouterLink]
})
export class SidebarComponent {
  public themeService = inject(ThemeService);
  
  @Output() linkClick = new EventEmitter<void>();
  
  // Controla si el acordeón de componentes está expandido o no
  isComponentsExpanded: boolean = false;
  
  onLinkClick(): void {
    this.linkClick.emit();
  }
  
  toggleComponentsAccordion(): void {
    this.isComponentsExpanded = !this.isComponentsExpanded;
  }
}
