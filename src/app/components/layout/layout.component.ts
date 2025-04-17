import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';
import { HeroComponent } from '../hero/hero.component';
import { CustomizationDemoComponent } from '../customization-demo/customization-demo.component';
import { FaqComponent } from '../faq/faq.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [],
  imports: [CommonModule, NavbarComponent, SidebarComponent, HeroComponent, CustomizationDemoComponent, FaqComponent, FooterComponent],
  standalone: true
})
export class LayoutComponent {
  isSidebarOpen = false;

  constructor(public themeService: ThemeService) {}

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  
  // Método helper para obtener la clase de fondo con la tonalidad más clara
  get mainBgClass(): string {
    return this.themeService.getLightBgClass();
  }
  
  // Método helper para obtener la clase de fondo para el sidebar
  get sidebarBgClass(): string {
    return this.themeService.getLightBgClass();
  }
}
