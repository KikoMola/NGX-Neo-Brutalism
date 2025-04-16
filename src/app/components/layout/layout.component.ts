import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styles: [],
  imports: [NavbarComponent, SidebarComponent, FooterComponent],
  standalone: true
})
export class LayoutComponent {

}
