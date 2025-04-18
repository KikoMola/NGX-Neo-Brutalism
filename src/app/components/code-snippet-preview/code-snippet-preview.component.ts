import { Component, Input } from '@angular/core';

import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-code-snippet-preview',
  standalone: true,
  imports: [],
  templateUrl: './code-snippet-preview.component.html',
  styles: [`
    /* Aplicar estilos solo al elemento <pre> dentro de este componente */
    :host pre::-webkit-scrollbar {
      width: 6px; /* Ancho de la barra de desplazamiento */
      height: 6px; /* Alto para scroll horizontal */
    }

    :host pre::-webkit-scrollbar-track {
      background: rgba(255, 255, 255, 0.1); /* Color de fondo del track (ligeramente visible) */
      border-radius: 3px;
    }

    :host pre::-webkit-scrollbar-thumb {
      background-color: rgba(255, 255, 255, 0.3); /* Color del thumb (más visible) */
      border-radius: 3px;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }

    :host pre::-webkit-scrollbar-thumb:hover {
      background-color: rgba(255, 255, 255, 0.5);
    }
  `]
})
export class CodeSnippetPreviewComponent {
  @Input() code: string = '';

  constructor(public themeService: ThemeService) {}
}
