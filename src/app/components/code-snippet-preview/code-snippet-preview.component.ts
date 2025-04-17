import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-code-snippet-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-snippet-preview.component.html',
})
export class CodeSnippetPreviewComponent {
  @Input() code: string = '';

  constructor(public themeService: ThemeService) {}
}
