import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { HeroComponent } from './components/hero/hero.component';
import { CustomizationDemoComponent } from './components/customization-demo/customization-demo.component';
import { FaqComponent } from './components/faq/faq.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, LayoutComponent, HeroComponent, CustomizationDemoComponent, FaqComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
export class AppComponent {
  title = 'ngx-neobrutalism';
}
