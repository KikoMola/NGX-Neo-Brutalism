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
  selector: 'app-image-card',
  standalone: true,
  imports: [
    CommonModule,
    ComponentPreviewComponent,
    CodeSnippetPreviewComponent,
  ],
  templateUrl: './image-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageCardComponent implements OnInit {
  public themeService = inject(ThemeService);

  // Tab state management
  activeTab: 'preview' | 'code' = 'preview';

  setActiveTab(tab: 'preview' | 'code'): void {
    this.activeTab = tab;
  }

  ngOnInit(): void {}

  // Getter for the example code
  get imageCardExampleCode(): string {
    const borderRadiusClass = this.themeService.getBorderRadiusClass();
    const shadowStyle = this.themeService.getShadowClassForElements();
    const textClass = this.themeService.getTextClass();
    const hoverTranslateX = this.themeService.getHoverTranslateXClass();
    const hoverTranslateY = this.themeService.getHoverTranslateYClass();
    // Example image URL (replace with a real one or placeholder service)
    const imageUrl =
      'https://via.placeholder.com/400x200.png?text=Placeholder+Image';

    const html = `
<!-- image-card.component.html -->
<div 
  class="relative bg-white border-neo-border border-black ${borderRadiusClass} overflow-hidden ${hoverTranslateX} ${hoverTranslateY} transition-transform"
  style="box-shadow: ${shadowStyle};">
  <!-- Shadow Layer -->
  <div class="absolute inset-0 ${borderRadiusClass}" style="box-shadow: ${shadowStyle};"></div>
  <!-- Content Layer -->
  <div class="relative">
    <img src="${imageUrl}" alt="Placeholder Image" class="w-full h-48 object-cover border-b-neo-border border-black">
    <div class="p-6">
      <h4 class="text-lg font-semibold mb-2 ${textClass}">Tarjeta con Imagen</h4>
      <p class="text-sm text-gray-700">
        Este es el contenido de la tarjeta. La imagen se muestra en la parte superior.
      </p>
    </div>
  </div>
</div>
    `;

    const ts = `
// image-card.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from 'path/to/your/theme.service'; // Ajusta la ruta

@Component({
  selector: 'app-your-image-card',
  standalone: true,
  imports: [CommonModule],
  template: \`
    <div 
      class="relative bg-white border-neo-border border-black {{ themeService.getBorderRadiusClass() }} overflow-hidden {{ themeService.getHoverTranslateXClass() }} {{ themeService.getHoverTranslateYClass() }} transition-transform"
      [ngStyle]="'box-shadow': themeService.getShadowClassForElements()">
      <!-- Shadow Layer -->
      <div class="absolute inset-0 {{ themeService.getBorderRadiusClass() }}" [ngStyle]="'box-shadow': themeService.getShadowClassForElements()}"></div>
      <!-- Content Layer -->
      <div class="relative">
        <img src="https://via.placeholder.com/400x200.png?text=Placeholder+Image" alt="Placeholder Image" class="w-full h-48 object-cover border-b-neo-border border-black">
        <div class="p-6">
          <h4 class="text-lg font-semibold mb-2" [ngClass]="themeService.getTextClass()">Tarjeta con Imagen</h4>
          <p class="text-sm text-gray-700">
            Este es el contenido de la tarjeta. La imagen se muestra en la parte superior.
          </p>
        </div>
      </div>
    </div>
  \`,\n})
export class YourImageCardComponent {
  public themeService = inject(ThemeService);
  // You might want to pass the image URL via Input
  // @Input() imageUrl: string = 'https://via.placeholder.com/400x200.png?text=Placeholder+Image';
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
      .replace(/'/g, '&#039;');
  }
}
