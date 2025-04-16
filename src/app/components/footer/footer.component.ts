import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: [],
  standalone: true,
  imports: [CommonModule]
})
export class FooterComponent implements OnInit {
  constructor(
    public themeService: ThemeService,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    // Aplicar sombra invertida (hacia arriba) para el footer
    this.renderer.setStyle(
      this.el.nativeElement,
      'box-shadow',
      `0px -4px 0px 0px rgba(0,0,0,1)`
    );
  }
}
