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
  selector: 'app-buttons-card',
  standalone: true,
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './buttons-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsCardComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Tab state management
  activeTab: 'preview' | 'code' = 'preview';

  setActiveTab(tab: 'preview' | 'code'): void {
    this.activeTab = tab;
  }

  ngOnInit(): void {}

  // Getter for the example code
  get buttonsCardExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const textClass = this.themeService.getTextClass();
    const primaryBgClass = this.themeService.getPrimaryBgClass();
    const hoverTranslateX = this.themeService.getHoverTranslateXClass();
    const hoverTranslateY = this.themeService.getHoverTranslateYClass();

    // Button shadow uses fixed small shadow for inner elements
    const buttonShadow = '1px 1px 0px 0px rgba(0,0,0,1)';
    const buttonHoverTranslate =
      'hover:translate-x-[1px] hover:translate-y-[1px]';

    const html = `
<!-- buttons-card.component.html -->
<div 
  class="relative bg-white p-6 border-neo-border border-black ${borderRadiusClass} ${hoverTranslateX} ${hoverTranslateY} transition-transform"
  style="box-shadow: ${shadowStyle};">
  <!-- Shadow Layer -->
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <!-- Content Layer -->
  <div class="relative">
    <h4 class="text-lg font-semibold mb-2 ${textClass}">Tarjeta con Botones</h4>
    <p class="text-sm text-gray-700 mb-4">
      Esta tarjeta incluye botones de acción en la parte inferior.
    </p>
    <div class="flex justify-end space-x-3">
      <!-- Secondary Button -->
      <div class="relative">
        <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${buttonShadow};"></div>
        <button 
          class="relative bg-white px-3 py-1 border-neo-border border-black text-sm font-medium ${borderRadiusClass} ${buttonHoverTranslate} transition-transform">
          Cancelar
        </button>
      </div>
      <!-- Primary Button -->
      <div class="relative">
        <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${buttonShadow};"></div>
        <button 
          class="relative ${primaryBgClass} px-3 py-1 border-neo-border border-black text-sm font-medium text-white ${borderRadiusClass} ${buttonHoverTranslate} transition-transform">
          Aceptar
        </button>
      </div>
    </div>
  </div>
</div>
    `;

    const ts = `
// buttons-card.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'path/to/your/theme.service'; // Ajusta la ruta

@Component({
  selector: 'app-your-buttons-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div 
      class="relative bg-white p-6 border-neo-border border-black {{ themeService.getBorderRadiusClass() }} {{ themeService.getHoverTranslateXClass() }} {{ themeService.getHoverTranslateYClass() }} transition-transform"
      [ngStyle]="'box-shadow': themeService.getShadowClassForElements()">
      <!-- Shadow Layer -->
      <div class="absolute inset-0 {{ themeService.getBorderRadiusClass() }}" [ngStyle]="'box-shadow': themeService.getShadowClassForElements()"></div>
      <!-- Content Layer -->
      <div class="relative">
        <h4 class="text-lg font-semibold mb-2" [ngClass]="themeService.getTextClass()">Tarjeta con Botones</h4>
        <p class="text-sm text-gray-700 mb-4">
          Esta tarjeta incluye botones de acción en la parte inferior.
        </p>
        <div class="flex justify-end space-x-3">
          <!-- Secondary Button -->
          <div class="relative">
            <div class="absolute inset-0 {{ themeService.getBorderRadiusClass() }}" style="box-shadow: 1px 1px 0px 0px rgba(0,0,0,1);"></div>
            <button 
              class="relative bg-white px-3 py-1 border-neo-border border-black text-sm font-medium {{ themeService.getBorderRadiusClass() }} hover:translate-x-[1px] hover:translate-y-[1px] transition-transform">
              Cancelar
            </button>
          </div>
          <!-- Primary Button -->
          <div class="relative">
            <div class="absolute inset-0 {{ themeService.getBorderRadiusClass() }}" style="box-shadow: 1px 1px 0px 0px rgba(0,0,0,1);"></div>
            <button 
              class="relative px-3 py-1 border-neo-border border-black text-sm font-medium text-white {{ themeService.getBorderRadiusClass() }} hover:translate-x-[1px] hover:translate-y-[1px] transition-transform"
              [ngClass]="themeService.getPrimaryBgClass()">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  \`,\n})
export class YourButtonsCardComponent {
  public themeService = inject(ThemeService);
}
    `;

    const combinedCode = `${html.trim()}\n\n${ts.trim()}`;
    return this.escapeHtml(combinedCode);
  }

  private escapeHtml(unsafe: string): string {
    return unsafe
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#039;');
  }
}
