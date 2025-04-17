import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HeroComponent } from './components/hero/hero.component';
import { CustomizationDemoComponent } from './components/customization-demo/customization-demo.component';
import { FaqComponent } from './components/faq/faq.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  imports: [ 
    LayoutComponent, 
    HeroComponent, 
    CustomizationDemoComponent, 
    FaqComponent,
    FooterComponent,
    RouterOutlet
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'ngx-neobrutalism';
}
