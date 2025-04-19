import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { ThemeService } from '../../../../../services/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentPreviewComponent } from '../../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-full-size',
  imports: [CommonModule, FormsModule, ComponentPreviewComponent, CodeSnippetPreviewComponent],
  templateUrl: './full-size.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullSizeComponent implements OnInit {
  public themeService = inject(ThemeService);

  // --- Tab State --- 
  fullWidthInputActiveTab: 'preview' | 'code' = 'preview';

  // --- Input Values for Preview ---
  fullWidthInputValue: string = '';


  ngOnInit(): void { }

  // --- Tab Control Methods ---
  setFullWidthInputTab(tab: 'preview' | 'code'): void {
    this.fullWidthInputActiveTab = tab;
  }

  // --- Code Snippet Getters ---
  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  
  get fullWidthInputExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const hoverXClass = this.themeService.getHoverTranslateXClass();
    const hoverYClass = this.themeService.getHoverTranslateYClass();

    const rawHtml = `
<div class="relative w-full"> <!-- Container needs w-full -->
  <!-- Shadow Layer -->
  <div 
    class="absolute inset-0 ${borderRadiusClass}" 
    [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
  <!-- Input Layer -->
  <input 
    type="text" 
    [(ngModel)]="inputValue" 
    placeholder="Ancho completo..."
    class="relative w-full px-3 py-2 border-neo-border border-black bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-transform ${borderRadiusClass} ${hoverXClass} ${hoverYClass}"
  >
</div>`;
    const tsLogicComment = `
// Component Logic:
// import { FormsModule } from '@angular/forms'; // Required for ngModel
// import { ThemeService } from './path/to/theme.service'; // Import ThemeService
// constructor(public themeService: ThemeService) {}
inputValue: string = '';`;

    return this.escapeHtml(`${tsLogicComment}\n${rawHtml.trim()}`);
  }
}
