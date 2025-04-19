import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { ThemeService } from '../../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CodeSnippetPreviewComponent } from '../../../../code-snippet-preview/code-snippet-preview.component';
import { ComponentPreviewComponent } from '../../../../component-preview/component-preview.component';

@Component({
  selector: 'app-basic',
  imports: [
    CommonModule,
    FormsModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './basic.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicComponent implements OnInit {
  public themeService = inject(ThemeService);

  // --- Tab State ---
  normalInputActiveTab: 'preview' | 'code' = 'preview';

  // --- Input Values for Preview ---
  normalInputValue: string = '';

  ngOnInit(): void {}

  // --- Tab Control Methods ---
  setNormalInputTab(tab: 'preview' | 'code'): void {
    this.normalInputActiveTab = tab;
  }

  get normalInputExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    const rawHtml = `
      <div class="relative inline-block">
        <!-- Shadow Layer -->
        <div 
          class="absolute inset-0 ${borderRadiusClass}" 
          [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
        <!-- Input Layer -->
        <input 
          type="text" 
          [(ngModel)]="inputValue" 
          placeholder="Escribe algo..."
          class="relative w-full px-3 py-2 border-neo-border border-black bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
        >
      </div>`;
    const tsLogicComment = `
      // Component Logic:
      // import { FormsModule } from '@angular/forms'; // Required for ngModel
      // import { ThemeService } from './path/to/theme.service'; // Import ThemeService
      // constructor(public themeService: ThemeService) {}
      inputValue: string = '';
    `;

    return this.escapeHtml(`${tsLogicComment}\n${rawHtml.trim()}`);
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
