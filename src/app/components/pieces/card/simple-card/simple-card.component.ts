import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  type OnInit,
} from '@angular/core';
import { ThemeService } from '../../../../services/theme.service';
import { ComponentPreviewComponent } from '../../../component-preview/component-preview.component';
import { CodeSnippetPreviewComponent } from '../../../code-snippet-preview/code-snippet-preview.component';

@Component({
  selector: 'app-simple-card',
  standalone: true,
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './simple-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleCardComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Tab state management
  activeTab: 'preview' | 'code' = 'preview';

  setActiveTab(tab: 'preview' | 'code'): void {
    this.activeTab = tab;
  }

  ngOnInit(): void {}

  // Getter for the example code (combined HTML and TS)
  get simpleCardExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const lightBgClass = this.themeService.getLightBgClass();
    const textClass = this.themeService.getTextClass();
    const hoverTranslateX = this.themeService.getHoverTranslateXClass();
    const hoverTranslateY = this.themeService.getHoverTranslateYClass();

    const html = `
<div 
  class="relative bg-white p-6 border-neo-border border-black ${borderRadiusClass} ${hoverTranslateX} ${hoverTranslateY} transition-transform"
  style="box-shadow: ${shadowStyle};">
  <!-- Shadow Layer -->
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <!-- Content Layer -->
  <div class="relative">
    <h4 class="text-lg font-semibold mb-2 ${textClass}">Título de la Tarjeta</h4>
    <p class="text-sm text-gray-700">
      Este es el contenido de la tarjeta simple. Puedes poner aquí cualquier texto o elemento que necesites.
    </p>
  </div>
</div>
    `;

    const ts = `
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'path/to/your/theme.service'; // Ajusta la ruta

@Component({
  selector: 'app-your-simple-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div 
      class="relative bg-white p-6 border-neo-border border-black {{ themeService.getBorderRadiusClass() }} {{ themeService.getHoverTranslateXClass() }} {{ themeService.getHoverTranslateYClass() }} transition-transform"
      [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}">
      <!-- Shadow Layer (Optional, for consistent structure) -->
      <div class="absolute inset-0 {{ themeService.getBorderRadiusClass() }}" [ngStyle]="{'box-shadow': themeService.getShadowClassForElements()}"></div>
      <!-- Content Layer -->
      <div class="relative">
        <h4 class="text-lg font-semibold mb-2" [ngClass]="themeService.getTextClass()">Título de la Tarjeta</h4>
        <p class="text-sm text-gray-700">
          Este es el contenido de la tarjeta simple. Puedes poner aquí cualquier texto o elemento que necesites.
        </p>
      </div>
    </div>
  \`,\n})
export class YourSimpleCardComponent {\n  public themeService = inject(ThemeService);\n}\n    `;

    // Combine HTML and TS into a single string for the code preview
    const combinedCode = `${html.trim()}\n\n${ts.trim()}`;
    return this.escapeHtml(combinedCode);
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
